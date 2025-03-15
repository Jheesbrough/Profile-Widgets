import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { captureScreenshot } from './screenshot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const settingsPath = path.join(__dirname, 'settings.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

const main = async () => {
  const folderName = path.join('widgets', 'screenshots');

  if (!fs.existsSync(path.join(__dirname, folderName))) {
    fs.mkdirSync(path.join(__dirname, folderName), { recursive: true });
  }

  if (settings.widgets.screenshots) {
    for (const url of settings.widgets.screenshots.urls) {
      const fileName = `${url
        .replace(/https?:\/\//, '')
        .replace(/\//g, '_')}.svg`;
      const outputPath = path.join(__dirname, folderName, fileName);

      const options = {
        viewport: { width: 1920, height: 1080 },
        wait: 1000,
      };

      await captureScreenshot(url, outputPath, options);
    }
  }
};

main().catch((error) => {
  console.error('Error:', error);
});
