import { getMelonbooks } from "../providers/melonbooks";
import { getMaruzen } from "../providers/maruzen";
import { getYodobashi } from "../providers/yodobashi";

export async function getStoreInfo(isbn) {
    let store = {};

    let melonbooks = await getMelonbooks(isbn);
    store["melonbooks"] = melonbooks;

    let maruzen = await getMaruzen(isbn);
    store["maruzen"] = maruzen;

    let yodobashi = await getYodobashi(isbn);
    store["yodobashi"] = yodobashi;

    return store;

}