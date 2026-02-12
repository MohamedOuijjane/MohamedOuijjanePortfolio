/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const PAGES = ["/", "/projects/cpu-grid-traffic"];

for (const path of PAGES) {
  test(`Accessibility check: ${path}`, async ({ page }: { page: Page }) => {
    await page.goto(`${BASE_URL}${path}`);

    // Wait for content to load
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page } as any)
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Filter for serious and critical violations
    const seriousViolations = accessibilityScanResults.violations.filter(
      (v: any) => v.impact === "serious" || v.impact === "critical",
    );

    if (seriousViolations.length > 0) {
      console.error(
        `\n❌ ${seriousViolations.length} serious/critical accessibility violations found on ${path}:`,
      );
      seriousViolations.forEach((v: any) => {
        console.error(`- [${v.impact}] ${v.id}: ${v.help}`);
        v.nodes.forEach((node: any) => {
          console.error(`  Selector: ${node.target.join(", ")}`);
        });
      });
    }

    expect(seriousViolations).toHaveLength(0);
  });

  test(`Keyboard smoke test: ${path}`, async ({ page }: { page: Page }) => {
    await page.goto(`${BASE_URL}${path}`);
    await page.waitForLoadState("networkidle");

    // Initial focus should be body or null
    // Tab through elements
    const maxTabs = 20;
    let lastElement = null;
    let focusMovedCount = 0;

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press("Tab");
      const currentElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el
          ? {
              tagName: el.tagName,
              className: el.className,
              id: el.id,
              text: el.textContent?.slice(0, 30),
            }
          : null;
      });

      if (
        currentElement &&
        JSON.stringify(currentElement) !== JSON.stringify(lastElement)
      ) {
        focusMovedCount++;
        lastElement = currentElement;
      } else if (i > 5 && !currentElement) {
        // If we've tabbed a bit and have no focus, it might be a trap or end of page
        break;
      }
    }

    console.log(
      `[PASS] Keyboard focus moved ${focusMovedCount} times on ${path}`,
    );
    expect(focusMovedCount).toBeGreaterThan(0);
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */
