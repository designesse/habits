import React, { Component } from 'react';
import './App.css';
import UpComingWeek from './UpComingWeek/UpComingWeek';
import Trackers from './Trackers/Trackers';
import HabitsByType from './HabitsByType/HabitsByType';
import AddButton from './AddButton/AddButton';
import AddEditForm from './AddEditForm/AddEditForm';

class App extends Component {
  constructor(props) {
    super(props);

    var habits = JSON.parse(localStorage.getItem('habits')) ? JSON.parse(localStorage.getItem('habits')) : [];
    var idHabit = JSON.parse(localStorage.getItem('idHabit')) ? Number(localStorage.getItem('idHabit')) : 0;
    var trackers = JSON.parse(localStorage.getItem('trackers')) ? JSON.parse(localStorage.getItem('trackers')) : [];
    var idTracker = JSON.parse(localStorage.getItem('idTracker')) ? Number(localStorage.getItem('idTracker')) : 0;

    this.state = {
      'habits': habits,
      'idHabit': idHabit,
      'trackers': trackers,
      'idTracker': idTracker,
      'isDisplayedOverlay': false,
    };

    this.checkDone = this.checkDone.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.addHabit = this.addHabit.bind(this);
  }

  checkDone(hid, checked) {
    var trackers = this.state.trackers;
    var tracker = [];
    var today = new Date();
    for (var i=0; i<trackers.length; i++) {
      if (trackers[i]['hid'] === hid) {
        tracker = trackers[i];
        break;
      }
    }

    if (checked) {
      if ( tracker['checksByMonths'][0]['year'] === today.getFullYear() && tracker['checksByMonths'][0]['month'] === today.getMonth() ) {
        tracker['checksByMonths'][0]['days'].push(today.getDate());

      }
    }
    else {
      if ( tracker['checksByMonths'][0]['year'] === today.getFullYear() && tracker['checksByMonths'][0]['month'] === today.getMonth() && tracker['checksByMonths'][0]['days'][tracker['checksByMonths'][0]['days'].length-1] === today.getDate() ) {
        tracker['checksByMonths'][0]['days'].pop();
      }
    }

    trackers[i] = tracker;
    this.setState({'trackers': trackers});
    localStorage.setItem('trackers', JSON.stringify(trackers));
  }

  displayForm(isDisplayed) {
    isDisplayed ? this.setState({'isDisplayedOverlay': true}) : this.setState({'isDisplayedOverlay': false});
  }

  addHabit(name, habitType, dayOfWeek, weekOfMonth, month, isTracker) {
    var id = this.state.idHabit;
    var tid = isTracker ? this.state.idTracker : -1;
    var habit = {'hid': id, 'name': name, 'type': habitType, 'weekDay': dayOfWeek, 'weekOfMonth': weekOfMonth, 'month': month, 'tid': tid};
    var habits = this.state.habits;
    habits.push(habit);
    var update = {'idHabit': id+1, 'habits': habits};

    if (isTracker) {
      var today = new Date();
      tid = this.state.idTracker;
      var tracker = { 'tid': tid, 'hid': id, 'name': name, 'start': {'day': today.getDate(), 'month': today.getMonth(), 'year': today.getFullYear()}, 'checksByMonths': [{ 'year': today.getFullYear(), 'month': today.getMonth(), 'days': []}] };
      var trackers = this.state.trackers;
      trackers.push(tracker);
      update['trackers'] = trackers;
      update['idTracker'] = tid + 1;
    }

    this.setState(update);
    localStorage.setItem('idHabit', id+1);
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('idTracker', tid+1);
    localStorage.setItem('trackers', JSON.stringify(trackers));
  }

  render() {
    return (
      <div className="App">
        <div id="page">
          <header className="App-header"></header>
          <UpComingWeek habits={ this.state.habits } trackers={ this.state.trackers } checkDone={ this.checkDone } />
          <AddButton item="habit" displayForm={ this.displayForm } isDisplayedOverlay={ this.state.isDisplayedOverlay }/>
          <Trackers trackers={ this.state.trackers } />
          <HabitsByType habits={ this.state.habits } />
        </div>
        { this.state.isDisplayedOverlay ? <div id="overlay"></div> : ''}
        { this.state.isDisplayedOverlay ? <AddEditForm displayForm={ this.displayForm } addHabit={ this.addHabit } /> : ''}
      </div>
    );
  }
}

export default App;
