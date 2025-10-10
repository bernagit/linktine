import { Collection } from "@/models/collection";
import { ListResponse } from "@/models/shared";
import api from "@/utils/ky";

async function getAll(): Promise<ListResponse<Collection>> {
    const res = await api.get<ListResponse<Collection>>("collections").json();
    return res;
}

async function getById(id: string): Promise<Collection> {
    return await api.get<Collection>(`collections/${id}`).json();
}

async function create(data: Partial<Collection>): Promise<Collection> {
    return await api.post<Collection>("collections", { json: data }).json();
}

async function update(id: string, data: Partial<Collection>): Promise<Collection> {
    return await api.put<Collection>(`collections/${id}`, { json: data }).json();
}

export const collectionsService = {
    getAll,
    getById,
    create,
    update,
};
