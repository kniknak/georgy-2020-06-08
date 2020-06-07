import React from "react";
import { shallow } from "enzyme";
import { FileListInfo, FileListInfoProps } from "./FileListInfo";

describe("FileList", () => {
    describe("FileListInfo", () => {
        const defaultProps: FileListInfoProps = {
            files: [{
                originalName: "foo",
                size: 42,
                _id: "bar",
                createdAt: 200,
            }],
        };

        it("renders", () => {
            const subject = shallow(<FileListInfo {...defaultProps}/>);

            expect(subject).toMatchSnapshot();
        });
    });
});