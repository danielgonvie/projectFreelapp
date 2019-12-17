import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./GoodCalendar.css";
import { Link } from "react-router-dom";
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

export default class GoodCalendar extends Component {
  constructor(props) {
    super(props);
    
    console.log(props)
    this.state = {
      events: this.props.calendar.events
    };
  }

  render() {



    return (
      <div className="artist-page-calendar">
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
