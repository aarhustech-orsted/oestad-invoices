const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { build } = require("vite");
const handler = require("serve-handler");
const http = require("http");

const users = require("./data/data.json");

(async () => {
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

  await page.goto("http://localhost:1666");

  async function generate(data, output) {
    await page.evaluate((data) => {
      window.data.value = JSON.parse(data);
    }, JSON.stringify(data));

    await page.waitForTimeout(100);

    await page.pdf({ path: output, printBackground: true, format: "A4" });
  }

  for (const user of users) {
    for (const address of user.addresses) {
      for (const invoice of address.invoices) {
        const data = {
          person: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            primary_address: user.primary_address,
          },

          address: {
            id: address.id,
            address: address.address,
            measure_device: address.measure_device,
          },

          invoice,
        };

        fs.mkdirSync(`documents/${address.id}`, { recursive: true });

        await generate(
          data,
          `documents/${address.id}/forbrug-${invoice.date.year}-${
            invoice.date.month
          }-${invoice.date.day}-${
            (data.invoice.usage.kwh * data.invoice.usage.price + 10 + 4) * 1.25
          }.pdf`
        );
      }
    }
  }

  await server.close();
  await browser.close();
})();
