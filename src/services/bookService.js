import { getBook as getOpenBD } from "../providers/openbd";
import { getBook as getGoogleBook } from "../providers/googleBooks";

export async function getBookInfo(isbn) {

    let book = await getOpenBD(isbn);

    if (!book) {
        book = await getGoogleBook(isbn);
    }

    return book;

}