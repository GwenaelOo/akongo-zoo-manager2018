import React from 'react';
import SpecieWidget from '../SpecieWidget/SpecieWidget';


import { Tabs, Tab } from 'react-bootstrap'

class SpecieList extends React.Component {

    componentDidMount() {

    }

    render() {

        let species = this.props.speciesList;

        const list = [];

        for (let specie in species) {

            let specieData = {
                specieName: species[specie].specieName,
                specieProfilePicture: species[specie].specieProfilePicture,
                specieId: species[specie].specieId
            };

            list.push(specieData);

        }

        return (
            <div style={styles.widgetList}>

                {
                    list.map(function (specie) { return <SpecieWidget specieData={specie} key={specie.specieId} />; })
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

export default SpecieList;