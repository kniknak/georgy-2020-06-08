import React from "react";
import { shallow } from "enzyme";
import { Header, HeaderProps } from "./Header";

describe("Header", () => {
    it("renders", () => {
        const props: HeaderProps = {
            addFile: () => undefined,
            setSearch: () => undefined,
            search: "foo",
        }
        const subject = shallow(<Header {...props}/>);

        expect(subject).toMatchSnapshot();
    });
});