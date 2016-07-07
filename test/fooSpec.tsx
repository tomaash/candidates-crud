import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import {Foo} from '../src/app/components/foo-component';
var sd = require('skin-deep');

describe('The Foo component', () => {
    // let renderer: React.ShallowRenderer;
    let output: any;

    beforeEach(() => {
        // renderer = ReactTestUtils.createRenderer();
        // renderer.render(<Foo/>);
        output = sd.shallowRender(<Foo/>); //renderer.getRenderOutput();
    });

    it('should be a h1', () => {
        expect(output.type).toBe('h1');
    });

    // it('should have 3 children', () => {
    //     expect(output.props.children.length).toBe(3);
    // });
});
