import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { captureScreenshot } from "./screenshot.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
  const url = "https://jheesbrough.dev";
  const outputPath = path.join(__dirname, "screenshot.svg");
  const options = {
    viewport: { width: 1920, height: 1080 },
    wait: 1000,
  };

  await captureScreenshot(url, outputPath, options);
};

main().catch((error) => {
  console.error("Error:", error);
});
