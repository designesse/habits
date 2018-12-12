import React, { Component } from 'react'

class InputListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'disabled': props.habit.disabled,
      'checked': props.habit.checked
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event, habit) {
    this.setState({'checked': !this.state.checked});
    this.props.checkDone(this.props.habit.hid, !this.state.checked);
  }

  render() {
    var opaque = this.state.disabled ? "blurred" : "opaque";
    return (
      <li className={ opaque }>
        <input type="checkbox" onChange={ this.handleChange } disabled={ this.state.disabled } defaultChecked={ this.state.checked } />
        { this.props.habit.name }
      </li>
    );
  }
};

export default InputListItem;
