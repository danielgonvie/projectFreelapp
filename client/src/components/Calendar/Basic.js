import React, {Component} from 'react'

import Scheduler, {SchedulerData, ViewTypes} from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'


import ArtistService from '../../services/ArtistService';





class Basic extends Component{
    constructor(props){
        super(props);
        this.artistService = new ArtistService();
        

        let schedulerData = new SchedulerData(Date.now(), ViewTypes.Month, false, false, {
            views: [
                {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
                {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
                {viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
            ]
            
        });


    
        // schedulerData.localeMoment.locale('en');
       
        schedulerData.setResources(this.props.calendar.resources);
        schedulerData.setEvents(this.props.calendar.events);
        
        this.state = {
            viewModel: schedulerData,
            events: this.props.calendar.events,
            resources: this.props.calendar.resources,
            calendar: this.props.calendar
        }
    }

    render(){
        const {viewModel} = this.state;
       
        return (
            <div>
                <div className="lol">
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="Delete"
                               viewEvent2Text="Edit"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               removeEvent={this.removeEvent}
                          
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData,
            
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {

    };  


    ops1 = (schedulerData, event) => {
        schedulerData.removeEvent(event)
        const calendarId = this.state.calendar._id;
        const eventId = event.id;
        this.artistService.deleteEvent(calendarId, eventId)
        this.setState({
            viewModel: schedulerData
        })
    };

    // ops2 = (event) => {
    //     return history.push("/")
    // };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if(item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'blue'
        }
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData,

        })
    }

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }
    




}

export default withDragDropContext(Basic)
