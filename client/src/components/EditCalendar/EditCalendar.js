import React, { Component } from "react";
import ArtistService from "../../services/ArtistService";
import "./EditCalendar.css";
import GoodCalendar from "../GoodCalendar/GoodCalendar";

require("moment/locale/es.js");



export default class EditCalendar extends Component {
  constructor(props) {
    super(props);
    this.artistService = new ArtistService();
    this.state = {
      calendar: null,
    };
  }

  displayCalendar = () => {
    const { calendar } = this.state;
 
    return (
      <React.Fragment> 
        <GoodCalendar calendar={this.state.calendar} ></GoodCalendar>
      </React.Fragment>
    );
  };

  componentDidMount() {
    if (this.props.user.calendar === this.props.match.params.id){this.updateCalendar();}
    
  }

  updateCalendar = () => {
    this.artistService.fetchCalendar(this.props.match.params.id).then(
      calendar => {
        this.setState({ ...this.state, calendar });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  render() {
    return (
      <div className="edit-calendar-div">
        {this.state.calendar && this.displayCalendar()}
        {!this.state.calendar && <p>Loading calendar...</p>}
      </div>
    );
  }
}
