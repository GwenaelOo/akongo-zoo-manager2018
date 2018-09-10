import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'
import DropzonePhoto from '../Dropzone/DropzonePhoto';
import Dropdown from '../../Elements/DropDown';


class customGalleryItem extends React.Component {

    handleEditClic(enclosureId) {
    }

    handleCrop() {
        let photoData = {
            basePhoto: this.props.photoData.basePhoto,
            largeThumb: this.props.photoData.largeThumb,
            photoId: this.props.photoData.photoId
        }
     this.props.handleCrop(photoData)
    }

    render() {

        return (
            <div>
                <DropzonePhoto  background={this.props.photoData.largeThumb} />
                <Dropdown handleCrop={() => this.handleCrop()}/>
            </div>

        );
    }

}

export default customGalleryItem;

