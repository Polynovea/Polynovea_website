/**
 * One-off probe: confirms the scene→DOM "card born from cluster" bridge wires
 * through. Renders in a real (non-throttled) SwiftShader context, scrolls to a
 * mid-journey cluster, and reads the active pane's anchor values. If the bridge
 * works, transform-origin / --birth-* / --lens-* are cluster-specific, not 50%.
 */
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(6500);

async function sampleAt(sectionIndex) {
  await page.evaluate((i) => window.scrollTo(0, window.innerHeight * i), sectionIndex);
  await page.waitForTimeout(1600);
  return page.evaluate(() => {
    const panes = Array.from(document.querySelectorAll(".depth-pane"));
    const active = panes.find((p) => p.classList.contains("pane-assembled")) ||
      panes.find((p) => (p.style.visibility || "visible") !== "hidden");
    if (!active) return { activeIndex: -1 };
    const lens = active.querySelector(".depth-lens");
    return {
      activeIndex: panes.indexOf(active),
      transformOrigin: active.style.transformOrigin,
      birthX: active.style.getPropertyValue("--birth-x"),
      birthY: active.style.getPropertyValue("--birth-y"),
      lensX: lens && lens.style.getPropertyValue("--lens-x"),
      lensY: lens && lens.style.getPropertyValue("--lens-y"),
    };
  });
}

const s1 = await sampleAt(1);
const s2 = await sampleAt(2);
const s5 = await sampleAt(5);

console.log("SECTION 1:", JSON.stringify(s1));
console.log("SECTION 2:", JSON.stringify(s2));
console.log("SECTION 5:", JSON.stringify(s5));
console.log("ERROR_COUNT:", errors.length);
console.log("VARIES:", s1.transformOrigin !== s2.transformOrigin && s2.transformOrigin !== s5.transformOrigin);

await browser.close();
