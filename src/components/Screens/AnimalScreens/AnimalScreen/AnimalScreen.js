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
import { addNewAnimalToDatabase } from '../../../../database/database'

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const animalData = {}
const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}

class AnimalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specieId: this.props.location.state.specieId,
            animalId: '',
            animalName: '',
            animalAge: '',
            animalSex: '',
            animalPopularity : [],
            animalSponsors : [],
            animalBiography: '',
            animalSpecieName: this.props.location.state.specieName,
            animalPhotoEnclosure: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            animalProfilePicture: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            animalPhotos: [{ photoURL: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            logId: 0,
            EditMode: false,
        };
        this.readAnimalFromFirebase = this.readAnimalFromFirebase.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(animal) {

        let name = animal.target.name
        this.setState({ [name]: animal.target.value });

        let animalData = {
            animalId: this.state.animalId,
            animalName: this.state.animalName,
            animalAge: this.state.animalAge,
            animalSex: this.state.animalSex,
            animalSponsors: this.state.animalSponsors,
            animalPopularity: this.state.animalPopularity,
            animalBiography: this.state.animalBiography,
            animalProfilePicture: this.state.animalProfilePicture,
            animalPhotos: this.state.animalPhotos,
        }

        console.log(animalData)
    }

    handleChangeTypehead(selected) {

        let name = selected.target.name
        this.setState({ [name]: selected.target.value });

        let animalData = {

            animalFood: this.state.animalFood,
        }


        console.log(animalData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'ProfilePicture') {

            let photoName = ('animal' + photoId)
            this.setState({
                animalProfilePicture: returnedUrl
            });

            return
        }

        console.log(this.state.animalPhotos)

        let photoUID = photoId
        let photosArray = this.state.animalPhotos

        let newObject = {
            photoId: photoId,
            photoURL: returnedUrl
        }

        photosArray.push(newObject)

        this.setState({
            animalPhotos: photosArray

        });

        console.log(this.state.animalPhotos)
    }

    handleDelete() {

        let animalData = {
            animalId: this.state.animalId,
            animalName: this.state.animalName,
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
                // database.deleteanimalFromDatabase(animalData)
            });
    }

    handleClick() {
        let animalData = {
            animalId: this.state.animalId,
            animalName: this.state.animalName,
            animalAge: this.state.animalAge,
            animalSex: this.state.animalSex,
            animalSponsors: this.state.animalSponsors,
            animalPopularity: this.state.animalPopularity,
            animalBiography: this.state.animalBiography,
            animalPhotoEnclosure: this.state.animalPhotoEnclosure,
            animalSpecieName: this.state.animalSpecieName,
            animalProfilePicture: this.state.animalProfilePicture,
            animalPhotos: this.state.animalPhotos,
            log: this.state.logId + 1
        }

        if (this.state.EditMode === true) {
            //database.editNewanimalToDatabase2(animalData);
        }
        else {

            addNewAnimalToDatabase(animalData, this.state.specieId);
        }

        //database.updateFoodDataBase(animalData.animalFood);
    }

    readAnimalFromFirebase(animalId) {
        //let userData = JSON.parse(localStorage.getItem('user'))

        let self = this

        let reference = (userData.zooName + '/animalsData/' + animalId);

        return firebase.database().ref(reference).once('value')
            .then(function (snapshot) {
                let data = snapshot.val()

                // let foodList = []
                // data.animalFood.forEach(function (foodItem) {
                //     if (foodItem.customOption === true) {
                //         foodList.push(foodItem.animalFood);
                //     } else {
                //         foodList.push(foodItem);
                //     }
                // })

                self.setState({
                    dataVersion: data.dataVersion,
                    animalId: data.animalId,
                    animalName: data.animalName,
                    animalAge: data.animalAge,
                    animalSex: data.animalSex,
                    animalBiography: data.animalBiography,
                    animalSpecieName: data.animalSpecieName,
                    animalProfilePicture: data.animalProfilePicture,
                    animalPhotos: data.animalPhotos,
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
        //     this.readSpecieFromFirebase(this.props.location.state.animalId);
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
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'espèce
            </Button>

        );

        // Gestion des photos

        var rows = [];
        for (var i = 0; i < this.state.animalPhotos.length; i++) {
            rows.push(
                <div className="col-md-3">
                    <DropzonePhoto animalName={this.state.animalName} background={this.state.animalPhotos[i].photoURL} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );

            // Gestion des individus


            // }
        }

        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <legend>Ajouter/Modifier une espèce</legend>
                            <fieldset>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-6" >
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nom de l'individu</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalName" placeholder="Ex. Gorilles" value={this.state.animalName} onChange={this.handleChange} className="form-control" />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Age</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalAge" placeholder="Ex. gorilla gorilla" className="form-control" value={this.state.animalAge} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Sexe</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalSex" placeholder="Ex. Gorilla" className="form-control" value={this.state.animalSex} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                        </div>
                                    </div>


                                    <div className="col-md-6" >
                                        <label htmlFor="userName">Photo de profile</label>
                                        <DropzonePhoto eventName={this.state.eventName} background={this.state.animalProfilePicture} id="ProfilePicture" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-6">
                                        <label htmlFor="userName">Biographie de l'animal</label>
                                        <Panel>
                                            <textarea name="animalBiography" rows="12" className="form-control note-editor" value={this.state.animalBiography} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <legend> Choix de l'enclos</legend>
                                                <fieldset>
                                                    <div>
                                                        <FormControl componentClass="select" className="form-control" value={this.state.specieIUCNClassification} onChange={this.handleChange}>
                                                            <option></option>
                                                            <option>Enclos A</option>
                                                            <option>Enclos B</option>
                                                            <option>Enclos C</option>
                                                        </FormControl>
                                                    </div>
                                                </fieldset>

                                                {/* START widget */}
                                                <div className="card">
                                                    <div className="row row-flush">
                                                        <div className="col-8">
                                                            <img className="img-fluid" src={this.state.animalPhotoEnclosure} alt="Demo" />
                                                        </div>
                                                        <div className="col-4 bg-info d-flex align-items-center justify-content-center">
                                                            <div className="text-center">
                                                                <div className="text-lg mt-0">11&deg;</div>
                                                                <p>La foret de bambou</p>
                                                                <em className="fa fa-sun-o fa-2x"></em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* END widget */}
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>

                            <fieldset>
                                <legend> Gallerie de l'individu </legend>
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
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider l'individu
                        </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>

            </ContentWrapper >
        );
    }
}
export default AnimalScreen;