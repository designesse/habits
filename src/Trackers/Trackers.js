import React, { Component } from 'react';
import './Trackers.css';

class Trackers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'trackers': props.trackers
    }

    this.formatTrackers = this.formatTrackers.bind(this);
  }

  formatTrackers(trackers) {
    var dayCheckHabits = [];
      trackers.forEach(function (trackerHabit, i) {
      var numMonths = trackerHabit['checksByMonths'].length;
      var checkHabit = [];
      for (var iMonth=0; iMonth<numMonths; iMonth++) {
        var checksByMonth = trackerHabit['checksByMonths'][iMonth];
        var checkedDays = checksByMonth['days'];
        var daysInMonth = (new Date(checksByMonth['year'], checksByMonth['month']+1, 0)).getDate();
        var checks = [];
        for (var iDay=0; iDay<daysInMonth; iDay++) {
          checks.push({'date': iDay+1, 'isChecked': false});
        }

        for (var iCheckDay=0; iCheckDay<checkedDays.length; iCheckDay++) {
          checks[checkedDays[iCheckDay]-1]['isChecked'] = true;
        }

       if (iMonth === 0) {
          var todayDate = (new Date()).getDate();
          checks.splice(-daysInMonth+todayDate, daysInMonth-todayDate);
        }
        if (iMonth === numMonths-1) {
          var startDate = trackerHabit['start']['day'];
          checks.splice(0, startDate-1);
        }
        checkHabit.push({'month': checksByMonth['month'], 'days': checks});
      }
      dayCheckHabits.push({'name': trackerHabit['name'], 'checksByMonths': checkHabit});
    })
    return dayCheckHabits;
  }

  render() {
    var trackers = this.formatTrackers(this.state.trackers);

    return (
      <div className="App-Trackers">
      { trackers.map((habit, i) =>
        <div key={i} className="overflow-hide">
          <h4 className="bold left title-circle"> { habit['name'] } </h4>
          { habit['checksByMonths'].map((month, j) =>
            <span key={j} className="left padding-hor right-border">
              { month['days'].map((day, k) =>
                <span key={k} className={ day['isChecked'] ? 'circle box right' : 'circle no-box right' }> { day['date'] }</span>
              )}
            </span>
          )}
        </div>
      )}
      </div>
    );
  }
};

export default Trackers;
