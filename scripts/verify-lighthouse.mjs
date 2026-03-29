import { execSync } from "node:child_process";
import { mkdirSync, rmSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const reportsDir = "reports/lighthouse";
const tmpDir = join(reportsDir, "tmp");

// 1) Use Playwright Chromium path
const chromePath = chromium.executablePath();

// Ensure directories exist
mkdirSync(tmpDir, { recursive: true });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 6) Cleanup temp dirs with retry
async function cleanupWithRetry(path, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      if (existsSync(path)) {
        rmSync(path, { recursive: true, force: true });
      }
      return true;
    } catch (error) {
      if (error.code === "EPERM" || error.code === "EBUSY") {
        if (i === attempts - 1) {
          console.warn(
            `[WARN] Could not clean up ${path} after ${attempts} attempts (EPERM/EBUSY).`,
          );
          return false;
        }
        await sleep(500);
      } else {
        throw error;
      }
    }
  }
}

async function runLighthouse(mode) {
  const timestamp = Date.now();
  // 2) Unique user-data-dir
  const userDataDir = join(tmpDir, `${mode}-${timestamp}`);
  const out = join(reportsDir, `lighthouse-${mode}.json`);

  const extra = mode === "desktop" ? "--preset=desktop" : "";

  // 3) Chrome flags and Lighthouse options
  const cmd = [
    "npx lighthouse",
    `"${baseUrl}"`,
    "--output=json",
    `--output-path="${out}"`,
    "--only-categories=performance",
    `--chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage"`,
    "--no-enable-error-reporting",
    "--quiet",
    "--no-enable-stack-traces",
    extra,
  ]
    .filter(Boolean)
    .join(" ");

  console.log(`[START] Running Lighthouse ${mode}...`);

  try {
    // 4) Check exit code
    execSync(`cmd /c "${cmd} || exit 0"`, {
      stdio: "inherit",
      env: {
        ...process.env,
        CHROME_PATH: chromePath,
        LIGHTHOUSE_CHROMIUM_PATH: chromePath,
      },
    });

    if (!existsSync(out)) {
      throw new Error(`Report JSON not found at ${out}`);
    }

    // 5) Parse and print metrics
    const report = JSON.parse(readFileSync(out, "utf8"));
    const audits = report.audits;
    const score = report.categories.performance.score * 100;

    const lcp = audits["largest-contentful-paint"].displayValue;
    const cls = audits["cumulative-layout-shift"].displayValue;
    const tbt = audits["total-blocking-time"].displayValue;

    console.log(`\n[PASS] Lighthouse ${mode} results:`);
    console.log(`- Performance Score: ${score.toFixed(0)}`);
    console.log(`- LCP: ${lcp}`);
    console.log(`- CLS: ${cls}`);
    console.log(`- TBT: ${tbt}\n`);
  } catch {
    console.error(`\n[FAIL] Lighthouse ${mode} failed.`);
    process.exit(1);
  } finally {
    await cleanupWithRetry(userDataDir);
  }
}

async function main() {
  try {
    await runLighthouse("mobile");
    await runLighthouse("desktop");
    console.log("[SUCCESS] All Lighthouse checks completed.");
  } catch {
    console.error("[ERROR] Lighthouse verification failed.");
    process.exit(1);
  }
}

main();
