import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import {Root} from '../src/app/components/root';
import {JobsStore} from '../src/app/stores/jobs-store';
var sd = require('skin-deep');

describe('The Root component', () => {
    // let renderer: React.ShallowRenderer;
    let output: any;

    let jobsStore = new JobsStore();

    beforeEach(() => {
        // renderer = ReactTestUtils.createRenderer();
        // renderer.render(<Root fooStore={fooStore} jobsStore={jobsStore}/>);
        // output = renderer.getRenderOutput();
        output = sd.shallowRender(<Root jobsStore={jobsStore}/>);
        // console.log(JSON.stringify(output.props.children[0]));
    });

    it('should be a div', () => {
        expect(output.type).toBe('div');
    });

    it('should have 6 panels', () => {
        var sub = output.everySubTree('*', function(node) {
            var bsClass = node.props && node.props.bsClass;
            return bsClass == "panel";
        });
        expect(sub.length).toBe(6);
    });

});
