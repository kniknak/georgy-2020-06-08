import React from "react";
import * as styles from "./FileListInfo.module.scss";
import { formatSize } from "../formatSize";
import { FileInfo } from "../../api/types";

export interface FileListInfoProps {
    files: FileInfo[]
}

export const FileListInfo: React.FC<FileListInfoProps> = ({ files }) => {
    const fileSize = files.reduce((size, file) => size + file.size, 0);

    return (
        <div className={styles.root}>
            <div className={styles.count}>{files.length} Documents</div>
            <div className={styles.size}>Total size: {formatSize(fileSize)}</div>
        </div>
    );
};

