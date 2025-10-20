import { Link } from "@/models/link";
import { ListResponse } from "@/models/shared";
import api from "@/utils/ky";

async function getAll(): Promise<ListResponse<Link>> {
    const res = await api.get<ListResponse<Link>>("links").json();
    return res;
}

async function create(data: Partial<Link>): Promise<Link> {
    return await api.post<Link>("links", { json: data }).json();
}

export const linksService = {
    getAll,
    create,
};
