export async function getMaruzen(isbn) {
    const url = "https://api-shopify-listlocations-ttmpxhtqra-an.a.run.app/";
    const url_isbn = "https://api-item-info-ttmpxhtqra-an.a.run.app/?type=2&jan_isbn=" + isbn;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return [];
        }
        const json = await res.json();
        if (!json?.locations?.edges) {
            return [];
        }
        let shop_list = {};
        json.locations.edges.forEach(edge => {
            const node = edge.node;
            if (!node.address) {
                return;
            }
            if (!node.address.address1) {
                return;
            }
            let metafield = {};
            node.metafields.edges.forEach(edge_meta => {
                if(!edge_meta.node){
                    return;
                }
                if(!edge_meta.node.key){
                    return;
                }
                metafield[edge_meta.node.key] = edge_meta.node.value;
            });
            shop_list[metafield.code] = {
                name: node.name,
                lat: parseFloat(metafield.latitude),
                lng: parseFloat(metafield.longitude)
            }
        });
        try {
            const res_isbn = await fetch(url_isbn);
            if (!res_isbn.ok) {
                return [];
            }
            const json_isbn = await res_isbn.json();
            if (!json_isbn) {
                return [];
            }
            const result = [];
            json_isbn.forEach(shop => {
                if (!shop_list[shop.store_code]){
                    return;
                }
                result.push({
                    name: shop_list[shop.store_code].name,
                    stock: shop.stock_quantity,
                    handling: shop.place_list.length > 0,
                    lat: shop_list[shop.store_code].lat,
                    lng: shop_list[shop.store_code].lng
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