/**
 * Screenshots the redesigned /architecture page in a real (non-throttled)
 * context, desktop + mobile, and reports console errors.
 */
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const errors = [];

async function shoot(width, height, tag, scrollTo) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("pageerror", (e) => errors.push(`${tag}: ` + String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${tag}: ` + m.text()); });
  await page.goto("http://localhost:3000/architecture", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500);
  if (scrollTo) { await page.evaluate((y) => window.scrollTo(0, y), scrollTo); await page.waitForTimeout(1200); }
  await page.screenshot({ path: `scripts/shots/arch-${tag}.jpg`, quality: 80, type: "jpeg" });
  await page.close();
}

await shoot(1440, 900, "desktop-hero", 0);
await shoot(1440, 900, "desktop-timeline", 1100);
await shoot(390, 844, "mobile-hero", 0);

console.log("ERROR_COUNT:", errors.length);
console.log("ERRORS:", JSON.stringify([...new Set(errors)].slice(0, 10), null, 2));
await browser.close();
