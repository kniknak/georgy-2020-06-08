import { formatSize } from "./formatSize";

describe("FileList", () => {
    describe("formatSize", () => {
        it("formats bytes", () => {
            expect(formatSize(30)).toBe("30b");
        });

        it("formats kilobytes", () => {
            expect(formatSize(25241)).toBe("25kb");
        });

        it("formats megabytes", () => {
            expect(formatSize(12332231)).toBe("12Mb");
        });
    });
});