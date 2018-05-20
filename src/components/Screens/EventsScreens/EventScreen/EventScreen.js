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
import { addNewEventToDatabase } from '../../../../database/database'

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const eventData = {}


class EventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: '',
            eventName: '',
            eventPhotoProfil: '',
            eventPhotos: [],
            eventDescription: '',
            logId: 0,
            dataVersion: 0,
            EditMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(event) {

        let name = event.target.name
        this.setState({ [name]: event.target.value });

        let eventData = {
            eventName: this.state.eventName,
            eventId: this.state.eventId,
            eventPhotoProfil: this.state.eventPhotoProfil,
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
                eventPhotoProfil: returnedUrl
            });
        }

        console.log(this.state.eventPhotos)

        let photoUID = this.state.eventPhotos.length + 1
        let photosArray = this.state.eventPhotos

        console.log(photosArray.length)

        let newObject = {
            photoId: 99,
            photoURL: returnedUrl
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
                // database.deleteeventFromDatabase(eventData)
            });
    }

    handleClick() {
        let eventData = {
            dataVersion : this.state.dataVersion + 1,
            eventId: this.state.eventId,
            eventPhotoProfil: this.state.eventPhotoProfil,
            eventPhotos: this.state.eventPhotos,
            eventDescription: this.state.eventDescription,
            eventName: this.state.eventName,
            log: this.state.logId + 1
        }

        if (this.state.EditMode === true) {
            //database.editNeweventToDatabase2(eventData);
        }
        else {
            addNewEventToDatabase(eventData);
        }
    }

    // readeventFromFirebase(eventId) {
    //     let userData = JSON.parse(localStorage.getItem('user'))
    //     var self = this

    //     let reference = (userData.zooName + '/eventData/' + eventData.eventId);

    //     return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    //         let data = snapshot.data()

        
    //         self.setState({
    //             dataVersion: data.dataVersion,
    //             eventId: data.eventId,
    //             eventPhotoProfil: data.eventPhotoProfil,
    //             eventPhotos: data.eventPhotos,
    //             eventDescription: data.eventDescription,
    //             EditMode: true,
    //         });
    //     })

    // }

    // getLogLenght(){
    //     let userData = JSON.parse(localStorage.getItem('user'))
    //     var self = this
    //     let collection = (userData.zooName + '-log')
    //     firebase.firestore().collection(collection).get().then(function (querySnapshot) {
    //         let logLenght = []
    //         querySnapshot.forEach(function (doc) {
    //             logLenght.push(doc.data())
    //         });

    //         let logId = logLenght.length;
    //         console.log(logId)
    //         self.setState({
    //             logId: logId
    //         });

    //     })
    // }

    // initFoodList() {
    //     let userData = JSON.parse(localStorage.getItem('user'))
    //     // Fonction magique que je ne comprend pas 
    //     var self = this;
    //     // Selection de la référence de la base de donnée

    //     let foodList = []

    //     var query = firebase.database().ref(userData.zooName + "/Lists/FoodList").orderByKey();
    //     query.once("value")
    //         .then(function (snapshot) {
    //             snapshot.forEach(function (childSnapshot) {
    //                 var childData = childSnapshot.val();
    //                 foodList.push(childData);

    //             });
    //         }).then(function (snapshot) {

    //         self.setState({
    //             zooFoodList: foodList,

    //         });
    //     }, function (error) {
    //         // The Promise was rejected.
    //         console.error(error);
    //     });
    // }


    componentWillMount() {
        //this.getLogLenght();
        //this.initFoodList();
        //     if (this.props.location.state.eventId !== null){
        //     //this.readeventFromFirebase(this.props.location.state.eventId);
        //    } 
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

        const deleteButton = (
            <Button bsClass="btn btn-labeled btn-danger mr" onClick={() => { this.handleDelete() }}>
                <span className="btn-label"><i className="fa fa-trash-o"></i></span> Supprimer l'espèce
            </Button>
        );
        console.log(this.state.logId)
        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une event">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend> Informations générales</legend>
                                <fieldset>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Nom de l'event</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="eventName" placeholder="Ex. Vol des perroquets" value={this.state.eventName} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                </fieldset>
                          
                                <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <div className="col-md-7" >

                                        <label htmlFor="userName">Description du event</label>
                                        <Panel>
                                            <textarea name="eventDescription" rows="10" className="form-control note-editor" value={this.state.eventDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>

                                    <div className="col-md-4" >
                                    <label htmlFor="userName">Photo Principale</label>
                                            <DropzonePhoto eventName={this.state.eventName} background={this.state.eventPhotoProfil} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend> Ajout des photos</legend>
                                <FormGroup>
                                    <div className="row" >
                                        <div className="col-md-1" >
                                        </div>

                                    
                                        <div className="col-md-1" >
                                        </div>

                                        <div className="col-md-4">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <DropzonePhoto eventName={this.state.eventName} background={this.state.eventPhoto1} id="Photo1" methodToReturnUrl={this.handleReturnedUrl} />
                                                </div>
                                                <div className="col-md-6">
                                                    <DropzonePhoto eventName={this.state.eventName} background={this.state.eventPhoto2} id="Photo2" methodToReturnUrl={this.handleReturnedUrl} />
                                                </div>
                                                <div className="col-md-6">
                                                    <DropzonePhoto eventName={this.state.eventName} background={this.state.eventPhoto3} id="Photo3" methodToReturnUrl={this.handleReturnedUrl} />
                                                </div>
                                                <div className="col-md-6">
                                                    <DropzonePhoto eventName={this.state.eventName} background={this.state.eventPhoto4} id="Photo4" methodToReturnUrl={this.handleReturnedUrl} />
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </FormGroup>
                            </fieldset>
                        </form>
                    </CardWithHeader>
                </Panel>

                <Panel style={{ "display": "flex" }}>
                    <Button bsClass="btn btn-labeled btn-success mr" bsSize="large" onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider l'espèce
                    </Button>

                    {this.state.EditMode ? deleteButton : null}


                </Panel>
            </ContentWrapper>
        );
    }
}
export default EventScreen;