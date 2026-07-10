import { getMiraiya } from "../providers/miraiya";
import { getMelonbooks } from "../providers/melonbooks";
import { getMaruzen } from "../providers/maruzen";
import { getYodobashi } from "../providers/yodobashi";

export async function getStoreInfo(isbn, page, env) {
    let store = {};
    store.shopList = [];

    let miraiya = await getMiraiya(isbn, page);
    store.miraiya = miraiya;
    if(miraiya != []){
        store.shopList.push("未来屋書店");
    }

    if(page == 1){
        let melonbooks = await getMelonbooks(isbn);
        store.melonbooks = melonbooks;
        if(melonbooks != []){
            store.shopList.push("メロンブックス");
        }

        let maruzen = await getMaruzen(isbn);
        store.maruzen = maruzen;
        if(maruzen != []){
            store.shopList.push("丸善ジュンク堂書店");
        }

        const html = await getYodobashi(isbn, env);
        store.yodobashi = html;
        if(html != []){
            store.shopList.push("ヨドバシカメラ");
        }
    }

    return store;

}