import React, { Component } from 'react'

class DeleteForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.deleteHabit(this.props.hid);
    this.props.displayOverlay(false);
  }

  render() {
    return (
      <div className="App-DeleteForm overlay">
        <form onSubmit={this.handleSubmit}>
          
          <div className="blue bold inl-b marg-r marg-ver serif"> Are you sure you want to delete the "{ this.props['name']}" habit?</div>

          <button onClick={() => this.props.displayOverlay(false)}> Cancel </button>
          <button className="upperc right" type="submit" value="Submit"> Delete </button>

        </form>
      </div>
    );
  }
};

export default DeleteForm;
