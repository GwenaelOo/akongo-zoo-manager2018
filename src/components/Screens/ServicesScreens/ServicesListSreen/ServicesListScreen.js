import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import ServicesList from './ServicesList/ServicesList'
import { Tabs, Tab } from 'react-bootstrap';

import firebase from 'firebase';


const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}

class ServicesListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servicesList: []
        };
    }

    readServicesFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/servicesData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let data = result.val()
                self.setState({
                    servicesList: data
                })
            })
    }

    componentWillMount() {
        this.readServicesFromDatabase();
    }
    render() {
        console.log(this.state.servicesList)
        return (
            <ContentWrapper>
                <h3>Mes Services</h3>
                    <div className="row">
                        <ServicesList servicesList={this.state.servicesList} />
                    </div>
                {/* END panel tab */}
            </ContentWrapper>
        );
    }
}

export default ServicesListScreen;

