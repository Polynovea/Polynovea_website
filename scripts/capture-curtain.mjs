/**
 * Captures the curtain reveal while it is still closed,
 * by screenshotting right after DOMContentLoaded.
 */
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".reveal", { timeout: 8000 });
await page.waitForTimeout(700); // let the wordmark/seam settle, still inside MIN_HOLD
await page.screenshot({ path: "scripts/shots/desktop-curtain-closed.jpg", quality: 85, type: "jpeg" });
console.log("captured curtain");

await browser.close();
