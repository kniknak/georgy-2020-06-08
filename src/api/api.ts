import { FileInfo } from "./types";

const endpoint = "http://localhost:3003/files";

const validateResponse = async (res: Response) => {
    const data = await res.json();

    if (!res.ok || !data.status) {
        throw data;
    }

    return data;
};

export const apiFetchFiles = (search: string): Promise<{ data: FileInfo[], search: string }> => {
    const url = new URL(endpoint);

    if (search) {
        url.searchParams.append("search", search);
    }

    return fetch(url.href, { mode: "cors" })
        .then(validateResponse)
        .then(response => ({
            ...response,
            search,
        }));
};

export const apiAddFile = (file: File) => {
    if (file.size >= 10 * 1024 * 1024) {
        return Promise.reject(new Error("File size exceeds 10Mb"));
    }

    const data = new FormData();
    data.append("upload", file);

    return fetch(endpoint, {
        method: "POST",
        body: data,
        mode: "cors",
    })
        .then(validateResponse);
};

export const apiDeleteFile = (id: string) => (
    fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        mode: "cors",
    })
        .then(validateResponse)
);