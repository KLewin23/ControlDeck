import React from "react";
import renderer from "react-test-renderer";
import CustomGridList  from "../src/Components/Multi/CustomGridList";
import { shallow } from "enzyme";

const testData = [
    {name: "test1", type: 0},
    {name: "test2", type: 1},
    {name: "test3", type: 2},
    {name: "test4", type: 3}
]

test("Custom Grid List renders correctly", () => {
    const list = renderer.create(<CustomGridList  data={testData}/>);
    expect(list.toJSON()).toMatchSnapshot();
});

test("Renders correct amount of tiles", () => {
    const list  = shallow(<CustomGridList data={testData}/>)
    expect(list.children().length).toBe(4)
})

test("Test OnClick for tiles", () => {
    const mockCallback = jest.fn((value) => value);
    const list = shallow(<CustomGridList data={testData} onTileClick={mockCallback}/>)
    list.find("#test1").simulate("click");
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback).toHaveBeenCalledWith(0)
})

test("Warning text shows or not", () => {
    const mockCallback = jest.fn((element) => (element.name === "test3")?"show_test_warning":"no_warning_test");
    const list = shallow(<CustomGridList data={testData} checkForWarnings={mockCallback}/>)
    expect(list.find("#test3_warning").childAt(0).name()).toBe("ErrorOutlineTwoToneIcon")
    expect(list.find("#test3_warning").prop('title')).toBe("show_test_warning")
    expect(list.find("#test1_warning").prop('title')).toBe("no_warning_test")
})

test("Check the correct icon is shown", () => {
    const list = shallow(<CustomGridList data={testData}/>)
    expect(list.find("#test2_list_icon").childAt(0).name()).toBe("PhoneIphoneIcon")
})

test("Check the name for each tile is shown",() => {
    const list = shallow(<CustomGridList data={testData}/>)
    expect(list.find("#test4_text").text()).toBe("test4")
})
