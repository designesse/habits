import React, { Component } from 'react'
import './UpComingWeek.css';
import '../InputListItem/InputListItem';
import InputListItem from '../InputListItem/InputListItem';

class UpComingWeek extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'monthHeader': props.monthHeader,
      'weekDaysHabits': props.weekDaysHabits,
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
