import React from 'react';
import ContentWrapper from '../../../../Layout/ContentWrapper';
import EnclosureList from './EnclosuresList/EnclosuresList'
import { Tabs, Tab } from 'react-bootstrap';

import firebase from 'firebase';


const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}

class EnclosuresListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enclosuresList: []
        };
    }

    readEnclosureFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/enclosuresData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let data = result.val()
                self.setState({
                    enclosuresList: data
                })
            })
    }

    componentWillMount() {
        this.readEnclosureFromDatabase();
    }
    render() {
        console.log(this.state.enclosuresList)
        return (
            <ContentWrapper>
                <h3>Liste des enclos</h3>
                    <div className="row">
                        <EnclosureList enclosuresList={this.state.enclosuresList} />
                    </div>
                {/* END panel tab */}
            </ContentWrapper>
        );
    }
}

export default EnclosuresListScreen;

