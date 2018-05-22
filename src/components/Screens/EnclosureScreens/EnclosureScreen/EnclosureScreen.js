import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import { Panel, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Ajout des composants du formulaire
import TextInput from '../../../customComponents/TextInput/TextInput';
import DropzonePhoto from '../../../customComponents/Dropzone/DropzonePhoto';
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import { addNewenclosureToDatabase } from '../../../../database/database'
import SpecieList from '../../SpecieScreens/SpeciesListScreen/SpeciesList/SpeciesList';

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const enclosureData = {}
const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}

class EnclosureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVersion : 0,
            enclosureId: '',
            enclosureName: '',
            enclosureSpeciesList: '',
            enclosureDescription: '',
            enclosurePhotoProfile: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            enclosurePhotos: [{ photoURL: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            logId: 0,
            EditMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(enclosure) {

        let name = enclosure.target.name
        this.setState({ [name]: enclosure.target.value });

        let enclosureData = {
            enclosureId: this.state.enclosureId,
            enclosureName: this.state.enclosureName,
            enclosureAge: this.state.enclosureAge,
            enclosureSex: this.state.enclosureSex,
            enclosureBiography: this.state.enclosureBiography,
            enclosureProfilePicture: this.state.enclosureProfilePicture,
            enclosurePhotos: this.state.enclosurePhotos,
        }

        console.log(enclosureData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        if (photoId === 'ProfilePicture') {

            let photoName = ('enclosure' + photoId)
            this.setState({
                enclosureProfilePicture: returnedUrl
            });

            return
        }

        let photoUID = photoId
        let photosArray = this.state.enclosurePhotos

        let newObject = {
            photoId: photoId,
            photoURL: returnedUrl
        }
        photosArray.push(newObject)
        this.setState({
            enclosurePhotos: photosArray
        });
    }

    handleDelete() {

        let enclosureData = {
            enclosureId: this.state.enclosureId,
            enclosureName: this.state.enclosureName,
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
                // database.deleteenclosureFromDatabase(enclosureData)
            });
    }

    handleClick() {
        let enclosureData = {
            enclosureId: this.state.enclosureId,
            enclosureName: this.state.enclosureName,
            enclosureSpeciesList: this.state.enclosureSpeciesList,
            enclosureDescription: this.state.enclosureDescription,
            enclosurePhotoProfile: this.state.enclosurePhotoProfile,
            enclosurePhotos: this.state.enclosurePhotos,
            log: this.state.logId + 1
        }

        if (this.state.EditMode === true) {
            //database.editNewenclosureToDatabase2(enclosureData);
        }
        else {

            this.addNewEnclosureToDatabase(enclosureData);
        }

        //database.updateFoodDataBase(enclosureData.enclosureFood);
    }

    readenclosureFromFirebase(enclosureId) {
        //let userData = JSON.parse(localStorage.getItem('user'))

        let self = this

        let reference = (userData.zooName + '/enclosuresData/' + enclosureId);

        return firebase.database().ref(reference).once('value')
            .then(function (snapshot) {
                let data = snapshot.val()

                // let foodList = []
                // data.enclosureFood.forEach(function (foodItem) {
                //     if (foodItem.customOption === true) {
                //         foodList.push(foodItem.enclosureFood);
                //     } else {
                //         foodList.push(foodItem);
                //     }
                // })

                self.setState({
                    dataVersion: data.dataVersion,
                    enclosureId: data.enclosureId,
                    enclosureName: data.enclosureName,
                    enclosureSpeciesList: data.enclosureSpeciesList,
                    enclosureDescription: data.enclosureDescription,
                    enclosurePhotoProfile: data.enclosurePhotoProfile,
                    enclosurePhotos: data.enclosurePhotos,
                    EditMode: true,
                });
            })

    }

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

    initPage() {
        // if ( this.props.location.state != undefined) {
        //     this.readSpecieFromFirebase(this.props.location.state.enclosureId);
        // }
    }


    componentWillMount() {
        //this.getLogLenght();
        //this.initFoodList();

        this.initPage()

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
            <Button color="danger" className="btn-labeled" bsSize="large" onClick={() => { this.handleClick() }}>
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'enclos
            </Button>

        );

        // Gestion des photos

        var rows = [];
        for (var i = 0; i < this.state.enclosurePhotos.length; i++) {
            rows.push(
                <div className="col-md-3">
                    <DropzonePhoto enclosureName={this.state.enclosureName} background={this.state.enclosurePhotos[i].photoURL} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );
        }

        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <legend>Ajouter/Modifier un Enclos</legend>
                            <fieldset>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-6" >
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nom de l'enclos</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="enclosureName" placeholder="Ex. Gorilles" value={this.state.enclosureName} onChange={this.handleChange} className="form-control" />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                    </div>


                                    <div className="col-md-6" >
                                        <label htmlFor="userName">Photo de profile</label>
                                        <DropzonePhoto eventName={this.state.eventName} background={this.state.enclosureProfilePicture} id="ProfilePicture" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-6">
                                        <label htmlFor="userName">Description de l'enclos</label>
                                        <Panel>
                                            <textarea name="enclosureBiography" rows="12" className="form-control note-editor" value={this.state.enclosureBiography} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>
                                </div>

                            </fieldset>

                            <fieldset>
                                <legend> Gallerie de l'enclos</legend>
                                <FormGroup>
                                    <div className="col-md-12" >
                                        <div className="row" style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                            {rows}
                                        </div>
                                    </div>
                                </FormGroup>
                            </fieldset>
                        </form>

                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <legend>Espèce presensente dans l'enclos</legend>
                            <SpecieList speciesList={this.state.speciesList} />
                        </form>
                    </CardWithHeader>
                </Panel>
                <CardWithHeader header="Validation" >

                    <Button color="success" className="btn-labeled" bsSize="large" style={{ marginRight: 20 }} onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider L'enclos
                        </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>

            </ContentWrapper >
        );
    }
}
export default EnclosureScreen;