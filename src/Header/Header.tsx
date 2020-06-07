import React from "react";
import { FileUpload } from "./FileUpload/FileUpload";
import { Search } from "./Search/Search";
import * as styles from "./Header.module.scss";

export interface HeaderProps {
    addFile: (file: File) => void
    search: string
    setSearch: (search: string) => void
}

export const Header: React.FC<HeaderProps> = ({ addFile, search, setSearch }) => {
    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <Search
                    search={search}
                    setSearch={setSearch}
                />
            </div>
            <div className={styles.upload}>
                <FileUpload addFile={addFile}/>
            </div>
        </div>
    );
};
