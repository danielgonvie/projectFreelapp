import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./GoodCalendar.css"
import { Link } from "react-router-dom";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default class GoodCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: this.props.calendar.events
    };
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {



    return (
      <div >
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable={true}
          style={{ height: "80vh" }}
        />
      </div>
    );
  }
}
