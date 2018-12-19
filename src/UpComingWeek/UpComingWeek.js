import React, { Component } from 'react';
import './UpComingWeek.css';
import '../InputListItem/InputListItem';
import InputListItem from '../InputListItem/InputListItem';
import Constants from '../Constants';

class UpComingWeek extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'habits': props.habits,
      'trackers': props.trackers
    };

    this.formatUpcomingWeek = this.formatUpcomingWeek.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  formatUpcomingWeek(habits) {
    var today = new Date();
    var day = today;
    var weekDaysHabits = [];
    var weekDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (var i=0; i<7; i++) {
      day = new Date(today.getTime() + 1000*60*60*24*i);
      weekDaysHabits[i] = {
        'day': weekDaysName[day.getDay()] + ' ' + day.getDate(),
        'habits': []
      }
    }

    habits.forEach(function (habit, i) {
      var types = Constants.HABITSTYPES;
      var today = new Date();

      switch (habit['type']) {
        case types['daily'] :
          for ( var colDay=0; colDay<7; colDay++ ) {
            var disabled = ( colDay === 0 ) ? false : true;
            var checked = ( colDay === 0 && this.isChecked(habit['tid']) ) ? true : false;
            var dailyCheckBoxHabit = Object.assign({'checked': checked, 'disabled': disabled}, habit);
            weekDaysHabits[colDay]['habits'].push(dailyCheckBoxHabit);
          }
          break;
        case types['weekly'] :
          var weeklyColDay = habit['weekDay']-today.getDay() >= 0 ? habit['weekDay']-today.getDay() : habit['weekDay']-today.getDay()+7;
          var WeeklyCheckBoxHabit = Object.assign({'checked': this.isChecked(habit['tid']), 'disabled': ( habit['weekDay'] === today.getDay() ) ? false : true}, habit);
          weekDaysHabits[weeklyColDay]['habits'].push(WeeklyCheckBoxHabit);
          break;
        default: break;
      }
    }.bind(this))
    var monthHeader = today.getMonth() === day.getMonth()? monthsName[today.getMonth()] : monthsName[today.getMonth()] + '/' + monthsName[day.getMonth()];

    return {'header': monthHeader, 'habits': weekDaysHabits};
  };

  isChecked(tid) {
    var trackers = this.state.trackers;
    var checked = false;
    var today = new Date();

    if ( tid>-1 ) {
      var tracker = [];
      for (var i=0; i<trackers.length; i++) {
        if (trackers[i]['tid'] === tid) {
          tracker = trackers[i];
          break;
        }
      }
      if ( tracker['checksByMonths'][0]['year'] === today.getFullYear() && tracker['checksByMonths'][0]['month'] === today.getMonth() && tracker['checksByMonths'][0]['days'][tracker['checksByMonths'][0]['days'].length-1] === today.getDate() ) {
        checked = true;
      }
    }

    return checked;
  }

  render() {
    var upComingWeek = this.formatUpcomingWeek(this.state.habits);

    return (
      <div className="App-UpComingWeek">
        <h2 className="bold upperc"> { upComingWeek['header'] } </h2>
        <div className="flex table-7-4-2">
            { upComingWeek['habits'].map((daysHabit, i) =>
              <div className="col highlight-1" key={i}>
                <h3 className="bold center"> { daysHabit.day} </h3>
                <ul className="box-item-list-style no-list-style">
                  { daysHabit.habits.map((habit, j) =>
                    <InputListItem key={j} habit={ habit } checkDone={ this.props.checkDone }/>
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>
    );
  }
};

export default UpComingWeek;
