const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { build } = require("vite");
const handler = require("serve-handler");
const http = require("http");

const parse = require("csv-parse/lib/sync");

(async () => {
  const content = fs.readFileSync(`data.csv`);
  const records = parse(content);

  await build({
    root: path.resolve(__dirname),
    base: "./",
  });

  const server = http.createServer((request, response) => {
    return handler(request, response, { public: "dist" });
  });

  server.listen(1666);

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  async function generate(data, output) {
    await page.goto("http://localhost:1666");

    await page.evaluate((data) => {
      window.data = JSON.parse(data);
    }, JSON.stringify(data));

    await page.waitForTimeout(100);

    await page.pdf({ path: output, format: "A4" });
  }

  for (const record of records) {
    const addresses = record.splice(4).filter((i) => i != "");
    for (const address of addresses) {
      const data = {
        id: new Buffer(address).toString("base64"),
        firstName: record[0],
        lastName: record[1],
        email: record[2].toLowerCase(),
        phone: record[3].split("-").join(""),
        address: addresses[0],

        subject: {
          address,
        },
      };
      await generate(data, `documents/${data.id}.pdf`);
    }
  }

  await server.close();
  await browser.close();
})();
