import puppeteer from "puppeteer";
import fs from "fs";

export const captureScreenshot = async (url, outputPath, options = {}) => {
  const {
    viewport = { width: 1920, height: 1080 },
    wait = 0,
  } = options;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: ["domcontentloaded", "networkidle2"] });

  if (wait) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }

  let content = null;
  let image = null;
  const metadata = { height: null, width: null };

  const screenshotBuffer = await page.screenshot({ encoding: "base64" });
  const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${viewport.width}" height="${viewport.height}">
            <image href="data:image/png;base64,${screenshotBuffer}" width="${viewport.width}" height="${viewport.height}"/>
        </svg>
    `;
  fs.writeFileSync(outputPath, svgContent.trim());

  await browser.close();
  return {
    image,
    content,
    height: metadata.height,
    width: metadata.width,
    url,
  };
};
