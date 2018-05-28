import React from 'react';
import EventWidget from '../EventWidget/EventWidget';


import { Tabs, Tab } from 'react-bootstrap'

class EventsList extends React.Component {

    componentDidMount() {

    }

    render() {

        let events = this.props.eventsList;

        const list = [];

        for (let event in events) {

            let eventData = {
                eventName: events[event].eventName,
                eventProfilePicture: events[event].eventProfilePicture,
                eventId: events[event].eventId
            };

            list.push(eventData);

        }

        return (
            <div style={styles.widgetList}>

                {
                    list.map(function (event) { return <EventWidget eventData={event} key={event.eventId} />; })
                }

            </div>

        );
    }

}

const styles={
    widgetList:{
        flex: 1,
        display : 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
}

export default EventsList;