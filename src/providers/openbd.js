export async function getBook(isbn) {
    const res = await fetch(
        `https://api.openbd.jp/v1/get?isbn=${isbn}`
    );
    const json = await res.json();
    if (!json || !json[0]) {
        return null;
    }
    const summary = json[0].summary;
    return {
        source: "openbd",
        isbn: summary.isbn,
        title: summary.title,
        author: summary.author,
        publisher: summary.publisher,
        pubdate: summary.pubdate,
        cover: summary.cover
    };
}