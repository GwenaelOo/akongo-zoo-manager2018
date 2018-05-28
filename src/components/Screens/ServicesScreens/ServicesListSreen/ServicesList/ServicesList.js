import React from 'react';
import ServiceWidget from '../ServiceWidget/ServiceWidget';


import { Tabs, Tab } from 'react-bootstrap'

class ServiceList extends React.Component {

    componentDidMount() {

    }

    render() {

        let services = this.props.servicesList;

        const list = [];

        for (let service in services) {

            let serviceData = {
                serviceName: services[service].serviceName,
                serviceProfilePicture: services[service].serviceProfilePicture,
                serviceId: services[service].serviceId
            };

            list.push(serviceData);

        }

        return (
            <div style={styles.widgetList}>

                {
                    list.map(function (service) { return <ServiceWidget serviceData={service} key={service.serviceId} />; })
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

export default ServiceList;