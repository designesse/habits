import React, { Component } from 'react'
import './Habits.css';

class Habits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'habits': [
        {'type': 'daily', 'habits': props.dailyHabits},
        {'type': 'weekly', 'habits': props.weeklyHabits},
        {'type': 'monthly', 'habits': props.monthlyHabits},
        {'type': 'yearly', 'habits': props.yearlyHabits},
      ]
    };
  }

  render() {
    return (
      <div className="App-Habits">
        <div className="bold upperc"> Habits </div>
          <div className="flex table-4-2-1">
          { this.state.habits.map((habits, i) =>
            <div key={i} className="col">
              <div className="bold center"> { habits['type'] } </div>
              <ul className="no-list-style">
                { habits['habits'].map((habit, j) =>
                  <li key={j}> { habit['name'] } </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Habits;