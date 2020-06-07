import React from "react";
import { shallow } from "enzyme";
import { FileList, FileListProps } from "./FileList";

describe("FileList", () => {
    describe("FileList", () => {
        const defaultProps: FileListProps = {
            files: [{
                originalName: "foo",
                size: 42,
                _id: "bar",
                createdAt: 200,
            }],
            deleteFile: () => undefined,
        };

        it("renders", () => {
            const subject = shallow(<FileList {...defaultProps}/>);

            expect(subject).toMatchSnapshot();
        });
    });
});