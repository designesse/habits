import React, { Component } from 'react';
import './HabitsByType.css';
import Constants from '../Constants';

class HabitsByType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'habits': props.habits
    };

    this.formatHabitsByType = this.formatHabitsByType.bind(this);
    this.displayOverlay = this.displayOverlay.bind(this);
  }

  formatHabitsByType(habits) {
    var habitsByType = [];
    var types = Object.keys(Constants.HABITSTYPES);

    for (var k=0; k<types.length; k++) {
      habitsByType[k] = {
        'type': types[k],
        'habits': []
      }
    }

    habits.forEach(function (habit, i) {
      habitsByType[habit['type']]['habits'].push(habit);
    })

    return habitsByType;
  }

  displayOverlay(hid, name) {
    this.props.displayOverlay(true, 'remove', 'habit', hid, name);
  }

  render() {
    var habitsByType = this.formatHabitsByType(this.state.habits);

    return (
      <div className="App-Habits">
        <h2 className="bold upperc"> Habits </h2>
          <div className="flex table-4-2-1">
          { habitsByType.map((habits, i) =>
            <div key={i} className="col">
              <h3 className="bold center"> { habits['type'] } </h3>
              <ul className="box-item-list-style no-list-style">
                { habits['habits'].map((habit, j) =>
                  <li key={j}> { habit['name'] } <button className="right" onClick={() => this.displayOverlay(habit['hid'], habit['name']) }>x</button></li>
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
