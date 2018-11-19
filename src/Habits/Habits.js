import React, { Component } from 'react'
import './Habits.css';
import Constants from '../Constants';

class Habits extends Component {
  constructor(props) {
    super(props);

    var habits = props.habits;
    var typesHabits = [];
    var types = Object.keys(Constants.HABITSTYPES);

    for (var i=0; i<types.length; i++) {
      typesHabits[i] = {
        'type': types[i],
        'habits': []
      }
    }

    for (var j=0; j<habits.length; j++) {
      typesHabits[habits[j]['type']]['habits'].push(habits[j]);
    }

    this.state = { 'typesHabits': typesHabits };
  }

  render() {
    return (
      <div className="App-Habits">
        <h2 className="bold upperc"> Habits </h2>
          <div className="flex table-4-2-1">
          { this.state.typesHabits.map((habits, i) =>
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

export default Habits;
