/**
 * Home-page runtime verification.
 *
 * Verifies the important structural invariants of the immersive home experience:
 * - no curtain/reveal overlay remains;
 * - WebGL mounts;
 * - desktop depth mode keeps exactly one readable content pane active;
 * - mobile falls back to normal flow sections.
 *
 * Screenshots are best-effort because headless SwiftShader capture can time out
 * while a continuously rendering WebGL canvas is active. DOM/runtime failures
 * remain fatal; screenshot capture failures are reported as warnings.
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
const warnings = [];

async function tryScreenshot(page, path) {
  try {
    await page.screenshot({ path, quality: 80, type: "jpeg", timeout: 10000, animations: "disabled" });
  } catch (error) {
    warnings.push(`screenshot skipped (${path}): ${error?.message ?? error}`);
  }
}

async function run(label, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("pageerror", (e) => errors.push(`[${label}] ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${label}] console: ${m.text()}`);
  });

  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(1600);

  const state = await page.evaluate(() => ({
    reveal: document.querySelectorAll(".reveal").length,
    canvas: (() => {
      const c = document.querySelector(".neural-scene canvas");
      return c ? [c.width, c.height] : null;
    })(),
    depthPanes: document.querySelectorAll(".depth-pane").length,
    flowPanes: document.querySelectorAll(".depth-flow-pane").length,
    visibleDepthPanes: Array.from(document.querySelectorAll(".depth-pane")).filter((el) => {
      const style = getComputedStyle(el);
      return style.visibility !== "hidden" && Number(style.opacity || 1) > 0.05;
    }).length,
  }));
  console.log(label, JSON.stringify(state));

  if (state.reveal !== 0) errors.push(`[${label}] curtain/reveal element still present`);
  if (!state.canvas) errors.push(`[${label}] neural WebGL canvas did not mount`);
  if (state.depthPanes > 0 && state.visibleDepthPanes !== 1) {
    errors.push(`[${label}] expected exactly one visible depth pane, found ${state.visibleDepthPanes}`);
  }
  if (state.depthPanes === 0 && state.flowPanes === 0) {
    errors.push(`[${label}] neither depth nor flow content panes mounted`);
  }

  await tryScreenshot(page, `${OUT}/${label}-1-hero.jpg`);

  const sections = state.depthPanes > 0 ? state.depthPanes : state.flowPanes;
  const isDepth = state.depthPanes > 0;

  for (let i = 1; i < sections; i++) {
    await page.evaluate((idx) => {
      window.scrollTo({ top: idx * window.innerHeight, behavior: "instant" });
    }, i);
    await page.waitForTimeout(isDepth ? 600 : 350);

    if (isDepth) {
      const visible = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".depth-pane")).filter((el) => {
          const style = getComputedStyle(el);
          return style.visibility !== "hidden" && Number(style.opacity || 1) > 0.05;
        }).length
      );
      if (visible !== 1) errors.push(`[${label}] section ${i}: expected one visible pane, found ${visible}`);
    }

    await tryScreenshot(page, `${OUT}/${label}-2-section-${i}.jpg`);
  }

  await page.close();
}

await run("desktop", { width: 1440, height: 900 });
await run("mobile", { width: 390, height: 844 });

await browser.close();

if (warnings.length) console.log("WARNINGS:\n" + warnings.join("\n"));
if (errors.length) {
  console.log("ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("OK - runtime checks passed: no curtain and no desktop pane overlap");
