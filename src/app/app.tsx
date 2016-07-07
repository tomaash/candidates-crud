import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Root} from './components/root';

import {CandidatesStore} from './stores/candidates-store';

const candidatesStore = new CandidatesStore();

ReactDOM.render(
  <Root
    candidatesStore = {candidatesStore}
  />,
  document.getElementById('app')
);
