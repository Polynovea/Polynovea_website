/**
 * Verifies every route renders over the persistent neural scene and that
 * client-side nav transitions work. Renders WebGL headlessly (SwiftShader).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["about", "/about"],
  ["architecture", "/architecture"],
  ["projects", "/projects"],
  ["live-portfolio", "/live-portfolio"],
  ["blog", "/blog"],
  ["research", "/research"],
  ["contact", "/contact"],
];

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const errors = [];

async function direct(label, viewport) {
  for (const [name, path] of ROUTES) {
    const page = await browser.newPage({ viewport });
    page.on("pageerror", (e) => errors.push(`[${label} ${name}] ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`[${label} ${name}] console: ${m.text()}`);
    });
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500); // scene fade-in + ambient drift
    const state = await page.evaluate(() => ({
      canvas: (() => {
        const c = document.querySelector(".neural-scene canvas");
        return c ? [c.width, c.height] : null;
      })(),
    }));
    console.log(`${label} ${name}`, JSON.stringify(state));
    await page.screenshot({ path: `${OUT}/${label}-page-${name}.jpg`, quality: 80, type: "jpeg" });
    await page.close();
  }
}

// Exercise a real client-side nav transition: home -> about -> projects.
async function transition() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (e) => errors.push(`[transition] ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[transition] console: ${m.text()}`);
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForSelector(".reveal", { state: "detached", timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(1200);

  // Click "About" in the navbar.
  await page.click('a[href="/about"]');
  await page.waitForTimeout(200); // mid warp-out
  await page.screenshot({ path: `${OUT}/transition-1-warpout.jpg`, quality: 80, type: "jpeg" });
  await page.waitForTimeout(1600); // arrive
  console.log("after nav, url =", new URL(page.url()).pathname);
  await page.screenshot({ path: `${OUT}/transition-2-arrived-about.jpg`, quality: 80, type: "jpeg" });

  await page.close();
}

await direct("desktop", { width: 1440, height: 900 });
await transition();

await browser.close();

if (errors.length) {
  console.log("ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("OK - no page errors");
