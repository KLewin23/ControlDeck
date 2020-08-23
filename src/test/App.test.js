import React, {ReactElement} from 'react'
import renderer from 'react-test-renderer';
import App from '../App'
import Home from "../Pages/Home";

describe('<App/>',() => {
    it('Has 1 child', () => {
        const tree = renderer.create(<App/>).toJSON();
        expect(tree.children.length).toBe(1)
    });
})
