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
import { addNewSpecieToDatabase, editSpecieInDatabase } from '../../../../database/database'
import AnimalListScreen from '../../AnimalScreens/AnimalsListScreen/AnimalsListScreen';
import Select from 'react-select';

const STATES = [
    { value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' },
    { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' },
    { value: 'victoria', label: 'Victoria', className: 'State-Vic' },
    { value: 'queensland', label: 'Queensland', className: 'State-Qld' },
    { value: 'western-australia', label: 'Western Australia', className: 'State-WA' },
    { value: 'south-australia', label: 'South Australia', className: 'State-SA' },
    { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' },
    { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' },
]

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const specieData = {}
const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}




class SpecieScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specieId: '',
            specieName: '',
            specieLatinName: '',
            specieEnglishName: '',
            specieClass: '',
            specieOrder: '',
            specieFamilly: '',
            specieIUCNClassification: '',
            specieDescription: '',
            specieGestation: '',
            specieWeight: '',
            specieLifeExpectancy: '',
            specieFood: [],
            specieProfilePicture: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            speciePhotos: [{ photoURL: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            specieEnclosurePhoto: 'img/bg1.jpg',
            specieAnimals: [],
            logId: 0,
            EditMode: false,
            zooFoodList: ['chargement']
        };
        this.readSpecieFromFirebase = this.readSpecieFromFirebase.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(specie) {

        let name = specie.target.name
        this.setState({ [name]: specie.target.value });

        let specieData = {
            specieId: this.state.specieId,
            specieName: this.state.specieName,
            specieLatinName: this.state.specieLatinName,
            specieEnglishName: this.state.specieEnglishName,
            specieClass: this.state.specieClass,
            specieOrder: this.state.specieOrder,
            specieFood: this.state.specieFood,
            specieFamilly: this.state.specieFamilly,
            specieAnimals: this.state.specieAnimals,
            specieIUCNClassification: this.state.specieIUCNClassification,
            specieDescription: this.state.specieDescription,
            specieGestation: this.state.specieGestation,
            specieWeight: this.state.specieWeight,
            specieLifeExpectancy: this.state.specieLifeExpectancy,
            speciePhotoProfil: this.state.speciePhotoProfil,
            speciePhotos: this.state.speciePhotos,
        }

        console.log(specieData)
    }

    handleChangeTypehead(selected) {

        let name = selected.target.name
        this.setState({ [name]: selected.target.value });

        let specieData = {

            specieFood: this.state.specieFood,
        }


        console.log(specieData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'ProfilePicture') {

            let photoName = ('specie' + photoId)
            this.setState({
                specieProfilePicture: returnedUrl
            });

            return
        }

        console.log(this.state.speciePhotos)

        let photoUID = photoId
        let photosArray = this.state.speciePhotos

        console.log(photosArray.length)

        let newObject = {
            photoId: photoId,
            photoURL: returnedUrl
        }

        photosArray.push(newObject)

        this.setState({
            speciePhotos: photosArray

        });

        console.log(this.state.speciePhotos)
    }

    handleDelete() {

        let specieData = {
            SpecieId: this.state.SpecieId,
            SpecieName: this.state.SpecieName,
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
                // database.deleteSpecieFromDatabase(specieData)
            });
    }

    handleClick() {
        let specieData = {
            specieId: this.state.specieId,
            specieName: this.state.specieName,
            specieLatinName: this.state.specieLatinName,
            specieEnglishName: this.state.specieEnglishName,
            specieClass: this.state.specieClass,
            specieOrder: this.state.specieOrder,
            specieFamilly: this.state.specieFamilly,
            specieIUCNClassification: this.state.specieIUCNClassification,
            specieDescription: this.state.specieDescription,
            specieGestation: this.state.specieGestation,
            specieWeight: this.state.specieWeight,
            specieLifeExpectancy: this.state.specieLifeExpectancy,
            specieFood: this.state.specieFood,
            specieProfilePicture: this.state.specieProfilePicture,
            speciePhotos: this.state.speciePhotos,
            specieEnclosurePhoto: this.state.specieEnclosurePhoto,
            specieAnimals: this.state.specieAnimals,
            log: this.state.logId + 1
        }

        if (this.state.EditMode === true) {
            editSpecieInDatabase(specieData);
        }
        else {
            addNewSpecieToDatabase(specieData);
        }

        //database.updateFoodDataBase(specieData.SpecieFood);
    }

    readSpecieFromFirebase(specieId) {
        //let userData = JSON.parse(localStorage.getItem('user'))

        let self = this

        let reference = (userData.zooName + '/speciesData/' + specieId);

        return firebase.database().ref(reference).once('value')
            .then(function (snapshot) {
                let data = snapshot.val()

                // let foodList = []
                // data.SpecieFood.forEach(function (foodItem) {
                //     if (foodItem.customOption === true) {
                //         foodList.push(foodItem.SpecieFood);
                //     } else {
                //         foodList.push(foodItem);
                //     }
                // })

                self.setState({
                    dataVersion: data.dataVersion,
                    specieId: data.specieId,
                    specieName: data.specieName,
                    specieLatinName: data.specieLatinName,
                    specieEnglishName: data.specieEnglishName,
                    specieClass: data.specieClass,
                    specieOrder: data.specieOrder,
                    specieFamilly: data.specieFamilly,
                    specieIUCNClassification: data.specieIUCNClassification,
                    specieDescription: data.specieDescription,
                    specieGestation: data.specieGestation,
                    specieWeight: data.specieWeight,
                    //specieFood: foodList,
                    specieLifeExpectancy: data.specieLifeExpectancy,
                    specieProfilePicture: data.specieProfilePicture,
                    //specieEnclosurePhoto: data.specieEnclosurePhoto,
                    specieAnimals: data.specieAnimals,
                    speciePhotos: data.speciePhotos,
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
        if (this.props.location.state != undefined) {
            this.readSpecieFromFirebase(this.props.location.state.specieId);
        }
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
        for (var i = 0; i < this.state.speciePhotos.length; i++) {
            rows.push(
                <div className="col-md-3">
                    <DropzonePhoto specieName={this.state.specieName} background={this.state.speciePhotos[i].photoURL} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
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
                                                        <FormControl type="text" name="specieName" placeholder="Ex. Gorilles" value={this.state.specieName} onChange={this.handleChange} className="form-control" />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nom Latin</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieLatinName" placeholder="Ex. gorilla gorilla" className="form-control" value={this.state.specieLatinName} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Nom Anglais</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieEnglishName" placeholder="Ex. Gorilla" className="form-control" value={this.state.specieEnglishName} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                        </div>
                                    </div>


                                    <div className="col-md-6" >
                                        <label htmlFor="userName">Photo de profile</label>
                                        <DropzonePhoto eventName={this.state.eventName} background={this.state.specieProfilePicture} id="ProfilePicture" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-6">
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Classe </label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieClass" placeholder="Ex. Mammifères" className="form-control" value={this.state.specieClass} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Ordre </label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieOrder" placeholder="Ex. Primates" className="form-control" value={this.state.specieOrder} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Famille </label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieFamilly" placeholder="Ex. hominidés" value="" className="form-control" value={this.state.specieFamilly} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <label htmlFor="userName">Description de l'espèce</label>
                                        <Panel>
                                            <textarea name="specieDescription" rows="12" className="form-control note-editor" value={this.state.specieDescription} onChange={this.handleChange}>
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
                                                <FormControl componentClass="select" className="form-control" value={this.state.specieIUCNClassification} onChange={this.handleChange}>
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
                                            <textarea name="specieDescription" rows="10" className="form-control note-editor" value={this.state.specieDescription} onChange={this.handleChange}>
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
                                                        <FormControl type="text" name="specieGestation" placeholder="Ex. 23 semaines" className="form-control" value={this.state.specieGestation} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Poid en kg</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieWeight" placeholder="Ex. 23 kg" className="form-control" value={this.state.specieWeight} onChange={this.handleChange} />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>

                                            <fieldset>
                                                <FormGroup>
                                                    <label className="col-sm-12 control-label">Esperance de vie</label>
                                                    <Col sm={10}>
                                                        <FormControl type="text" name="specieLifeExpectancy" placeholder="Ex. 12 ans" className="form-control" value={this.state.specieLifeExpectancy} onChange={this.handleChange} />
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
                                                                this.setState({ specieFood: selected });
                                                            }}
                                                            name="specieFood"
                                                            labelKey="specieFood"
                                                            multiple
                                                            options={this.state.zooFoodList}
                                                            defaultSelected={this.state.specieFood}

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
                                                        <img className="img-fluid" src={this.state.specieEnclosurePhoto} alt="Demo" />
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
                            <fieldset>

                                <legend> Gestion des individus </legend>
                                <Link to={{
                                    pathname: "AnimalScreen",
                                    state: { specieId: this.state.specieId }
                                }}>
                                    <Button color="success" className="btn-labeled" bsSize="large" style={{ marginRight: 20 }}>
                                        <span className="btn-label"><i className="fa fa-check"></i></span> Ajouter un individu
                              </Button>
                                </Link>

                                <FormGroup>
                                    <div className="col-md-12" >
                                        <div className="row" style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                            <AnimalListScreen animalsList={this.state.specieAnimals} />
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
export default SpecieScreen;