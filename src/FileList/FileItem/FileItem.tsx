import React, { useCallback } from "react";
import { FileInfo } from "../../api/types";
import * as styles from "./FileItem.module.scss";
import { formatSize } from "../formatSize";

export interface FileItemProps {
    file: FileInfo
    deleteFile: (id: string) => void
}

export const FileItem: React.FC<FileItemProps> = ({ file, deleteFile }) => {
    const onClick = useCallback(() => deleteFile(file._id), [deleteFile, file]);

    return (
        <li className={styles.root}>
            <div className={styles.filename}>{file.originalName}</div>
            <div className={styles.size}>{formatSize(file.size)}</div>
            <button
                className={styles.button}
                onClick={onClick}
            >
                Delete
            </button>
        </li>
    );
};
