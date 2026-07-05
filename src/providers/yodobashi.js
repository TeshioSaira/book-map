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

    // JSが終わるまで少し待つ
    await page.waitForTimeout(3000);

    const html = await page.content();

    const sku = html.match(/data-sku="(\d+)"/)?.[1];

    await page.goto(
        `https://www.yodobashi.com/ec/product/stock/${sku}/`,
        {
            waitUntil: "commit"
        }
    );

    await page.waitForTimeout(3000);

    const html_stock = await page.content();

    return html_stock;

  } finally {
    await browser.close();
  }
}