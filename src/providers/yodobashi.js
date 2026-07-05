import { launch } from "@cloudflare/playwright";

export async function getYodobashi(isbn, env) {
  const browser = await launch(env.MYBROWSER);

  try {
    const page = await browser.newPage();

    // ブラウザっぽく見せる
    await page.setExtraHTTPHeaders({
      "accept-language": "ja,en;q=0.9"
    });

    await page.goto(
        `https://www.yodobashi.com/?word=${isbn}`,
        {
            waitUntil: "commit"
        }
    );

    const html = await page.content();

    const sku = html.match(/data-sku="(\d+)"/)?.[1];

    await page_stock.goto(
        `https://www.yodobashi.com/ec/product/stock/${sku}/`,
        {
            waitUntil: "commit"
        }
    );

    const entries = page_stock.locator(".entryBlock");
    const count = await entries.count();

    const result = [];

    for (let i = 0; i < count; i++) {
        const entry = entries.nth(i);

        const storeNames = entry.locator(".storeNameText");
        const nameCount = await storeNames.count();
        const names = [];
        for (let j = 0; j < nameCount; j++) {
            names.push(await storeNames.nth(j).innerText());
        }
        const stock = await entry.locator(".stockArea").innerText();

        result.push({
            name: names,
            stock_text: stock
        });
    }

    return result;

  } finally {
    await browser.close();
  }
}