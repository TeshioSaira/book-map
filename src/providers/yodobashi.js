export async function getYodobashi(isbn) {
  const url = "https://www.yodobashi.com/ec/product/stock/100000009004232631/";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}