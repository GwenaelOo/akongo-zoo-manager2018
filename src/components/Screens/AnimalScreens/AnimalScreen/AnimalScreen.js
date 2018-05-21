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
            animalLatinName: '',
            animalEnglishName: '',
            animalClass: '',
            animalOrder: '',
            animalFamilly: '',
            animalIUCNClassification: '',
            animalDescription: '',
            animalGestation: '',
            animalWeight: '',
            animalLifeExpectancy: '',
            animalFood: [],
            animalProfilePicture: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            animalPhotos: [{ photoURL: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            animalEnclosurePhoto: 'img/bg1.jpg',
            animalPhoto1: '',
            animalPhoto2: '',
            animalPhoto3: '',
            animalPhoto4: '',
            logId: 0,
            EditMode: false,
            zooFoodList: ['chargement']
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
            animalLatinName: this.state.animalLatinName,
            animalEnglishName: this.state.animalEnglishName,
            animalClass: this.state.animalClass,
            animalOrder: this.state.animalOrder,
            animalFood: this.state.animalFood,
            animalFamilly: this.state.animalFamilly,
            animalIUCNClassification: this.state.animalIUCNClassification,
            animalDescription: this.state.animalDescription,
            animalGestation: this.state.animalGestation,
            animalWeight: this.state.animalWeight,
            animalLifeExpectancy: this.state.animalLifeExpectancy,
            animalPhotoProfil: this.state.animalPhotoProfil,
            animalPhotos: this.state.animalPhotos,
            animalPhoto1: this.state.animalPhoto1,
            animalPhoto2: this.state.animalPhoto2,
            animalPhoto3: this.state.animalPhoto3,
            animalPhoto4: this.state.animalPhoto4,
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

        console.log(photosArray.length)

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
            animalLatinName: this.state.animalLatinName,
            animalEnglishName: this.state.animalEnglishName,
            animalClass: this.state.animalClass,
            animalOrder: this.state.animalOrder,
            animalFamilly: this.state.animalFamilly,
            animalIUCNClassification: this.state.animalIUCNClassification,
            animalDescription: this.state.animalDescription,
            animalGestation: this.state.animalGestation,
            animalWeight: this.state.animalWeight,
            animalLifeExpectancy: this.state.animalLifeExpectancy,
            animalFood: this.state.animalFood,
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
                    animalLatinName: data.animalLatinName,
                    animalEnglishName: data.animalEnglishName,
                    animalClass: data.animalClass,
                    animalOrder: data.animalOrder,
                    animalFamilly: data.animalFamilly,
                    animalIUCNClassification: data.animalIUCNClassification,
                    animalDescription: data.animalDescription,
                    animalGestation: data.animalGestation,
                    animalWeight: data.animalWeight,
                    //animalFood: foodList,
                    animalLifeExpectancy: data.animalLifeExpectancy,
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


    componentWillMount() {
        //this.getLogLenght();
        //this.initFoodList();
        // let requestedData = this.props.location.state.animalId
        // if (requestedData !== null) {
        //     this.readAnimalFromFirebase(this.props.location.state.animalId);
        // }
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
                                                    <label className="col-sm-12 control-label">Nom de l'espèce</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalName" placeholder="Ex. Gorilles" value={this.state.animalName} onChange={this.handleChange} className="form-control" />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nom Latin</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalLatinName" placeholder="Ex. gorilla gorilla" className="form-control" value={this.state.animalLatinName} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nom Anglais</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalEnglishName" placeholder="Ex. Gorilla" className="form-control" value={this.state.animalEnglishName} onChange={this.handleChange} />
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
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Classe </label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalClass" placeholder="Ex. Mammifères" className="form-control" value={this.state.animalClass} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Ordre </label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalOrder" placeholder="Ex. Primates" className="form-control" value={this.state.animalOrder} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Famille </label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalFamilly" placeholder="Ex. hominidés" value="" className="form-control" value={this.state.animalFamilly} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <label htmlFor="userName">Description de l'espèce</label>
                                        <Panel>
                                            <textarea name="animalDescription" rows="12" className="form-control note-editor" value={this.state.animalDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>
                                </div>

                            </fieldset>

                            <fieldset>
                                <legend>Niveau de menace</legend>

                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-6">
                                        <div className="col-md-12" >
                                            <div>
                                                <label htmlFor="userName">Classification IUCN</label>
                                                <FormControl componentClass="select" className="form-control" value={this.state.animalIUCNClassification} onChange={this.handleChange}>
                                                    <option></option>
                                                    <option>Préoccupation mineure (LC)</option>
                                                    <option>Espèce quasi menacée (NT)</option>
                                                    <option>Espèce vulnérable (VU)</option>
                                                    <option>Espèce en danger (EN)</option>
                                                    <option>En danger critique d'extinction (CR)</option>
                                                    <option>Éteint à l'état sauvage (EW)</option>
                                                    <option>Éteint (EX)</option>
                                                    <option>Données insuffisantes (DD)</option>
                                                    <option>Non-Évalué (NE)</option>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="userName">Description des menaces</label>
                                        <Panel>
                                            <textarea name="animalDescription" rows="10" className="form-control note-editor" value={this.state.animalDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>
                                    </div>
                                </div>
                            </fieldset>

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className="col-md-6">
                                    <div className="col-md-12" >
                                        <fieldset>
                                            <legend> Informations Biologiques</legend>
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Durée de la gestation</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalGestation" placeholder="Ex. 23 semaines" className="form-control" value={this.state.animalGestation} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Poid en kg</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalWeight" placeholder="Ex. 23 kg" className="form-control" value={this.state.animalWeight} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Esperance de vie</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="animalLifeExpectancy" placeholder="Ex. 12 ans" className="form-control" value={this.state.animalLifeExpectancy} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nouriture</label>
                                                    <Col sm={10}>
                                                        <Typeahead
                                                            allowNew
                                                            onChange={(selected) => {
                                                                this.setState({ animalFood: selected });
                                                            }}
                                                            name="animalFood"
                                                            labelKey="animalFood"
                                                            multiple
                                                            options={this.state.zooFoodList}
                                                            defaultSelected={this.state.animalFood}

                                                            placeholder="Choose a state..."

                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                        </fieldset>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-12" >
                                        <fieldset>
                                            <legend> Choix de l'enclos</legend>
                                            <fieldset>
                                                <div>
                                                    <FormControl componentClass="select" className="form-control" value={this.state.animalIUCNClassification} onChange={this.handleChange}>
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
                                                        <img className="img-fluid" src={this.state.animalEnclosurePhoto} alt="Demo" />
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


                            <fieldset>
                                <legend> Gallerie de l'espèce </legend>
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
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider l'espèce
                        </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>

            </ContentWrapper >
        );
    }
}
export default AnimalScreen;