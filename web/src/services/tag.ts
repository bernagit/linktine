import { TagSearch } from "@/models/tag";
import api from "@/utils/ky";

async function get_suggestions(searchKey: string): Promise<TagSearch[]> {
    const response = await api
        .get<{ suggestions: TagSearch[] }>(`tags/suggestions?query=${searchKey}`)
        .json();
    return response.suggestions;
}

export const tagService = {
    get_suggestions,
};
