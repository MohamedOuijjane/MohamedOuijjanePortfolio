const fs = require("fs");
const path = require("path");
const pngToIco = require("png-to-ico").default || require("png-to-ico");

const source = path.join(process.cwd(), "public", "images", "w.png");
const targetPublic = path.join(process.cwd(), "public", "favicon.ico");
const targetApp = path.join(process.cwd(), "app", "favicon.ico");
const iconPng = path.join(process.cwd(), "app", "icon.png");
const appleIcon = path.join(process.cwd(), "app", "apple-icon.png");

async function generate() {
  try {
    console.log("Generating favicon.ico...");
    const buf = await pngToIco(source);
    fs.writeFileSync(targetPublic, buf);
    fs.writeFileSync(targetApp, buf);
    console.log("Favicon generated in public/ and app/");

    console.log("Copying PNG assets...");
    fs.copyFileSync(source, iconPng);
    fs.copyFileSync(source, appleIcon);
    console.log("PNG assets copied to app/");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

generate();
