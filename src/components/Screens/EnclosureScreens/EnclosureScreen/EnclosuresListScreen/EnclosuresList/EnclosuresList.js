import React from 'react';
import EnclosureWidget from '../EnclosureWidget/EnclosureWidget';


import { Tabs, Tab } from 'react-bootstrap'

class EnclosuresList extends React.Component {

    componentDidMount() {

    }

    render() {

        let enclosures = this.props.enclosuresList;

        const list = [];

        for (let enclosure in enclosures) {

            let enclosureData = {
                enclosureName: enclosures[enclosure].enclosureName,
                enclosureProfilePicture: enclosures[enclosure].enclosureProfilePicture,
                enclosureId: enclosures[enclosure].enclosureId
            };

            list.push(enclosureData);

        }

        return (
            <div style={styles.widgetList}>

                {
                    list.map(function (enclosure) { return <EnclosureWidget enclosureData={enclosure} key={enclosure.enclosureId} />; })
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

export default EnclosuresList;