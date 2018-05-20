import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';

// Ajout des composants du formulaire
import TextInput from '../../../customComponents/TextInput/TextInput';
import IUCNSelector from '../../../customComponents/IUCNSelector/IUCNSelector';
//import DropzonePhoto from '../../../customComponents/Dropzone/DropzonePhoto';
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import database from '../../../../database/database'

const userId = "gwen"
const specieData = {}


class SpecieScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            SpecieId: '',
            SpecieName: '',
            SpecieLatinName: '',
            SpecieEnglishName: '',
            SpecieClass: '',
            SpecieOrder: '',
            SpecieFamilly: '',
            SpecieIUCNClassification: '',
            SpecieDescription: '',
            SpecieGestation: '',
            SpecieWeight: '',
            SpecieLifeExpectancy: '',
            SpecieFood: [],
            SpeciePhotoProfil: '',
            SpeciePhotos: [],
            SpeciePhoto1: '',
            SpeciePhoto2: '',
            SpeciePhoto3: '',
            SpeciePhoto4: '',
            logId: 0,
            EditMode: false,
            zooFoodList: ['chargement']
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(event) {

        let name = event.target.name
        this.setState({ [name]: event.target.value });

        let specieData = {
            SpecieId: this.state.SpecieId,
            SpecieName: this.state.SpecieName,
            SpecieLatinName: this.state.SpecieLatinName,
            SpecieEnglishName: this.state.SpecieEnglishName,
            SpecieClass: this.state.SpecieClass,
            SpecieOrder: this.state.SpecieOrder,
            SpecieFood: this.state.SpecieFood,
            SpecieFamilly: this.state.SpecieFamilly,
            SpecieIUCNClassification: this.state.SpecieIUCNClassification,
            SpecieDescription: this.state.SpecieDescription,
            SpecieGestation: this.state.SpecieGestation,
            SpecieWeight: this.state.SpecieWeight,
            SpecieLifeExpectancy: this.state.SpecieLifeExpectancy,
            SpeciePhotoProfil: this.state.SpeciePhotoProfil,
            SpeciePhotos: this.state.SpeciePhotos,
            SpeciePhoto1: this.state.SpeciePhoto1,
            SpeciePhoto2: this.state.SpeciePhoto2,
            SpeciePhoto3: this.state.SpeciePhoto3,
            SpeciePhoto4: this.state.SpeciePhoto4,
        }   

        console.log(specieData)
    }

    handleChangeTypehead(selected) {

        let name = selected.target.name
        this.setState({ [name]: selected.target.value });

        let specieData = {
    
            SpecieFood: this.state.SpecieFood,        
        }

        
        console.log(specieData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        if (photoId === 'photoProfil') {

        let photoName = ('Specie' + photoId)
        this.setState({
            [photoName]: returnedUrl
             });
        }

        console.log(this.state.SpeciePhotos)

        let photoUID = this.state.SpeciePhotos.length + 1
        let photosArray = this.state.SpeciePhotos

        console.log(photosArray.length)
    
        let newObject = {
                photoId: 99,
                photoURL : returnedUrl
            }

        photosArray.push(newObject)

         this.setState({
             SpeciePhotos: photosArray
         });

         console.log(this.state.SpeciePhotos)
    }

    handleDelete(){

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

    handleClick(){
            let specieData = {
                SpecieId: this.state.SpecieId,
                SpecieName: this.state.SpecieName,
                SpecieLatinName: this.state.SpecieLatinName,
                SpecieEnglishName: this.state.SpecieEnglishName,
                SpecieClass: this.state.SpecieClass,
                SpecieOrder: this.state.SpecieOrder,
                SpecieFamilly: this.state.SpecieFamilly,
                SpecieIUCNClassification: this.state.SpecieIUCNClassification,
                SpecieDescription: this.state.SpecieDescription,
                SpecieGestation: this.state.SpecieGestation,
                SpecieWeight: this.state.SpecieWeight,
                SpecieLifeExpectancy: this.state.SpecieLifeExpectancy,
                SpecieFood: this.state.SpecieFood,
                SpeciePhotoProfil: this.state.SpeciePhotoProfil,
                SpeciePhotos: this.state.SpeciePhotos,
                SpeciePhoto1: this.state.SpeciePhoto1,
                SpeciePhoto2: this.state.SpeciePhoto2,
                SpeciePhoto3: this.state.SpeciePhoto3,
                SpeciePhoto4: this.state.SpeciePhoto4,
                log: this.state.logId + 1
            }

            if (this.state.EditMode === true) {
                //database.editNewSpecieToDatabase2(specieData);
            }
            else {
                //database.addNewSpecieToDatabase2(specieData);
            }

            //database.updateFoodDataBase(specieData.SpecieFood);
        }
    
        readSpecieFromFirebase(specieId) {
            let userData = JSON.parse(localStorage.getItem('user'))
            var self = this
           
            let reference = (userData.zooName + '/speciesData/' + specieData.specieId);

            return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                 let data = snapshot.data()

                  let foodList = []
                  data.SpecieFood.forEach(function (foodItem) {
                      if (foodItem.customOption === true) {
                          foodList.push(foodItem.SpecieFood);
                      } else {
                          foodList.push(foodItem);
                      }
                  })

                  self.setState({
                      dataVersion: data.dataVersion,
                      SpecieId: data.specieId,
                      SpecieName: data.specieName,
                      SpecieLatinName: data.specieLatinName,
                      SpecieEnglishName: data.specieEnglishName,
                      SpecieClass: data.specieClass,
                      SpecieOrder: data.specieOrder,
                      SpecieFamilly: data.specieFamilly,
                      SpecieIUCNClassification: data.specieIUCNClassification,
                      SpecieDescription: data.specieDescription,
                      SpecieGestation: data.specieGestation,
                      SpecieWeight: data.specieWeight,
                      SpecieFood: foodList,
                      SpecieLifeExpectancy: data.specieLifeExpectancy,
                      SpeciePhotoProfil: data.speciePhotoProfil,
                      SpeciePhoto1: data.speciePhoto1,
                      SpeciePhoto2: data.speciePhoto2,
                      SpeciePhoto3: data.speciePhoto3,
                      SpeciePhoto4: data.speciePhoto4,
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


    componentWillMount(){
        //this.getLogLenght();
        //this.initFoodList();
        if (this.props.location.state.SpecieId !== null){
        //this.readSpecieFromFirebase(this.props.location.state.SpecieId);
       } 
    }

    render()   
    {
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
                <h3>Ajouter/Modifier une espèce</h3>
                <Panel>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend> Informations générales</legend>     
                        <fieldset>
                            <FormGroup>
                                    <label className="col-sm-2 control-label">Nom de l'espèce</label>
                            <Col sm={10}>
                                    <FormControl type="text" name="SpecieName" placeholder="Ex. Gorilles" value={this.state.SpecieName} onChange={this.handleChange} className="form-control" />
                            </Col>
                            </FormGroup>
                        </fieldset>

                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Nom Latin</label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieLatinName" placeholder="Ex. gorilla gorilla" className="form-control" value={this.state.SpecieLatinName} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>
                            
                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Nom Anglais</label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieEnglishName" placeholder="Ex. Gorilla" className="form-control" value={this.state.SpecieEnglishName} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>

                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Classe </label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieClass" placeholder="Ex. Mammifères" className="form-control" value={this.state.SpecieClass} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>

                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Ordre </label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieOrder" placeholder="Ex. Primates" className="form-control" value={this.state.SpecieOrder} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>


                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Famille </label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieFamilly" placeholder="Ex. hominidés" value="" className="form-control" value={this.state.SpecieFamilly} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </fieldset>

                        <fieldset>
                            <legend>Niveau de menace</legend>
                           
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="userName">Classification IUCN</label>
                                        <FormControl componentClass="select" className="form-control" value={this.state.SpecieIUCNClassification} onChange={this.handleChange}>
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
                                <div className="col-md-8">
                                    <label htmlFor="userName">Description des menaces</label>
                                    <Panel>
                                        <textarea name="SpecieDescription" rows="10" className="form-control note-editor" value={this.state.SpecieDescription} onChange={this.handleChange}>
                                        </textarea>
                                    </Panel>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend> Informations Biologiques</legend>
                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Durée de la gestation</label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieGestation" placeholder="Ex. 23 semaines" className="form-control" value={this.state.SpecieGestation} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>

                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Poid en kg</label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieWeight" placeholder="Ex. 23 kg" className="form-control" value={this.state.SpecieWeight} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>

                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Esperance de vie</label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="SpecieLifeExpectancy" placeholder="Ex. 12 ans" className="form-control" value={this.state.SpecieLifeExpectancy} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </fieldset>

                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-2 control-label">Nouriture</label>
                                    <Col sm={10}>
                                        <Typeahead
                                            allowNew
                                            onChange={(selected) => {
                                                this.setState({ SpecieFood : selected });
                                            }}
                                            name="SpecieFood"
                                            labelKey="SpecieFood"
                                            multiple  
                                            options={this.state.zooFoodList}
                                            defaultSelected={this.state.SpecieFood}
                                            
                                            placeholder="Choose a state..."
                                            
                                        />
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </fieldset>

                        {/* <fieldset>
                            <legend> Ajout des photos</legend>
                            <FormGroup>
                                <div className="row" >
                                    <div className="col-md-1" >
                                    </div>

                                    <div className="col-md-4" >
                                        <DropzonePhoto specieName={this.state.SpecieName} background={this.state.SpeciePhotoProfil} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>

                                    <div className="col-md-1" >
                                    </div>

                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <DropzonePhoto specieName={this.state.SpecieName} background={this.state.SpeciePhoto1} id="Photo1" methodToReturnUrl={this.handleReturnedUrl} />
                                            </div>
                                            <div className="col-md-6">
                                                <DropzonePhoto specieName={this.state.SpecieName} background={this.state.SpeciePhoto2} id="Photo2" methodToReturnUrl={this.handleReturnedUrl} />
                                            </div>
                                            <div className="col-md-6">
                                                <DropzonePhoto specieName={this.state.SpecieName} background={this.state.SpeciePhoto3} id="Photo3" methodToReturnUrl={this.handleReturnedUrl} />
                                            </div>
                                            <div className="col-md-6">
                                                <DropzonePhoto specieName={this.state.SpecieName} background={this.state.SpeciePhoto4} id="Photo4" methodToReturnUrl={this.handleReturnedUrl} />
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>            
                            </FormGroup>
                        </fieldset> */}
                    </form>
                </Panel>

                <Panel style={{"display":"flex"}}>
                    <Button bsClass="btn btn-labeled btn-success mr" bsSize="large" onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider l'espèce
                    </Button>
                   
                    {this.state.EditMode ? deleteButton : null}
                   
                    
                </Panel>
            </ContentWrapper>
        );
    }
}
export default SpecieScreen;