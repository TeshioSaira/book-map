export async function getBook(isbn) {

    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );

    const json = await res.json();

    if (!json.items || json.items.length === 0) {
        return null;
    }

    const info = json.items[0].volumeInfo;

    return {
        source: "googleBooks",
        isbn: isbn,
        title: info.title ?? "",
        author: info.authors ? info.authors.join(", ") : "",
        publisher: info.publisher ?? "",
        pubdate: info.publishedDate ?? "",
        cover: info.imageLinks?.thumbnail ?? ""
    };
}