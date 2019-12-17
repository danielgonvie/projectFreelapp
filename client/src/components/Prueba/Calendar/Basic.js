import React, {Component} from 'react'
//import moment from 'moment'
//import 'moment/locale/zh-cn';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'
import './css/style.css'


let events = [
    {
      id: 1,
      start: "2019-12-18 09:30:00",
      end: "2019-12-19 23:30:00",
      resourceId: "r0",
      title: "I am finished",
      bgColor: "#D9D9D9",
      description: "Holaaaaaa wey"
    },
    {
      id: 2,
      start: "2019-12-18 12:30:00",
      end: "2019-12-26 23:30:00",
      resourceId: "r1",
      title: "daniel was here",
      resizable: false
    },
    {
      id: 3,
      start: "2019-12-19 12:30:00",
      end: "2019-12-20 23:30:00",
      resourceId: "r2",
      title: "I am not movable",
      movable: false
    },
    {
      id: 4,
      start: "2019-12-19 14:30:00",
      end: "2019-12-20 23:30:00",
      resourceId: "r1",
      title: "I am not start-resizable",
      startResizable: false
    },
    {
      id: 5,
      start: "2019-12-19 15:30:00",
      end: "2019-12-20 23:30:00",
      resourceId: "r2",
      title: "R2 has recurring tasks every week on Tuesday, Friday",
      bgColor: "red"
    }
  ];
  let resources = [{id: "r0", name: "Tarea1"},{id: "r1", name: "Tarea2",parentId:"r0"},{id: "r2", name: "Tarea3"}]


class Basic extends Component{
    constructor(props){
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData(Date.now(), ViewTypes.Month, false, false, {
            // minuteStep: 15
        });


    
        // schedulerData.localeMoment.locale('en');
       
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        
        this.state = {
            viewModel: schedulerData,
            events: events,
            resources: resources
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
                                
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               removeEvent={this.removeEvent}
                          //     eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData,
            
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {

    };  


    ops1 = (schedulerData, event) => {
        schedulerData.removeEvent(event)
       
        this.setState({
            viewModel: schedulerData
        })
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

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

    demoButtonClicked = (schedulerData, eventItem) => {
        
        // alert(`You just clicked demo button. event title: ${eventItem.title}`);
        events = events.splice(1,4)
        schedulerData.setEvents(events)
        this.setState({
            viewModel: schedulerData
        })
        
    }

    removeEvent = (schedulerData,eventItem)=>{
        schedulerData.removeEvent(eventItem)
    }

    deleteClicked = (schedulerData, eventItem) => {

        alert(`You just deleted ${schedulerData.title}`);
        schedulerData.removeEvent(schedulerData);
        this.setState({
            viewModel: schedulerData
        })
    }



    eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => {
        return (
            // <React.Fragment>
            //     <h3>{title}</h3>
            //     <h5>{start.format("HH:mm")} - {end.format("HH:mm")}</h5>
            //     <img src="./icons8-ticket-96.png" />
            // </React.Fragment>
            <div style={{width: '300px'}}>
                <tr type="flex" align="middle">
                    <td span={2}>
                        <div className="status-dot" style={{backgroundColor: statusColor}} />
                    </td>
                    <td span={22} className="overflow-text">
                        <span className="header2-text" title={title}>{title}</span>
                    </td>
                </tr>
                <tr type="flex" align="middle">
                    <td span={2}>
                        <div />
                    </td>
                    <td span={22}>
                        <span className="header1-text">{start.format("HH:mm")} - {end.format("HH:mm")}</span>
                    </td>
                </tr>
                <tr type="flex" align="middle">
                    <td span={2}>
                        <div />
                    </td>
                    <td span={22}>
                        <button onClick={()=>{this.demoButtonClicked(eventItem);}}>Demo</button>
                        <button onClick={()=>{this.deleteClicked( eventItem) } }>Delete</button>
                    </td>
                </tr>
            </div>
        );
    }

}

export default withDragDropContext(Basic)
