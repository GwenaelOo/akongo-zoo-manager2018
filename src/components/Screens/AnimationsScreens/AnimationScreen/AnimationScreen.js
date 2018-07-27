import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Panel, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Ajout des composants du formulaire
import TextInput from '../../../customComponents/TextInput/TextInput';
import IUCNSelector from '../../../customComponents/IUCNSelector/IUCNSelector';
import DropzonePhoto from '../../../customComponents/Dropzone/DropzonePhoto';
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import { addNewAnimationToDatabase, editAnimationInDatabase, deleteAnimationInDatabase } from '../../../../database/database'

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const animationData = {}

const userData = JSON.parse(localStorage.getItem('user'))

class AnimationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationId: '',
            animationName: '',
            animationProfilePicture: {
                fullPhoto: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                smallThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
            },
            animationPhotos: [{ largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            animationDescription: '',
            logId: 0,
            dataVersion: 0,
            EditMode: false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(animation) {

        let name = animation.target.name
        this.setState({ [name]: animation.target.value });

        let animationData = {
            animationName: this.state.animationName,
            animatioId: this.state.animationId,
            animationProfilePicture: this.state.animationProfilePicture,
            animationPhotos: this.state.animationPhotos,
            animationDescription: this.state.animationDescription,
        }

        console.log(animationData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        if (photoId === 'PhotoProfil') {

            let photoName = ('animation' + photoId)
            this.setState({
                animationProfilePicture: {
                    edited: false,
                    fullPhoto: returnedUrl,
                    largeThumb: returnedUrl,
                    smallThumb: returnedUrl,
                },
            });

            return
        }

        let photoUID = photoId
        let photosArray = this.state.animationPhotos
        let newObject = {
            edited: false,
            photoId: photoId,
            photoURL: returnedUrl,
            fullPhoto: returnedUrl,
            largeThumb: returnedUrl,
            smallThumb: returnedUrl,
        }

        photosArray.push(newObject)

        this.setState({
            animationPhotos: photosArray
        });

    }

    handleDelete() {

        let animationData = {
            animationId: this.state.animationId,
            animationName: this.state.animationName,
            log: this.state.logId
        }

        swal({
            title: "Êtes-vous sûr ?",
            text: "La suppression est irréversible, vous ne serez plus en mesure de récupérer ces données!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, supprimez tout!",
            closeOnConfirm: false
        },
            function () {
                deleteAnimationInDatabase(animationData)
            });
    }
 
    handleClick() {
        let animationData = {
            dataVersion: this.state.dataVersion + 1,
            animationId: this.state.animationId,
            animationProfilePicture: this.state.animationProfilePicture,
            animationPhotos: this.state.animationPhotos,
            animationDescription: this.state.animationDescription,
            animationName: this.state.animationName,
            log: this.state.logId + 1
        }

        animationData.animationPhotos.shift()

        if (this.state.EditMode === true) {
            editAnimationInDatabase(animationData)
        }
        else {
            addNewAnimationToDatabase(animationData);
        }
    }

    readAnimationFromFirebase(animationId) {
        //let userData = JSON.parse(localStorage.getItem('user'))
        var self = this
        let newGallery = this.state.animationPhotos

        let reference = (userData.zooName + '/animationsData/' + animationId);

        return firebase.database().ref(reference).once('value').then(function (snapshot) {
            let data = snapshot.val()
           
            for (let item in data.animationPhotos){
                let photo = data.animationPhotos[item]
                photo.newUpload = false
                newGallery.push(photo)
            }

            self.setState({
                dataVersion: 1,
                animationId: data.animationId,
                animationProfilePicture: data.animationProfilePicture,
                animationName: data.animationName,
                animationPhotos: newGallery,
                animationDescription: data.animationDescription,
                EditMode: true,
            });
        })


    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            this.readAnimationFromFirebase(this.props.location.state.animationId);
        }
    }

    render() {
        const innerIcon = <em className="fa fa-check"></em>;
        const innerButton = <Button>Before</Button>;
        const innerDropdown = (
            <DropdownButton title="Action" id="input-dropdown-addon">
                <MenuItem key="1">Item</MenuItem>
            </DropdownButton>
        );
        const innerRadio = <input type="radio" aria-label="..." />;
        const innerCheckbox = <input type="checkbox" aria-label="..." />;

        // Creation du bouton suppression

        const deleteButton = (
            <Button color="danger" className="btn-labeled" bsSize="large" onClick={() => { this.handleDelete() }}>
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'animation
            </Button>

        );

        var rows = [];
        for (var i = 0; i < this.state.animationPhotos.length; i++) {
            rows.push(
                <div className="col-md-3">
                    <DropzonePhoto animationName={this.state.animationName} background={this.state.animationPhotos[i].largeThumb} id={i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );
        }

        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une Animation">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <fieldset>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Nom de l'animation</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="animationName" placeholder="Ex. Vol des perroquets" value={this.state.animationName} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                </fieldset>

                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                    <div className="col-md-8" >

                                        <label htmlFor="userName">Description du animation</label>
                                        <Panel>
                                            <textarea name="animationDescription" rows="11" className="form-control note-editor" value={this.state.animationDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>

                                    <div className="col-md-4" >
                                        <label htmlFor="userName">Photo Principale</label>
                                        <DropzonePhoto animationName={this.state.animationName} background={this.state.animationProfilePicture.largeThumb} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend> Ajout de photos</legend>
                                <FormGroup>
                                    <div className="col-md-12" >
                                        <div className="row" style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                            {rows}
                                        </div>
                                    </div>
                                </FormGroup>
                            </fieldset>
                        </form>
                    </CardWithHeader>
                </Panel>

                <CardWithHeader header="Validation" >

                    <Button color="success" className="btn-labeled" bsSize="large" style={{ marginRight: 20 }} onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider l'animation
                     </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>
            </ContentWrapper>
        );
    }
}
export default AnimationScreen;