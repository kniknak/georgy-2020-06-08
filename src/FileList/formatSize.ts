export const formatSize = (size: number) => (
    size >= 1024 * 1024
        ? Math.round(size / 1024 / 1024) + "Mb"
        : (
            size >= 1024
                ? Math.round(size / 1024) + "kb"
                : size + "b"
        )
);