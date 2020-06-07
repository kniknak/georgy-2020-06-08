import React, { useCallback } from "react";
import * as styles from "./Search.module.scss";

export interface SearchProps {
    search: string
    setSearch: (search: string) => void
}

export const Search: React.FC<SearchProps> = ({ setSearch, search }) => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        setSearch(event.target.value);
    }, [setSearch]);

    return (
        <input
            className={styles.input}
            type="text"
            value={search}
            onChange={onChange}
            placeholder="Search documents..."
        />
    );
};
