import React, { Component } from 'react'
import Constants from '../Constants';

class AddEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'isNameEmptyWarning': false,
      'name': '',
      'habitType': 0,
      'weekDay': 0,
    }

    this.updateName = this.updateName.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateName(event) {
    this.setState({'name': event.target.value});
  }

  updateType(iType) {
    this.setState({'habitType': Number(iType)});
  }
  
  updateDay(event) {
    this.setState({'weekDay': Number(event.target.value)});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.length === 0) {
      this.setState({isNameEmptyWarning: true});
    }
    else {
      this.props.addHabit(this.state.name, this.state.habitType, this.state.weekDay);
      this.props.displayOverlay(false);
    }
  }

  render() {  
    return (
      <div className="App-AddEditForm overlay">
        <form onSubmit={this.handleSubmit}>
          <h2> Add habit </h2>
          
          <div className="marg-b">
            <div className="marg-ver"><label className="blue bold inl-b marg-r serif"> Name </label><input className="input-min-w" type="text" name="name" onChange={this.updateName} placeholder={this.state.isNameEmptyWarning ? "Please, enter a name" : ""}/></div>

            <div className="marg-ver">
              <label className="blue bold inl-b marg-r serif">Frequency</label>
              {Object.keys(Constants.HABITSTYPES).map((type, i) =>
                <span key={i} className="inl-b marg-r"><input type="radio" name="type" value={i} checked={this.state.habitType===i} onChange={() => this.updateType(i)} /> {type} </span>
              )}
            </div>

            {this.state.habitType > 0 ?
              <span className="marg-r marg-ver">
                <select value={this.state.weekDay} onChange={this.updateDay}>
                    {Object.keys(Constants.WEEKDAYS).map((day, i) =>
                    <option key={i} value={i}> {day} </option>
                    )}
                </select>
              </span> : ''}
          </div>

          <button onClick={() => this.props.displayOverlay(false)}> Cancel </button>
          <button className="upperc right" type="submit" value="Submit"> Add </button>

        </form>
      </div>
    );
  }
};

export default AddEditForm;
