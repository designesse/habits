import React, { Component } from 'react'

class InputListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'habit': props.habit,
      'disabled': props.habit.disabled,
      'defaultChecked': props.habit.checked
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event, habit) {
    this.setState({defaultChecked: !this.state.defaultChecked});
    this.props.checkDone(this.state.habit.hid, !this.state.defaultChecked);
  }

  render() {
    var opaque = this.state.defaultChecked ? "blurred" : "opaque";
    return (
      <li className={ opaque }>
        <input type="checkbox" onChange={ this.handleChange } disabled={ this.state.disabled } defaultChecked={ this.state.defaultChecked } />
        { this.state.habit.name }
      </li>
    );
  }
};

export default InputListItem;
