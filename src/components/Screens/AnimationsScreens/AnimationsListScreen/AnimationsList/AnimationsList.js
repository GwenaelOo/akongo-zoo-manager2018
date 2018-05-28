import React from 'react';
import AnimationWidget from '../AnimationWidget/AnimationWidget';


import { Tabs, Tab } from 'react-bootstrap'

class AnimationsList extends React.Component {

    componentDidMount() {

    }

    render() {

        let animations = this.props.animationsList;

        const list = [];

        for (let animation in animations) {

            let animationData = {
                animationName: animations[animation].animationName,
                animationProfilePicture: animations[animation].animationProfilePicture,
                animationId: animations[animation].animationId
            };

            list.push(animationData);
            
        }

        return (
            <div style={styles.widgetList}>

                {
                    list.map(function (animation) { return <AnimationWidget animationData={animation} key={animation.animationId} />; })
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

export default AnimationsList;