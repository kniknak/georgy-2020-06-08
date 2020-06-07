import { useCallback, useState } from "react";
import { FileInfo, Status } from "../api/types";
import { apiAddFile, apiDeleteFile, apiFetchFiles } from "../api/api";
import throttle from "lodash.throttle";

export const useFiles = () => {
    const [status, setStatus] = useState(Status.Initial);
    const [message, setMessage] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [files, setFiles] = useState<FileInfo[]>([]);

    const onError = useCallback(error => {
        console.error(error);
        setFiles([]);
        setStatus(Status.Error);
        setMessage(error.message);
    }, [setStatus, setFiles]);

    const getFiles = useCallback(throttle((search: string) => {
        if (search && !search.match(/^[0-9a-zA-Z.]([\s0-9a-zA-Z.]*[0-9a-zA-Z.])?$/)) {
            return;
        }

        setStatus(Status.Loading);

        apiFetchFiles(search)
            .then(result => {
                if (result.search === search) {
                    setFiles(result.data);
                    setStatus(Status.Success);
                }
            })
            .catch(onError);
    }, 500), [setFiles, setStatus, onError, throttle]);

    const deleteFile = useCallback((id: string) => {
        apiDeleteFile(id)
            .then(() => getFiles(searchValue))
            .catch(onError);
    }, [getFiles, onError, searchValue]);

    const addFile = useCallback((file: File) => {
        apiAddFile(file)
            .then(() => getFiles(searchValue))
            .catch(onError);

    }, [getFiles, onError, searchValue]);

    const setSearch = useCallback((search: string) => {
        setSearchValue(search);
        return getFiles(search);
    }, [setSearchValue, getFiles]);

    return {
        status,
        files,
        getFiles,
        deleteFile,
        addFile,
        search: searchValue,
        setSearch,
        message,
    };
};