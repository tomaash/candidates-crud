import * as React from 'react';
import {observer} from 'mobx-react';
import {Button, Panel, Glyphicon} from 'react-bootstrap';
import {autobind} from 'core-decorators';
import {Candidate} from '../interfaces/candidate';
declare var CameraTag;
@observer
export class CandidateCard extends React.Component<{ candidate: Candidate }, {}> {
  componentDidMount() {
    CameraTag.setup();
  }

  render() {
    var can = this.props.candidate;
    const title = can.firstName + " " + can.lastName;

    return (
      <Panel header={title}>
        <p>{can.passion}</p>
        <video id={can.video.uuid} data-uuid={'["'+can.video.uuid+'"]'}></video>
      </Panel>)
  }
}

// <video width="320" height="240" controls>
//   <source src={can.video.formats.qvga.mp4_url} type="video/mp4"/>
//     Your browser does not support the video tag.
// </video>
