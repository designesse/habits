import React, { Component } from 'react'
import './UpComingWeek.css';

class UpComingWeek extends Component {
  constructor(props) {
    super(props);
    
    var weekDays = Array(7); // 7 items
    var today = new Date();
    var day = today;
    var weekDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (var i=0; i < 7; i++) {
        day = new Date(today.getTime() + 1000*60*60*24*i);
        weekDays[i] = weekDaysName[day.getDay()] + ' ' + day.getDate();
    }
    var monthHeader = today.getMonth() === day.getMonth()? monthsName[today.getMonth()] : monthsName[today.getMonth()] + '/' + monthsName[day.getMonth()];
    
    this.state = { 
      monthHeader: monthHeader,
      weekDays: weekDays 
    };
}

  render() {
    return (
      <div className="App-UpComingWeek">
        <div className="bold"> { this.state.monthHeader } </div>
        <div className="table-7-4-2">
            {this.state.weekDays.map((day, i) =>
                <div className="col" key={i}> <span className="center"> {day} </span></div> 
            )}
        </div>
      </div>
    );
  }
};

export default UpComingWeek;

