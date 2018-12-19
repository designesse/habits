import React, { Component } from 'react'

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.state = { 'item': this.props.item };

    this.displayOverlay = this.displayOverlay.bind(this);
  }

  displayOverlay() {
    this.props.displayOverlay(true, 'add', 'habit');
  }

  render() {
    return (
      <div className="App-AddButton marg-ver">
        <button className="font-l upperc" onClick={ this.displayOverlay }>+ Add { this.state.item }</button>
      </div>
    );
  }
};

export default AddButton;
