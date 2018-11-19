import React, { Component } from 'react'
import './UpComingWeek.css';
import '../InputListItem/InputListItem';
import InputListItem from '../InputListItem/InputListItem';
import Constants from '../Constants';

class UpComingWeek extends Component {
  constructor(props) {
    super(props);

    var habits = props.habits;
    var types = Constants.HABITSTYPES;
    var weekDaysHabits = [];
    var today = new Date();
    var day = today;
    var colDay = 0;
    var weekDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (var i=0; i<7; i++) {
      day = new Date(today.getTime() + 1000*60*60*24*i);
      weekDaysHabits[i] = {
        'day': weekDaysName[day.getDay()] + ' ' + day.getDate(),
        'habits': []
      }
    }

    for (var j=0; j<habits.length; j++) {
      if (habits[j]['type'] === types['daily']) {
        for (colDay=0; colDay<7; colDay++) {
          weekDaysHabits[colDay]['habits'].push(this.formatHabit(habits[j], colDay));
        }
      }
      else if (habits[j]['type'] === types['weekly']) {
        colDay = habits[j]['weekDay'] - today.getDay() >= 0 ? habits[j]['weekDay'] - today.getDay() : habits[j]['weekDay'] - today.getDay() + 7;
        weekDaysHabits[colDay]['habits'].push(this.formatHabit(habits[j], colDay));
      }
    }

    var monthHeader = today.getMonth() === day.getMonth()? monthsName[today.getMonth()] : monthsName[today.getMonth()] + '/' + monthsName[day.getMonth()];

    this.state = {
      'monthHeader': monthHeader,
      'weekDaysHabits': weekDaysHabits,
    };

    this.formatHabit = this.formatHabit.bind(this);
  }

  formatHabit(habit, colDay) {
    var checked = false;
    var disabled = true;
    if (colDay === 0) {
      disabled = false;
      var today = new Date();
      if (habit.done.date === today.getDate() && habit.done.month === today.getMonth() && habit.done.year === today.getFullYear()) {
        checked = true;
      }
    }

    return {'name': habit.name, 'hid': habit.hid, 'checked': checked, 'disabled': disabled };
  }

  render() {
    return (
      <div className="App-UpComingWeek">
        <h2 className="bold upperc"> { this.state.monthHeader } </h2>
        <div className="flex table-7-4-2">
            { this.state.weekDaysHabits.map((daysHabit, i) =>
              <div className="col highlight-1" key={i}>
                <h3 className="bold center"> { daysHabit.day} </h3>
                <ul className="no-list-style">
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
