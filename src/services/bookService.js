import { getOpenBD } from "../providers/openbd";
import { getGoogleBook } from "../providers/googleBooks";

export async function getBookInfo(isbn) {

    let book = await getOpenBD(isbn);

    if (!book) {
        book = await getGoogleBook(isbn);
    }

    return book;

}