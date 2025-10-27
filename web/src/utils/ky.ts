import ky from "ky";

const api = ky.extend({
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    cache: "no-store",
    credentials: "include",
});

export default api;
