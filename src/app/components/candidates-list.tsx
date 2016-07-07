import * as React from 'react';
import {observer} from 'mobx-react';
import {CandidateCard} from './candidate-card';
import {CandidatesStore} from '../stores/candidates-store';


@observer
export class CandidatesList extends React.Component<{ candidatesStore: CandidatesStore }, {}> {
  render() {
    return (
    <div className="container">
      <h1>Listing candidates</h1>
      {this.props.candidatesStore.candidates.map((candidate, i) =>
        <CandidateCard
          candidate={candidate}
          key={i}
          />
      )}
    </div>)
  }
}
