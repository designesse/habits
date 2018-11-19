import React, { Component } from 'react';
import './App.css';
import UpComingWeek from './UpComingWeek/UpComingWeek';
import Habits from './Habits/Habits';

class App extends Component {
  constructor(props) {
    super(props);


    var habits = [
      { 'hid': 0, 'type': 0, 'name': '', 'done': {} },
    ];

    var trackers = [
      { 'tid': 0, 'hid': 0,
        'tracker': [] },
    ];

    this.state = {
      'habits': habits,
      'trackers': trackers
    };

    this.checkDone = this.checkDone.bind(this);
  }

  checkDone(hid, checked) {
    var trackers = this.state.trackers;
    var tracker = [];
    for (var i=0; i<trackers.length; i++) {
      if (trackers[i]['hid'] === hid) {
        tracker = trackers[i];
        break;
      }
    }

    var today = new Date();
    var jlastTracker = tracker['tracker'].length - 1;

    if (checked) {
      if (jlastTracker >= 0 && tracker['tracker'][jlastTracker]['year'] === today.getFullYear() && tracker['tracker'][jlastTracker]['month'] === today.getMonth()) {
        tracker['tracker'][jlastTracker]['days'].push(today.getDate());
      }
      else {
        tracker['tracker'].push({ 'year': today.getFullYear(), 'month': today.getMonth(), 'days': [today.getDate()]});
      }
    }
    else if (jlastTracker >= 0 && tracker['tracker'][jlastTracker]['year'] === today.getFullYear() && tracker['tracker'][jlastTracker]['month'] === today.getMonth()) {
      var days = tracker['tracker'][jlastTracker]['days'];
      if (days[days.length-1] === today.getDate()) {
        days.pop();
      }
    }
    this.setState({'trackers': trackers});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <UpComingWeek dailyHabits={ this.state.dailyHabits } habits={ this.state.habits } checkDone={ this.checkDone }/>
        <Habits dailyHabits={ this.state.dailyHabits } habits={ this.state.habits } />
      </div>
    );
  }
}

export default App;
