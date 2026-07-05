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

    const page_stock = await browser.newPage();

    // ブラウザっぽく見せる
    await page_stock.setExtraHTTPHeaders({
      "accept-language": "ja,en;q=0.9"
    });

    await page_stock.goto(
        `https://www.yodobashi.com/ec/product/stock/${sku}/`,
        {
            waitUntil: "commit"
        }
    );
    const entries = await page_stock.locator(".entryBlock").all();
    const result = [];
    for (const entry of entries) {
        const name = await entry.locator(".storeNameText").innerText();
        const stock = await entry.locator(".stockArea .green").innerText();
        result.push({
            name: name,
            stock_text: stock
        });
    }

    return entries;

  } finally {
    await browser.close();
  }
}