import React from 'react';
import CustomGalleryItem from './customGalleryItem';


import { Tabs, Tab } from 'react-bootstrap'
import DropzonePhoto2 from '../Dropzone/DropzonePhoto2';

class customGalleryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photosList: this.props.photosList,

        };
        this.handleDrop = this.handleDrop.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleDrop() {

        let photoData = {
            largeThumb: 'http://www.akongo.fr/assets/ico/Spin.gif',
            photoId: 'spin'
        }
        let photosList = this.state.photosList

        photosList.push(photoData)

        this.setState({
            photosList: photosList
        })

    }
    
    handleResponse(returnedURL, photoId) {


        let photosList = this.state.photosList
        photosList.pop()

        let photoData = {
            largeThumb: returnedURL,
            basePhoto: returnedURL,
            photoId: photoId
        }

        photosList.push(photoData)

        this.setState({
            photosList: photosList
        })

        this.props.syncGallery(this.state.photosList)

    }

    render() {


        return (
            <div style={styles.widgetList}>

                <DropzonePhoto2 background='https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' handleDrop={this.handleDrop} handleResponse={this.handleResponse} />

                {
                    this.state.photosList.map(function (photo) { return <CustomGalleryItem photoData={photo} key={photo.photoId} handleCrop={this.props.handleCrop}/>; }, this)
                }

            </div>

        );
    }

}

const styles = {
    widgetList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    }
}

export default customGalleryList;