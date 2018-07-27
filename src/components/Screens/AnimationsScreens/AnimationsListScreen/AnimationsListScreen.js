import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import AnimationsList from './AnimationsList/AnimationsList'
import { Tabs, Tab } from 'react-bootstrap';

import firebase from 'firebase';


const userData = JSON.parse(localStorage.getItem('user'))

class AnimationsListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationsList: []
        };
    }

    readAnimationFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/animationsData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let data = result.val()
                self.setState({
                    animationsList: data
                })
            })
    }

    componentWillMount() {
        this.readAnimationFromDatabase();
    }
    render() {

        return (
            <ContentWrapper>
                <h3>Mes animations</h3>
                    <div className="row">
                        <AnimationsList animationsList={this.state.animationsList} />
                    </div>
                {/* END panel tab */}
            </ContentWrapper>
        );
    }
}

export default AnimationsListScreen;

