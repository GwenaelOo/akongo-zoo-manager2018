import React, { Component } from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import $ from 'jquery';
// Image Cropper
import 'cropper/dist/cropper.css';
import 'cropper/dist/cropper.js';

class Cropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
           localStorage: this.props.location.state.localStorage,
           photoToCrop: this.props.location.state.photo,
           photoId: this.props.location.state.photoId,
           previousScreen: this.props.location.state.previousScreen
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.updloadCroppedImage = this.updloadCroppedImage.bind(this);
        this.goingBack = this.goingBack.bind(this);
    }
    componentDidMount() {
        var self = this;

        this.inputImage = $(this.refs.inputImage); // upload button
        this.cropperElement = $(this.refs.cropperImage); // image for cropper

        this.options = {
            aspectRatio: 16 / 9,
            preview: '.img-preview',
            crop: function(data) {
                //console.log(self.cropperElement.cropper('getCroppedCanvas').toDataURL()); // base64
                localStorage.setItem('croppedImage', JSON.stringify(self.cropperElement.cropper('getCroppedCanvas').toDataURL()))
            }
        };

        // init plugin
        this.cropperElement.cropper(this.options);

        // prepare to handle image upload
        this.handleNewImage();

    }

    handleClick() {
           this.updloadCroppedImage(JSON.parse(localStorage.getItem('croppedImage')))
    }

    updloadCroppedImage(url) {
            const formData = new FormData();
            formData.append("file", url);
            formData.append("tags", `specie.name, specie.zoo`);
            formData.append("folder", "test");
            formData.append("upload_preset", "esbpefvx"); // Replace the preset name with your own
            formData.append("api_key", "247372227977832"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/akongo/image/upload/", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app

                this.setState({   
                    returnedUrl: data.url,  
                    hasBeenUploaded: true
                });
            }).then(() => {
            this.goingBack(this.state.returnedUrl)   
           // return(this.state.returnedUrl, this.props.id);
        });
    }

    goingBack(croppedImageURL){
        
        this.props.history.push({
            //pathname: '/' + this.state.previousScreen,
            pathname: '/AnimationScreen',
            state: {
                initialPhoto: this.state.photoToCrop,
                croppedPhoto: croppedImageURL,
                cropped: true,
                photoId: this.state.photoId
            }})
    }
  
    handleNewImage() {
        var self = this;
        var URL = window.URL || window.webkitURL,
            blobURL;

        if (URL) {
            this.inputImage.change(function() {
                var files = this.files,
                    file;

                if (!self.cropperElement.data('cropper')) {
                    return;
                }

                if (files && files.length) {
                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        self.cropperElement.one('built.cropper', function() {
                            URL.revokeObjectURL(blobURL); // Revoke when load complete
                        }).cropper('reset').cropper('replace', blobURL);
                        self.inputImage.val('');
                    } else {
                        alert('Please choose an image file.');
                    }
                }
            });
        } else {
            this.inputImage.parent().remove();
        }
    }

    componentWillUnmount() {
        this.cropperElement.cropper('destroy');
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Image Cropper
                        <small>Simple image cropping plugin.</small>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col lg={ 8 }>
                            <div className="img-container mb-lg">
                                <img ref="cropperImage" src={this.state.photoToCrop} alt="Sample" />
                            </div>
                        </Col>
                        <Col lg={ 4 }>
                            <div className="docs-preview clearfix">
                                <div className="img-preview preview-lg"></div>
                                <div className="img-preview preview-md"></div>
                                <div className="img-preview preview-sm"></div>
                                <div className="img-preview preview-xs"></div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt">
                        <Col lg={ 4 }>
                            <label htmlFor="inputImage" title="Upload image file" className="btn btn-info btn-upload">
                                <input ref="inputImage" id="inputImage" name="file" type="file" accept="image/*" className="sr-only" />
                                <span data-toggle="tooltip" title="Import image with Blob URLs" className="docs-tooltip">
                                Load Image
                                </span>
                            </label>
                        </Col>
                        <Col lg={ 4 }>
                           <button onClick={this.handleClick}>
                                <span data-toggle="tooltip" title="Import image with Blob URLs" className="docs-tooltip">
                                send to cloudinary
                                </span>
                            </button>
                        </Col>
                    </Row>
                </Container>
            </ContentWrapper>
            );
    }
}

export default Cropper;
