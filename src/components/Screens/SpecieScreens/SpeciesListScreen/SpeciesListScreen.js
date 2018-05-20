import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import SpecieList from './SpeciesListView/SpecieList/SpecieList';
import { Tabs, Tab } from 'react-bootstrap';
let config = require("../../config/config");
let api = require("../Scripts/database_api.js");


class SpeciesListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speciesList: []
        };
    }

readSpecieFromDatabase() {
        let userData = JSON.parse(localStorage.getItem('user'))

        let collection = (userData.zooName + '-species')
        // Fonction magique que je ne comprend pas 
        var self = this;
        // Selection de la référence de la base de donnée
      
        firebase.firestore().collection(collection).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let newSpeciesList = self.state.speciesList
                newSpeciesList.push(doc.data())
                self.setState({
                    speciesList: newSpeciesList
                })
            });
        });
        

    }
    componentWillMount() {
        this.readSpecieFromDatabase();
    }
    render() {
          
        return (
            <ContentWrapper>
                <h3>Mes animaux</h3>
                {/* START row */}
                <div className="row">
                <SpecieList speciesList={this.state.speciesList} />
                </div>
                {/* END panel tab */}
            </ContentWrapper>
        );
    }

}

export default SpeciesListScreen;