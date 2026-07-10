const api_key = "NRMS43LYRVMAa6PmfKdAHFnD5UDWaPcg";

import store_json from "../stores/melonbooksPosition.json"

export async function getMelonbooks(isbn) {
  const url = "https://zaiko.shoptech.jp/api/api/stock.json?api_key=" + api_key + "&product_code=" + isbn;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const json = await res.json();
    if (!json?.stocks?.with_area) {
      return [];
    }
    const result = [];
    Object.values(json.stocks.with_area).forEach((area) => {
      Object.values(area.stores).forEach((store) => {
        var lat = null;
        var lng = null;
        if(store_json[store.store_name]){
          lat = store_json[store.store_name]["lat"];
          lng = store_json[store.store_name]["lng"];
        }
        result.push({
          name: [store.store_name],
          stock: store.stock_real_num,
          lat: lat,
          lng: lng
        });
      });
    });
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}