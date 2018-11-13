import React, { Component } from 'react';
import './App.css';
import UpComingWeek from './UpComingWeek/UpComingWeek';
import Habits from './Habits/Habits';

class App extends Component {
  constructor(props) {
    super(props);

    var dailyHabits = [
      { 'name': '', },
    ];

    var weeklyHabits = [
      { 'name': '', 'weekDay': 0, },
    ];

    var monthlyHabits = [
      { 'name': '', },
    ];

    var yearlyHabits = [
      { 'name': '', },
    ];

    this.state = {
      'dailyHabits': dailyHabits,
      'weeklyHabits': weeklyHabits,
      'monthlyHabits': monthlyHabits,
      'yearlyHabits': yearlyHabits
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <UpComingWeek  dailyHabits={ this.state.dailyHabits } weeklyHabits={ this.state.weeklyHabits } monthlyHabits={ this.state.monthlyHabits} yearlyHabits={ this.state.yearlyHabits} />
        <Habits dailyHabits={ this.state.dailyHabits } weeklyHabits={ this.state.weeklyHabits } monthlyHabits={ this.state.monthlyHabits} yearlyHabits={ this.state.yearlyHabits} />
      </div>
    );
  }
}

export default App;
