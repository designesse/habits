import React, { Component } from 'react';
import './App.css';
import UpComingWeek from './UpComingWeek/UpComingWeek';
import HabitsByType from './HabitsByType/HabitsByType';
import AddButton from './AddButton/AddButton';
import AddEditForm from './AddEditForm/AddEditForm';
import Constants from './Constants';

class App extends Component {
  constructor(props) {
    super(props);

    var habits = JSON.parse(localStorage.getItem('habits')) ? JSON.parse(localStorage.getItem('habits')) : [];
    var idHabit = JSON.parse(localStorage.getItem('idHabit')) ? Number(localStorage.getItem('idHabit')) : 0;

    var weekDaysHabits = [];
    var habitsByType = [];
    var today = new Date();
    var day = today;
    var weekDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var types = Object.keys(Constants.HABITSTYPES);

    for (var i=0; i<7; i++) {
      day = new Date(today.getTime() + 1000*60*60*24*i);
      weekDaysHabits[i] = {
        'day': weekDaysName[day.getDay()] + ' ' + day.getDate(),
        'habits': []
      }
    }

    for (var k=0; k<types.length; k++) {
      habitsByType[k] = {
        'type': types[k],
        'habits': []
      }
    }

    habits.forEach(function (habit, i,) {
      this.addHabitCalendar(weekDaysHabits, habit);
      this.addHabitByTypes(habitsByType, habit);
    }.bind(this));

    var monthHeader = today.getMonth() === day.getMonth()? monthsName[today.getMonth()] : monthsName[today.getMonth()] + '/' + monthsName[day.getMonth()];

    this.state = {
      'habits': habits,
      'idHabit': idHabit,
      'isDisplayedOverlay': false,
      'monthHeader': monthHeader,
      'weekDaysHabits': weekDaysHabits,
      'habitsByType': habitsByType
    };

    this.addHabitCalendar = this.addHabitCalendar.bind(this);
    this.addHabitByTypes = this.addHabitByTypes.bind(this);
    this.checkDone = this.checkDone.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.addHabit = this.addHabit.bind(this);
  }

  addHabitCalendar(weekDaysHabits, habit) {
    var types = Constants.HABITSTYPES;
    var today = new Date();
    var colDay = 0;

    switch (habit['type']) {
      case types['daily'] :
        for (colDay=0; colDay<7; colDay++) {
          weekDaysHabits[colDay]['habits'].push(habit);
        }
        break;
      case types['weekly'] :
        colDay = habit['weekDay']-today.getDay() >= 0 ? habit['weekDay']-today.getDay() : habit['weekDay']-today.getDay()+7;
        weekDaysHabits[colDay]['habits'].push(habit);
        break;
      default: break;
    }

    return weekDaysHabits;
  }

  addHabitByTypes(habitsByType, habit) {
    habitsByType[habit['type']]['habits'].push(habit);
    return habitsByType;
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

  displayForm(isDisplayed) {
    isDisplayed ? this.setState({'isDisplayedOverlay': true}) : this.setState({'isDisplayedOverlay': false});
  }

  addHabit(name, habitType, dayOfWeek, weekOfMonth, month) {
    var id = this.state.idHabit;
    var habit = {'hid': id, 'name': name, 'type': habitType, 'weekDay': dayOfWeek, 'weekOfMonth': weekOfMonth, 'month': month,  'done': {}, 'due': {}, 'last': {}};
    var habits = this.state.habits;
    habits.push(habit);
    this.setState({'idHabit': id+1, 'habits': habits, 'weekDaysHabits': this.addHabitCalendar(this.state.weekDaysHabits, habit), 'habitByTypes': this.addHabitByTypes(this.state.habitsByType, habit)});
    localStorage.setItem('idHabit', id+1);
    localStorage.setItem('habits', JSON.stringify(habits));
  }

  render() {
    return (
      <div className="App">
        <div id="page">
          <header className="App-header"></header>
          <UpComingWeek habits={ this.state.habits } monthHeader={ this.state.monthHeader } weekDaysHabits={ this.state.weekDaysHabits} checkDone={ this.checkDone } />
          <AddButton item="habit" displayForm={ this.displayForm } isDisplayedOverlay={ this.state.isDisplayedOverlay }/>
          <HabitsByType habitsByType={ this.state.habitsByType } />
        </div>
        { this.state.isDisplayedOverlay ? <div id="overlay"></div> : ''}
        { this.state.isDisplayedOverlay ? <AddEditForm displayForm={ this.displayForm } addHabit={ this.addHabit } /> : ''}
      </div>
    );
  }
}

export default App;
