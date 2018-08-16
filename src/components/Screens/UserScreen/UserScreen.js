import React from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Panel, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Ajout des composants du formulaire
import TextInput from '../../customComponents/TextInput/TextInput';
import IUCNSelector from '../../customComponents/IUCNSelector/IUCNSelector';
import DropzonePhoto from '../../customComponents/Dropzone/DropzonePhoto';
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import { addNewUserToDatabase, deleteEventInDatabase, editUserInDatabase } from '../../../database/database'
import DropzonePhotoDropDown from '../../customComponents/Dropzone/DropzonePhotoDropDown';

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


class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: userData.userId,
            userName: '',
            userLastname: '',
            userBirthday: '',
            userBiography: '',
            userPassword: '',


            userFacebook: '',
            userLinkedin: '',
            userTwitter: '',
            userSnapchat: '',

            userProfilePicture: {
                fullPhoto: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                smallThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
            },

            dataVersion: 0,
            EditMode: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        
    }

    handleChange(event) {

        let name = event.target.name
        this.setState({ [name]: event.target.value });

    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'PhotoProfil') {

            let photoName = ('event' + photoId)
            this.setState({
                userProfilePicture: {
                    edited: false,
                    fullPhoto: returnedUrl,
                    largeThumb: returnedUrl,
                    smallThumb: returnedUrl,
                },
            });

            return
        }
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
        let userData = {
            userId: this.state.userId,
            userFirstname: this.state.userFirstname,
            userLastname: this.state.userLastname,
            userBirthday: this.state.userBirthday.format(),
            userBiography: this.state.userBiography,
            userPassword: this.state.userPassword,

            userFacebook: this.state.userFacebook,
            userLinkedin: this.state.userLinkedin,
            userTwitter: this.state.userTwitter,
            userInstagram: this.state.userInstagram,
            userSnapchat: this.state.userSnapchat,

            userProfilePicture: this.state.userProfilePicture
        }

        if (this.state.EditMode === true) {
            editUserInDatabase(userData);
        }
        else {
            addNewUserToDatabase(userData);
        }

        let dataToStore = {
            // userId: this.state.userId,
           //zooName: userInfos.zooName,
           //firstname: userInfos.firstname,
           zooNameDisplay: this.state.userFirstname + ' ' + this.state.userLastname,
            logged: true
        }

        localStorage.setItem('user', JSON.stringify(dataToStore))

    }

    readEventFromFirebase(userId) {

        let userData = JSON.parse(localStorage.getItem('user'))

        var self = this
        let newGallery = this.state.eventPhotos
        let reference = (userData.zooName + '/usersInfos/' + userId);


        return firebase.database().ref(reference).once('value').then(function (snapshot) {
            let data = snapshot.val()

            self.setState({
                
               // userId: data.userId,
                userFirstname: data.userFirstname,
                userLastname: data.userLastname,
                userBirthday: moment(data.userBirthday),
                userBiography: data.userBiography,
               // userPassword: data.userPassword,

                userFacebook: data.userFacebook,
                userLinkedin: data.userLinkedin,
                userTwitter: data.userTwitter,
                userInstagram: data.userInstagram,
                userSnapchat: data.userSnapchat,
    
                userProfilePicture: data.userProfilePicture,
                EditMode: true,
            });
        })

    }

    componentWillMount() {
         this.readEventFromFirebase(this.state.userId);
        
    }

    handleDateTimeChange(moment) {
        this.setState({
            userBirthday: moment
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

        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une event">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <fieldset>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Prenom</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="userFirstname" placeholder="Ex. Vol des perroquets" value={this.state.userFirstname} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Nom</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="userLastname" placeholder="Ex. Vol des perroquets" value={this.state.userLastname} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                  
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Facebook</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="userFacebook" placeholder="Ex. Vol des perroquets" value={this.state.userFacebook} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Twitter</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="userTwitter" placeholder="Ex. Vol des perroquets" value={this.state.userTwitter} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Instagram</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="userInstagram" placeholder="Ex. Vol des perroquets" value={this.state.userInstagram} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Snapchat</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="userSnapchat" placeholder="Ex. Vol des perroquets" value={this.state.userSnapchat} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                </fieldset>

                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                    <div className="col-md-8" >

                                        <label htmlFor="userName">Biographie</label>
                                        <Panel>
                                            <textarea name="userBiography" rows="11" className="form-control note-editor" value={this.state.userBiography} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>

                                        <label htmlFor="userName"><i class="fa fa-clock-o" aria-hidden="true"></i>  Date de naissance</label>
                                        <Panel>
                                                
                                             <Datetime name="userBirthday" inputProps={{className: 'form-control'}} value={this.state.userBirthday} onChange={this.handleDateTimeChange} dateFormat={true} timeFormat="HH:mm"  />
                                        </Panel>
                                    </div>

                                    <div className="col-md-4" >
                                        <label htmlFor="userName">Photo de profile</label>
                                        <DropzonePhoto userName={this.state.userName} background={this.state.userProfilePicture.largeThumb} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>
                                </div>
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
export default UserScreen;