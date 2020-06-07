import React from "react";
import { shallow } from "enzyme";
import { useFiles } from "./useFiles";
import { FileInfo, Status } from "../api/types";
import { App } from "./App";
import { Header } from "../Header/Header";
import * as styles from "./App.module.scss";
import { FileList } from "../FileList/FileList";

jest.mock("./useFiles");
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useEffect: (f: Function) => f(),
}));

const mockedUseFiles = useFiles as jest.Mock<ReturnType<typeof useFiles>>;

describe("App", () => {
    const defaultUseFilesMockReturnValue: ReturnType<typeof useFiles> = {
        files: [],
        status: Status.Initial,
        getFiles: (() => undefined) as any,
        deleteFile: () => undefined,
        addFile: () => undefined,
        search: "foo",
        setSearch: () => undefined,
        message: "bar",
    };

    it("renders header", () => {
        mockedUseFiles.mockReturnValue(defaultUseFilesMockReturnValue);

        const subject = shallow(<App/>);

        expect(subject.find(Header)).toMatchSnapshot();
    });

    it("gets files on mount", () => {
        const getFiles: any = jest.fn();

        mockedUseFiles.mockReturnValue({
            ...defaultUseFilesMockReturnValue,
            getFiles,
        });

        shallow(<App/>);

        expect(getFiles).toHaveBeenLastCalledWith("");
    });

    it("renders loading state", () => {
        mockedUseFiles.mockReturnValue({
            ...defaultUseFilesMockReturnValue,
            status: Status.Loading,
        });

        const subject = shallow(<App/>);

        expect(subject.find("[data-loading]")).toMatchSnapshot();
        expect(subject.find("[data-error]")).toHaveLength(0);
        expect(subject.find(FileList)).toHaveLength(0);
    });

    it("renders error state", () => {
        mockedUseFiles.mockReturnValue({
            ...defaultUseFilesMockReturnValue,
            status: Status.Error,
            message: "baz",
        });

        const subject = shallow(<App/>);

        expect(subject.find("[data-loading]")).toHaveLength(0);
        expect(subject.find("[data-error]")).toMatchSnapshot();
        expect(subject.find(FileList)).toHaveLength(0);
    });

    it("renders error state", () => {
        const deleteFile = () => undefined;
        const files: FileInfo[] = [];

        mockedUseFiles.mockReturnValue({
            ...defaultUseFilesMockReturnValue,
            status: Status.Success,
            files,
            deleteFile,
        });

        const subject = shallow(<App/>);

        expect(subject.find("[data-loading]")).toHaveLength(0);
        expect(subject.find("[data-error]")).toHaveLength(0);
        expect(subject.find(FileList)).toMatchSnapshot();
    });
});