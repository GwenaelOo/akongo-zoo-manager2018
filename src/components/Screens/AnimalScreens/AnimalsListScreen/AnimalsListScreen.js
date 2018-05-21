import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import AnimalWidget from './AnimalWidget';

class AnimalListScreen extends React.Component {

    componentDidMount() {

    }

    render() {

        let animals = this.props.animalsList;

        const list = [];

        for (let animal in animals) {

            let animalData = {
                animalName: animals[animal].animalName,
                animalProfilePicture: animals[animal].animalProfilePicture,
                animalId: animals[animal].animalId
            };

            list.push(animalData);

        }

        return (
            <div style={styles.widgetList}>

                {
                    list.map(function (animal) { return <AnimalWidget animalData={animal} key={animal.animalId} />; })
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

export default AnimalListScreen;