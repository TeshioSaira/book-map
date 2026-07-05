import { getMelonbooks } from "../providers/melonbooks";
import { getMaruzen } from "../providers/maruzen";
import { getYodobashi } from "../providers/yodobashi";

export async function getStoreInfo(isbn, env) {
    let store = {};

    let melonbooks = await getMelonbooks(isbn);
    store["melonbooks"] = melonbooks;

    let maruzen = await getMaruzen(isbn);
    store["maruzen"] = maruzen;

    const html = await getYodobashi(isbn, env);
    store["yodobashi"] = html;

    return store;

}