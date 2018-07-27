import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import EventsList from './EventsList/EventsList'
import { Tabs, Tab } from 'react-bootstrap';

import firebase from 'firebase';


const userData = JSON.parse(localStorage.getItem('user'))

class EventsListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: []
        };
    }

    readEventsFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/eventsData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let data = result.val()
                self.setState({
                    eventsList: data
                })
            })
    }

    componentWillMount() {
        this.readEventsFromDatabase();
    }
    render() {

        return (
            <ContentWrapper>
                <h3>Mes évènements</h3>
                    <div className="row">
                        <EventsList eventsList={this.state.eventsList} />
                    </div>
                {/* END panel tab */}
            </ContentWrapper>
        );
    }
}

export default EventsListScreen;

