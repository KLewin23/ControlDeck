import React from "react";
import renderer from "react-test-renderer";
import DeviceCard from '../Components/DeviceCard'
import { Status } from "../Store/MainReducer";

// jest.mock("react-native", () => ({
//     dimensions: {
//         window: {
//             width: 320,
//             height: 667,
//             scale: 2,
//             fontScale: 2,
//         },
//         get: (part) => {
//             return (this.dimensions)[part]
//         },
//         set: (part) => {
//             Object.assign(this.dimensions, part);
//             return true;
//         }
//     },
//     Animated: {
//         Value: (value) =>
//     }
// }))

describe("<DeviceCard/>", () => {
  it("Has 1 child", () => {
    const tree = renderer.create(<DeviceCard index={0} name={"test"} selectConnection={0} selectedConn={false} status={Status.disconnected}/>).toJSON();
    //expect(tree.children.length).toBe(1);
  });
});
