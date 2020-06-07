import React from "react";
import { FileInfo } from "../api/types";
import { FileItem } from "./FileItem/FileItem";
import * as styles from "./FileList.module.scss";
import { FileListInfo } from "./FileListInfo/FileListInfo";

export interface FileListProps {
    files: FileInfo[]
    deleteFile: (id: string) => void
}

export const FileList: React.FC<FileListProps> = ({ files, deleteFile }) => {
    return (
        <div>
            <FileListInfo files={files}/>
            <ul className={styles.list}>
                {files.map(file => (
                    <FileItem
                        key={file._id}
                        file={file}
                        deleteFile={deleteFile}
                    />
                ))}
            </ul>
        </div>
    );
};
