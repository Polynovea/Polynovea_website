/**
 * Visual verification of the home page 3D experience.
 * Renders WebGL headlessly (SwiftShader) and captures the curtain,
 * hero, and every depth section, desktop + mobile.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const errors = [];

async function run(label, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("pageerror", (e) => errors.push(`[${label}] ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${label}] console: ${m.text()}`);
  });

  await page.goto(BASE, { waitUntil: "networkidle" });

  // Curtain still closed? capture it.
  await page.screenshot({ path: `${OUT}/${label}-0-curtain.jpg`, quality: 80, type: "jpeg" });

  // Wait for reveal to finish.
  await page.waitForSelector(".reveal", { state: "detached", timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(2200); // intro dolly + hero entrance
  await page.screenshot({ path: `${OUT}/${label}-1-hero.jpg`, quality: 80, type: "jpeg" });

  const state = await page.evaluate(() => ({
    canvas: (() => {
      const c = document.querySelector(".neural-scene canvas");
      return c ? [c.width, c.height] : null;
    })(),
    depthPanes: document.querySelectorAll(".depth-pane").length,
    flowPanes: document.querySelectorAll(".depth-flow-pane").length,
  }));
  console.log(label, JSON.stringify(state));

  // Walk the sections.
  const sections = await page.evaluate(() => {
    const n = document.querySelectorAll(".depth-pane").length;
    return n > 0 ? n : document.querySelectorAll(".depth-flow-pane").length;
  });
  const isDepth = state.depthPanes > 0;
  for (let i = 1; i < sections; i++) {
    await page.evaluate((idx) => {
      const vh = window.innerHeight;
      window.scrollTo({ top: idx * vh, behavior: "instant" });
    }, i);
    await page.waitForTimeout(isDepth ? 1400 : 700); // camera lerp settle
    await page.screenshot({ path: `${OUT}/${label}-2-section-${i}.jpg`, quality: 80, type: "jpeg" });
  }

  await page.close();
}

await run("desktop", { width: 1440, height: 900 });
await run("mobile", { width: 390, height: 844 });

await browser.close();

if (errors.length) {
  console.log("ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("OK - no page errors");
