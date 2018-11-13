import React, { Component } from 'react'
import './UpComingWeek.css';

class UpComingWeek extends Component {
  constructor(props) {
    super(props);

    var weekDaysHabits = [];
    var today = new Date();
    var day = today;
    var weekDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Create day columns with header and daily habits.
    for (var i=0; i<7; i++) {
      day = new Date(today.getTime() + 1000*60*60*24*i);
      weekDaysHabits[i] = {
        'day': weekDaysName[day.getDay()] + ' ' + day.getDate(),
        'habits': Object.create(props.dailyHabits)
      };
    }

    // Add weekly habits.
    var weeklyHabits = props.weeklyHabits;
    for (var j=0; j<weeklyHabits.length; j++) {
      var jDay = weeklyHabits[j]['weekDay'] - today.getDay() >= 0 ? weeklyHabits[j]['weekDay'] - today.getDay() : weeklyHabits[j]['weekDay'] - today.getDay() + 7;
      weekDaysHabits[jDay]['habits'].push(weeklyHabits[j]);
    }

    var monthHeader = today.getMonth() === day.getMonth()? monthsName[today.getMonth()] : monthsName[today.getMonth()] + '/' + monthsName[day.getMonth()];

    this.state = {
      monthHeader: monthHeader,
      'weekDaysHabits': weekDaysHabits,
    };
}

  render() {
    return (
      <div className="App-UpComingWeek">
        <div className="bold upperc"> { this.state.monthHeader } </div>
        <div className="flex table-7-4-2">
            { this.state.weekDaysHabits.map((daysHabit, i) =>
              <div className="col highlight-1" key={i}>
                <span className="bold center"> { daysHabit.day} </span>
                <ul className="no-list-style">
                  { daysHabit.habits.map((habit, j) =>
                    <li key={j}> { habit.name } </li>
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
