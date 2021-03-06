import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar.css";
import { Link } from "react-router-dom";
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

export default class PruebaCalendar extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      events: this.props.calendar.events
    };
  }

  render() {

    let edit = <React.Fragment></React.Fragment>
    if (this.props.user.id === this.props.id){
        edit = <Link className="link-to-edit-calendar" to={"/calendar/" + this.props.user.calendar}>Edit</Link> 
    }

    return (
      <div className="artist-page-calendar">
      {edit}
        <Calendar
          events={this.state.events}
          drilldownView="day"
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          views={"month" | "day" | "week"}
          popup={true}
          popupOffset={{ x: 30, y: 20 }}
          selectable={true}
          toolbar={true}
          messages={{
            next: ">",
            today: "Hoy",
            previous: "<",
            month: "Mes",
            week: "Semana",
            day: "Día"
          }}
        />
      </div>
    );
  }
}
