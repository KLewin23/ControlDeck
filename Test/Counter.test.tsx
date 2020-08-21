import React from "react";
import renderer from "react-test-renderer";
import { Counter } from "../src/Components/Multi/Counter";
import { shallow } from "enzyme";

test("Counter renders correctly", () => {
    const counter = renderer.create(<Counter title={"Test"} defaultValue={0}/>);
    const counterTree = counter.toJSON();
    expect(counterTree).toMatchSnapshot();
});

test("Counter title is correct", () => {
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={0}/>);
    expect(counter.find("#Counter_Text").text()).toEqual("Test_Name");
});

test("Increase counter", () => {
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={0}/>);
    counter.find("#Counter_IncreaseButton").simulate("click");
    expect(counter.find("#Counter_Value").text()).toEqual("1");
});

test("Decrease counter", () => {
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={2}/>);
    counter.find("#Counter_DecreaseButton").simulate("click");
    expect(counter.find("#Counter_Value").text()).toEqual("1");
});

test("Test min value prop", () => {
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={2} minValue={1}/>);
    expect(counter.find("#Counter_Value").text()).toEqual("2");
    for (let i = 3; i > 0; i--) {
        counter.find("#Counter_DecreaseButton").simulate("click");
        expect(counter.find("#Counter_Value").text()).toEqual("1");
    }
});

test("Test max value prop", () => {
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={0} maxValue={2}/>);
    for (let i = 0; i <= 2; i++) {
        expect(counter.find("#Counter_Value").text()).toEqual(`${i}`);
        counter.find("#Counter_IncreaseButton").simulate("click");
    }
});

test("OnChange with Increase", () => {
    const mockCallback = jest.fn(value => {
    });
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={0} onChange={mockCallback}/>);
    for (let i = 1; i < 3; i++) {
        counter.find("#Counter_IncreaseButton").simulate("click");
        expect(mockCallback.mock.calls.length).toBe(i);
        expect(mockCallback).toHaveBeenCalledWith(i);
    }
});

test("OnChange with Decrease", () => {
    const mockCallback = jest.fn((value) => value);
    const counter = shallow(<Counter title={"Test_Name"} defaultValue={3} onChange={mockCallback}/>);
    for (let i = 3; i > 0; i--) {
        counter.find("#Counter_DecreaseButton").simulate("click");
        expect(mockCallback.mock.calls.length).toBe(4 - i);
        expect(mockCallback).toHaveBeenCalledWith(i - 1);
    }
});
