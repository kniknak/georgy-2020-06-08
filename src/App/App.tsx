import React, { useEffect } from "react";
import { Header } from "../Header/Header";
import { FileList } from "../FileList/FileList";
import { useFiles } from "./useFiles";
import { Status } from "../api/types";
import * as styles from "./App.module.scss";

export const App: React.FC = () => {
    const {
        files,
        status,
        getFiles,
        deleteFile,
        addFile,
        search,
        setSearch,
        message
    } = useFiles();

    useEffect(() => getFiles(""), [getFiles]);

    const isLoading = status === Status.Loading;
    const hasError = status === Status.Error;

    return (
        <div className={styles.root}>
            <Header
                addFile={addFile}
                search={search}
                setSearch={setSearch}
            />
            {isLoading && <div className={styles.message} data-loading>Loading...</div>}
            {hasError && (
                <div className={styles.error} data-error>
                    Unexpected Error. {message || "Try again or reload the page"}
                </div>
            )}
            {!isLoading && !hasError && (
                <FileList
                    files={files}
                    deleteFile={deleteFile}
                />
            )}
        </div>
    );
};