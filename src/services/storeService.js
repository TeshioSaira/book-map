import { getMelonbooks } from "../providers/melonbooks";
import { getMaruzen } from "../providers/maruzen";

export async function getStoreInfo(isbn) {
    let store = {};

    let melonbooks = await getMelonbooks(isbn);
    store["melonbooks"] = melonbooks;
    
    let maruzen = await getMaruzen(isbn);
    store["maruzen"] = maruzen;

    return store;

}