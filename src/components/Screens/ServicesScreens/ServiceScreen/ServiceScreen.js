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
import { addNewServiceToDatabase } from '../../../../database/database'

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const serviceData = {}

class ServiceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceId: '',
            serviceName: '',
            serviceProfilePicture: '',
            serviceProfilePicture: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            servicePhotos: [{ photoURL: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            logId: 0,
            dataVersion: 0,
            EditMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(service) {

        let name = service.target.name
        this.setState({ [name]: service.target.value });

        let serviceData = {
            serviceName: this.state.serviceName,
            serviceId: this.state.serviceId,
            serviceProfilePicture: this.state.serviceProfilePicture,
            servicePhotos: this.state.servicePhotos,
            serviceDescription: this.state.serviceDescription,
        }

        console.log(serviceData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'PhotoProfil') {

            let photoName = ('service' + photoId)
            this.setState({
                serviceProfilePicture: returnedUrl
            });

            return
        }

        console.log(this.state.servicePhotos)

        let photoUID = photoId
        let photosArray = this.state.servicePhotos

        console.log(photosArray.length)

        let newObject = {
            photoId: photoId,
            photoURL: returnedUrl
        }

        photosArray.push(newObject)

        this.setState({
            servicePhotos: photosArray

        });

        console.log(this.state.servicePhotos)
    }

    handleDelete() {

        let serviceData = {
            serviceId: this.state.serviceId,
            serviceName: this.state.serviceName,
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
                // database.deleteServiceFromDatabase(serviceData)
            });
    }

    handleClick() {
        let serviceData = {
            dataVersion: this.state.dataVersion + 1,
            serviceId: this.state.serviceId,
            serviceProfilePicture: this.state.serviceProfilePicture,
            servicePhotos: this.state.servicePhotos,
            serviceDescription: this.state.serviceDescription,
            serviceName: this.state.serviceName,
            log: this.state.logId + 1
        }

        if (this.state.EditMode === true) {
            //database.editNewServiceToDatabase(serviceData);
        }
        else {
            addNewServiceToDatabase(serviceData);
        }
    }

    // readserviceFromFirebase(serviceId) {
    //     let userData = JSON.parse(localStorage.getItem('user'))
    //     var self = this

    //     let reference = (userData.zooName + '/serviceData/' + serviceData.serviceId);

    //     return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    //         let data = snapshot.data()


    //         self.setState({
    //             dataVersion: data.dataVersion,
    //             serviceId: data.serviceId,
    //             serviceProfilePicture: data.serviceProfilePicture,
    //             servicePhotos: data.servicePhotos,
    //             serviceDescription: data.serviceDescription,
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
        //     if (this.props.location.state.serviceId !== null){
        //     //this.readserviceFromFirebase(this.props.location.state.serviceId);
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

        // Creation de la partie ajout photo

        var rows = [];
        for (var i = 0; i < this.state.servicePhotos.length; i++) {
            rows.push(
                <div className="col-md-3">
                    <DropzonePhoto serviceName={this.state.serviceName} background={this.state.servicePhotos[i].photoURL} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );
        }

        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une service">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend> Informations générales</legend>
                                <fieldset>
                                    <FormGroup>
                                        <label className="col-sm-2 control-label">Nom du service</label>
                                        <Col sm={10}>
                                            <FormControl type="text" name="serviceName" placeholder="Ex. Vol des perroquets" value={this.state.serviceName} onChange={this.handleChange} className="form-control" />
                                        </Col>
                                    </FormGroup>
                                </fieldset>

                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                    <div className="col-md-8" >

                                        <label htmlFor="userName">Description du service</label>
                                        <Panel>
                                            <textarea name="serviceDescription" rows="11" className="form-control note-editor" value={this.state.serviceDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>

                                    <div className="col-md-4" >
                                        <label htmlFor="userName">Photo Principale</label>
                                        <DropzonePhoto serviceName={this.state.serviceName} background={this.state.serviceProfilePicture} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
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
export default ServiceScreen;