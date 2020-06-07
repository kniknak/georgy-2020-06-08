import React from "react";
import { shallow } from "enzyme";
import { Search, SearchProps } from "./Search";

describe("Header", () => {
    describe("Search", () => {
        const defaultProps: SearchProps = {
            search: "foo",
            setSearch: () => undefined,
        }

        it("renders", () => {
            const subject = shallow(<Search {...defaultProps}/>);

            expect(subject).toMatchSnapshot();
        });

        it("handles input change", () => {
            const props: SearchProps = {
                ...defaultProps,
                setSearch: jest.fn()
            }

            const subject = shallow(<Search {...props}/>);

            const value = "bar"

            subject.find("input").prop('onChange')!({ target: { value }} as any)

            expect(props.setSearch).toHaveBeenLastCalledWith(value);
        });
    });
});