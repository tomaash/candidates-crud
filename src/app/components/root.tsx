import * as React from 'react';
import {observer} from 'mobx-react';
import {Button, Panel, Glyphicon, ButtonInput} from 'react-bootstrap';
import {autobind} from 'core-decorators';
import {CandidatesStore} from '../stores/candidates-store';
import {CandidatesList} from './candidates-list';

@observer
export class Root extends React.Component<{ candidatesStore: CandidatesStore }, {}> {
  componentWillMount() {
    this.props.candidatesStore.loadCandidates()
  }
  render() {
    return <div>
      <CandidatesList candidatesStore={this.props.candidatesStore}/>
    </div>
  }
}
