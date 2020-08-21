import React from "react";
import { CustomModal } from "../src/Components/Multi/CustomModal";
import { mount, shallow } from "enzyme";

test("Custom Modal renders correctly", () => {
    const modal = mount(<CustomModal title={"Test"} onClose={() => {
    }} open={true}><p>test_text</p></CustomModal>);
    expect(modal).toMatchSnapshot();
});

test("Test if title shows correct content", () => {
    const modal = shallow(<CustomModal title={"Test_Name"} onClose={() => {
    }} open={true}><p>test_text</p></CustomModal>);
    expect(modal.find("#Test_Name_title").text()).toBe("Test_Name");
});
