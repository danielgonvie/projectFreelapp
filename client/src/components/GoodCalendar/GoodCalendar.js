import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./GoodCalendar.css"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import ArtistService from '../../services/ArtistService';

require("moment/locale/es.js");

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default class GoodCalendar extends Component {
  constructor(props) {
    super(props);
    this.artistService = new ArtistService();
    this.state = {
      events: this.props.calendar.events
    };

  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('Nombre del nuevo evento')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  onSelectEvent(pEvent) {
    const r = window.confirm("Would you like to remove this event?")
    if(r === true){
      
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  } 

  updateEvents = (e) =>{
    e.preventDefault()
    console.log(this.state.events)
    console.log(this.props.calendar._id)
    this.artistService.updateEvents( this.state.events, this.props.calendar._id)
  }
  


  render() {



    return (
      <div className="last-div">
        <button className="last-button" onClick={(e) => this.updateEvents(e)}>Guardar cambios</button>
        <DnDCalendar
          selectable
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onSelectEvent = {event => this.onSelectEvent(event)} 
          onSelectSlot={this.handleSelect}
          style={{ height: "80vh" }}
          views={["month" ]}
          startAccessor="start"
          endAccessor="end"
          popup={true}
          popupOffset={{ x: 30, y: 20 }}
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








