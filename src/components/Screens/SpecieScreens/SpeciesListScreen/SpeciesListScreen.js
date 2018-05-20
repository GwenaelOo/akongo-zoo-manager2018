import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import SpecieList from './SpeciesList/SpeciesList'
import { Tabs, Tab } from 'react-bootstrap';

import firebase from 'firebase';


const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}

class SpeciesListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speciesList: []
        };
    }


    readSpecieFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/speciesData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let data = result.val()
                self.setState({
                    speciesList: data
                })
            })
    }

    componentWillMount() {
        this.readSpecieFromDatabase();
    }
    render() {

        return (
            <ContentWrapper>
                <h3>Mes animaux</h3>
                    <div className="row" style={styles.widgetList}>
                        <SpecieList speciesList={this.state.speciesList} />
                    </div>
                {/* END panel tab */}
            </ContentWrapper>
        );
    }
}

export default SpeciesListScreen;

const styles={
    widgetList:{
        flex: 1,
        display : 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
}