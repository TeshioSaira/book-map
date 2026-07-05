import { getMelonbooks } from "../providers/melonbooks";

export async function getStoreInfo(isbn) {
    let store = {};

    let melonbooks = await getMelonbooks(isbn);

    store["melonbooks"] = melonbooks;

    return store;

}