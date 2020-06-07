import React from "react";
import { useFileUpload } from "./useFileUpload";
import * as styles from "./FileUpload.module.scss";

export interface FileUploadProps {
    addFile: (file: File) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({ addFile }) => {
    const {
        onSubmit,
        onChange,
    } = useFileUpload(addFile);

    return (
        <form onSubmit={onSubmit}>
            <input
                className={styles.input}
                type="file"
                onChange={onChange}
                accept="image/png, image/jpeg"
                id="file-upload"
            />
            <label
                className={styles.button}
                htmlFor="file-upload"
            >
                Upload
            </label>
        </form>
    );
};
