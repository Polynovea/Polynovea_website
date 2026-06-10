/**
 * Diagnostic: renders the home scene in a FRESH SwiftShader WebGL context
 * (immune to GPU TDR / browser context exhaustion) and reports console errors.
 * This isolates "is the CODE broken" from "is the browser context exhausted".
 */
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console.error: " + m.text());
});

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(6500); // let the curtain open + scene boot
await page.screenshot({ path: "scripts/shots/check-home.jpg", quality: 80, type: "jpeg" });

// Scroll into section 1 so cluster ignition + a chapter label are in view.
await page.evaluate(() => window.scrollTo(0, window.innerHeight));
await page.waitForTimeout(1800);
await page.screenshot({ path: "scripts/shots/check-section1.jpg", quality: 80, type: "jpeg" });

const hasCanvas = await page.evaluate(() => !!document.querySelector("canvas"));
console.log("HAS_CANVAS:", hasCanvas);
console.log("ERROR_COUNT:", errors.length);
console.log("ERRORS:", JSON.stringify([...new Set(errors)].slice(0, 12), null, 2));

await browser.close();
