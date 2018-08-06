import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import { Panel, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Ajout des composants du formulaire
import TextInput from '../../../customComponents/TextInput/TextInput';
import IUCNSelector from '../../../customComponents/IUCNSelector/IUCNSelector';
import DropzonePhoto from '../../../customComponents/Dropzone/DropzonePhoto';
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import { addNewEventToDatabase, deleteEventInDatabase, editEventInDatabase } from '../../../../database/database'
import DropzonePhotoDropDown from '../../../customComponents/Dropzone/DropzonePhotoDropDown';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import moment from 'moment';

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const eventData = {}
const userData = JSON.parse(localStorage.getItem('user'))


class EventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: '',
            eventName: '',
            eventProfilePicture: {
                fullPhoto: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                smallThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
            },
            eventPhotos: [{ largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            eventDescription: '',
            eventDateTime: '',
            logId: 0,
            dataVersion: 0,
            EditMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        
    }

    handleChange(event) {

        let name = event.target.name
        this.setState({ [name]: event.target.value });

        let eventData = {
            eventName: this.state.eventName,
            eventId: this.state.eventId,
            eventProfilePicture: this.state.eventProfilePicture,
            eventPhotos: this.state.eventPhotos,
            eventDescription: this.state.eventDescription,
        }

        console.log(eventData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'PhotoProfil') {

            let photoName = ('event' + photoId)
            this.setState({
                eventProfilePicture: {
                    edited: false,
                    fullPhoto: returnedUrl,
                    largeThumb: returnedUrl,
                    smallThumb: returnedUrl,
                },
            });

            return
        }

        console.log(this.state.eventPhotos)

        let photoUID = photoId
        let photosArray = this.state.eventPhotos

        console.log(photosArray.length)

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
            eventPhotos: photosArray

        });

        console.log(this.state.eventPhotos)
    }

    handleDelete() {

        let eventData = {
            eventId: this.state.eventId,
            eventName: this.state.eventName,
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
                deleteEventInDatabase(eventData)
            });
    }

    handleClick() {
        let eventData = {
            dataVersion: this.state.dataVersion + 1,
            eventId: this.state.eventId,
            eventProfilePicture: this.state.eventProfilePicture,
            eventPhotos: this.state.eventPhotos,
            eventDescription: this.state.eventDescription,
            eventName: this.state.eventName,
            eventDateTime: this.state.eventDateTime.format(),
            log: this.state.logId + 1
        }

        eventData.eventPhotos.shift()

        if (this.state.EditMode === true) {
            editEventInDatabase(eventData);
        }
        else {
            addNewEventToDatabase(eventData);
        }
    }

    readEventFromFirebase(eventId) {
        //let userData = JSON.parse(localStorage.getItem('user'))
        var self = this
        let newGallery = this.state.eventPhotos
        let reference = (userData.zooName + '/eventsData/' + eventId);


        return firebase.database().ref(reference).once('value').then(function (snapshot) {
            let data = snapshot.val()

            for (let item in data.eventPhotos){
                let photo = data.eventPhotos[item]
                photo.newUpload = false
                newGallery.push(photo)
            }

            self.setState({
                dataVersion: 1,
                eventId: data.eventId,
                eventProfilePicture: data.eventProfilePicture,
                eventPhotos: newGallery,
                eventName: data.eventName,
                eventDescription: data.eventDescription,
                eventDateTime: moment(data.eventDateTime),
                EditMode: true,
            });
        })

    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            this.readEventFromFirebase(this.props.location.state.eventId);
        }
    }

    handleDateTimeChange(moment) {
        this.setState({
            eventDateTime: moment
        })
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
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'évènement
            </Button>);

        // Creation de la partie ajout photo

        var rows = [];
        for (var i = 0; i < this.state.eventPhotos.length; i++) {
            rows.push(
                <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    <DropzonePhoto eventName={this.state.eventName} background={this.state.eventPhotos[i].largeThumb} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );
        }


        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une event">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <fieldset>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Nom de l'event</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="eventName" placeholder="Ex. Vol des perroquets" value={this.state.eventName} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                </fieldset>

                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                    <div className="col-md-8" >

                                        <label htmlFor="userName">Description du event</label>
                                        <Panel>
                                            <textarea name="eventDescription" rows="11" className="form-control note-editor" value={this.state.eventDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>

                                        <label htmlFor="userName"><i class="fa fa-clock-o" aria-hidden="true"></i>  Date et heure de l'évènement</label>
                                        <Panel>
                                                
                                             <Datetime name="eventDateTime" inputProps={{className: 'form-control'}} value={this.state.eventDateTime} onChange={this.handleDateTimeChange} dateFormat={true} timeFormat="HH:mm"  />
                                        </Panel>
                                    </div>

                                    <div className="col-md-4" >
                                        <label htmlFor="userName">Photo de profile</label>
                                        <DropzonePhoto eventName={this.state.eventName} background={this.state.eventProfilePicture.largeThumb} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend> Ajout des photos</legend>
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
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider l'évènement
                    </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>
            </ContentWrapper>
        );
    }
}
export default EventScreen;