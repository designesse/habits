import React, { Component } from 'react'

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.state = { 'item': this.props.item };

    this.displayForm = this.displayForm.bind(this);
  }

  displayForm() {
    this.props.displayForm(true);
  }

  render() {
    return (
      <div className="App-AddButton">
        <button className="upperc" onClick={ this.displayForm }>+ Add { this.state.item }</button>
      </div>
    );
  }
};

export default AddButton;
