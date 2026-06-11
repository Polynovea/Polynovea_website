/**
 * Captures the boundary takeover: parks on a section, then bursts screenshots
 * across the transition to the next so the mid frames catch the peak (FOV
 * widen + bloom flare + pulse surge). Real rAF context (preview throttles rAF).
 */
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(6500);

// Park on section 1.
await page.evaluate(() => window.scrollTo(0, window.innerHeight));
await page.waitForTimeout(1800);
await page.screenshot({ path: "scripts/shots/takeover-parked.jpg", quality: 78, type: "jpeg" });

// Drive toward section 2 and burst-capture across the crossing.
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
for (let i = 0; i < 9; i++) {
  await page.waitForTimeout(110);
  await page.screenshot({ path: `scripts/shots/takeover-${i}.jpg`, quality: 78, type: "jpeg" });
}

console.log("ERROR_COUNT:", errors.length);
await browser.close();
