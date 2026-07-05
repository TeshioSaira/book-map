/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getBookInfo } from "./services/bookService";
import { getStoreInfo } from "./services/storeService";

export default {
    async fetch(request, env) {

        const url = new URL(request.url);
        const isbn = url.searchParams.get("isbn");

        if (!isbn) {
            return Response.json({
                success: false,
                error: "ISBNを指定してください"
            });
        }

        const book = await getBookInfo(isbn);
		const stores = await getStoreInfo(isbn, env);

        return Response.json({
            success: book != null,
            book: book,
            stores: stores
        });

    }
};