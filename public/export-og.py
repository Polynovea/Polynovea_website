import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

INPUT_HTML = Path(__file__).parent / "og-image-source.html"
OUTPUT_PNG = Path(__file__).parent / "og-image.png"

VIEW_W = 600
VIEW_H = 315
SCALE  = 2.0   # 600 * 2 = 1200px,  315 * 2 = 630px

async def export():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )
        await page.goto(INPUT_HTML.as_uri(), wait_until="networkidle")
        await page.wait_for_timeout(3000)   # wait for Google Fonts

        await page.screenshot(
            path=str(OUTPUT_PNG),
            clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
        )
        await browser.close()

    print(f"Exported: {OUTPUT_PNG}  ({VIEW_W * int(SCALE)}x{VIEW_H * int(SCALE)}px)")

asyncio.run(export())
