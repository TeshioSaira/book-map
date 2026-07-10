import store_json from "../stores/miraiyaPosition.json"

export async function getMiraiya(isbn, page) {
    const url = "https://search.miraiyashoten.co.jp/neighborhoodAPI/?isbn=" + isbn + "&prefecture=" + page;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return [];
        }
        const json = await res.json();
        if (!json) {
            return [];
        }
        const shopCodes = Object.keys(json);
        const url_stock = "https://search.miraiyashoten.co.jp/stockAPI/?isbn=" + isbn + "&storecodes=" + shopCodes.join(",");
        try {
            const res_stock = await fetch(url_stock);
            if (!res_stock.ok) {
                return [];
            }
            const json_stock = await res_stock.json();
            if (!json_stock) {
                return [];
            }
            var result = [];
            shopCodes.forEach(shopCode => {
                result.push({
                    name: json[shopCode]["tenpoName"],
                    stock: json_stock[shopCode],
                    lat: store_json[json[shopCode]["tenpoName"]]["lat"],
                    lng: store_json[json[shopCode]["tenpoName"]]["lng"]
                });
            });
            return result;
        } catch (e) {
            console.error(e);
            return [];
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}