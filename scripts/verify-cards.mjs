/**
 * Screenshots the bento/liquid-glass card pages in a real context.
 * Usage: node scripts/verify-cards.mjs [route]   (default /projects)
 */
import { chromium } from "playwright";

const route = process.argv[2] || "/projects";
const tag = route.replace(/\W+/g, "") || "home";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const errors = [];

async function shoot(width, height, label, y) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("pageerror", (e) => errors.push(`${label}: ` + String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${label}: ` + m.text()); });
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  if (y) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(1200); }
  await page.screenshot({ path: `scripts/shots/cards-${tag}-${label}.jpg`, quality: 80, type: "jpeg" });
  await page.close();
}

await shoot(1440, 900, "top", 0);
await shoot(1440, 900, "mid", 700);
await shoot(390, 844, "mobile", 500);

console.log("ROUTE:", route, "ERROR_COUNT:", errors.length);
console.log("ERRORS:", JSON.stringify([...new Set(errors)].slice(0, 8), null, 2));
await browser.close();
