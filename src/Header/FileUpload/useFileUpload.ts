import{ useCallback, useState } from "react";


export const useFileUpload = (addFile: (file: File) => void) => {
    const [file, setFile] = useState<File | null>(null);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0]
            setFile(file);
            addFile(file)
        }
        event.target.value = "";
    }, [setFile, addFile]);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(event => {
        event.preventDefault();

        if (!file) {
            return;
        }

        addFile(file);
    }, [file, addFile]);

    return {
        onSubmit,
        onChange,
    };
};