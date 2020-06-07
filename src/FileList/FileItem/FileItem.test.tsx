import React from "react";
import { shallow } from "enzyme";
import { FileItem, FileItemProps } from "./FileItem";

describe("FileList", () => {
    describe("FileItem", () => {
        const defaultProps: FileItemProps = {
            file: {
                originalName: "foo",
                size: 42,
                _id: "bar",
                createdAt: 200,
            },
            deleteFile: () => undefined,
        };

        it("renders", () => {
            const subject = shallow(<FileItem {...defaultProps}/>);

            expect(subject).toMatchSnapshot();
        });

        it("handles file delete", () => {
            const props: FileItemProps = {
                ...defaultProps,
                file: {
                    ...defaultProps.file,
                    _id: "fileId",
                },
                deleteFile: jest.fn(),
            };
            const subject = shallow(<FileItem {...props}/>);

            subject.find("button").prop("onClick")!({} as any);
            expect(props.deleteFile).toHaveBeenLastCalledWith(props.file._id);
        });
    });
});