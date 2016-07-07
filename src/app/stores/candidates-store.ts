import * as axios from 'axios';
import {observable, action} from 'mobx';
import {Candidate} from '../interfaces/candidate';
import {API_URL} from '../config';

export class CandidatesStore {
  @observable candidates:Array<Candidate>;

  constructor() {
    this.candidates = [];
  }

  @action loadCandidates() {
    console.log('load!');
    axios.get(API_URL+'candidates').then((res)=>{
      this.candidates = res.data['result'];
      console.log(this.candidates);
    })
  }
}
