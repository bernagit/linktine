import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchMetadata(url: string) {
    try {
        const resp = await axios.get(url, {
            timeout: 5000,
            headers: { "User-Agent": "LinkTine" },
        });
        const html = resp.data;
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr("content") ?? $("title").text();
        const description =
            $('meta[property="og:description"]').attr("content") ??
            $('meta[name="description"]').attr("content") ??
            undefined;
        const thumbnail = $('meta[property="og:image"]').attr("content") ?? undefined;
        const domain = new URL(url).hostname.replace(/^www\./, "");

        return { title, description, thumbnail, domain };
    } catch (err) {
        // don't block link creation on metadata failure
        return {
            title: undefined,
            description: undefined,
            thumbnail: undefined,
            domain: undefined,
        };
    }
}
