import React from "react";
import { shallow } from "enzyme";
import { FileUpload, FileUploadProps } from "./FileUpload";
import { useFileUpload } from "./useFileUpload";

jest.mock("./useFileUpload");

const mockedUseFileUpload = useFileUpload as jest.Mock<ReturnType<typeof useFileUpload>>;

describe("Header", () => {
    describe("FileUpload", () => {
        it("renders", () => {
            mockedUseFileUpload.mockReturnValue({
                onSubmit: () => undefined,
                onChange: () => undefined,
            });

            const props: FileUploadProps = {
                addFile: () => undefined,
            };

            const subject = shallow(<FileUpload {...props}/>);

            expect(subject).toMatchSnapshot();

            expect(mockedUseFileUpload).toHaveBeenLastCalledWith(props.addFile);
        });
    });
});