import React, { Component } from 'react'
import './HabitsByType.css';

class HabitsByType extends Component {
  render() {
    return (
      <div className="App-Habits">
        <h2 className="bold upperc"> Habits </h2>
          <div className="flex table-4-2-1">
          { this.props.habitsByType.map((habits, i) =>
            <div key={i} className="col">
              <h3 className="bold center"> { habits['type'] } </h3>
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

export default HabitsByType;
