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
import { addNewAnimalToDatabase, editAnimaleInDatabase, deleteAnimalFromDatabase } from '../../../../database/database'

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const animalData = {}
const userData = JSON.parse(localStorage.getItem('user'))

class AnimalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specieId: this.props.location.state.specieId,
            animalId: '',
            animalName: '',
            animalAge: '',
            animalSex: '',
            animalPopularity: [{
                popularity: 0,
                popularityData: {}
            }],
            animalSponsors: [{
                animalSponsors: 0,
                animalSponsorsData: {}
            }],
            animalBiography: '',
            animalSpecieName: this.props.location.state.specieName,
            animalPhotoEnclosure: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
            animalProfilePicture: {
                fullPhoto: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                smallThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
            },
            animalPhotos: [{ largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
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
    }

    handleChangeTypehead(selected) {

        let name = selected.target.name
        this.setState({ [name]: selected.target.value });

        let animalData = {

            animalFood: this.state.animalFood,
        }
    }

    handleReturnedUrl(returnedUrl, photoId) {

        if (photoId === 'ProfilePicture') {

            let photoName = ('animal' + photoId)
            this.setState({
                animalProfilePicture: {
                    edited: false,
                    fullPhoto: returnedUrl,
                    largeThumb: returnedUrl,
                    smallThumb: returnedUrl,
                },
            });

            return
        }

        let photoUID = photoId
        let photosArray = this.state.animalPhotos
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
            animalPhotos: photosArray

        });

    }

    handleDelete() {

        let animalData = {
            animalId: this.state.animalId,
            specieId: this.state.specieId,
            animalName: this.state.animalName,
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
                deleteAnimalFromDatabase(animalData)
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
            specieId: this.state.specieId,
            log: this.state.logId + 1
        }

        animalData.animalPhotos.shift()

        if (this.state.EditMode === true) {
            editAnimaleInDatabase(animalData);
        }
        else {
            addNewAnimalToDatabase(animalData, this.state.specieId);
        }
    }

    readAnimalFromFirebase(animalId, specieId) {
        //let userData = JSON.parse(localStorage.getItem('user'))

        let self = this
        let newGallery = this.state.animalPhotos

        let reference = (userData.zooName + '/speciesData/' + specieId + '/specieAnimals/' + animalId);

        return firebase.database().ref(reference).once('value')
            .then(function (snapshot) {
                let data = snapshot.val()



                for (let item in data.animalPhotos){
                    let photo = data.animalPhotos[item]
                    photo.newUpload = false
                    newGallery.push(photo)
                }

                self.setState({
                    dataVersion: 1,
                    animalId: data.animalId,
                    animalName: data.animalName,
                    animalAge: data.animalAge,
                    animalSex: data.animalSex,
                    animalBiography: data.animalBiography,
                    animalPopularity : data.animalPopularity,
                    animalSponsors: data.animalSponsors,
                    animalSpecieName: data.animalSpecieName,
                    animalProfilePicture: data.animalProfilePicture,
                    animalPhotos: newGallery,
                    specieId: data.specieId,
                    EditMode: true,
                });
            })

    }

    initPage() {
        if ( this.props.location.state.animalId != undefined) {
            this.readAnimalFromFirebase(this.props.location.state.animalId, this.props.location.state.specieId);
        }
    }

    componentWillMount() {
        //this.getLogLenght();
        //this.initFoodList();

        this.initPage()

    }

    render() {

        console.log(this.state.animalProfilePicture)

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
            <Button color="danger" className="btn-labeled" bsSize="large" onClick={() => { this.handleDelete() }}>
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'espèce
            </Button>

        );

        // Gestion des photos

        var rows = [];
        for (var i = 0; i < this.state.animalPhotos.length; i++) {
            rows.push(
                <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    <DropzonePhoto size='300px' animalName={this.state.animalName} background={this.state.animalPhotos[i].largeThumb} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );
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
                                        <DropzonePhoto size='400px' eventName={this.state.eventName} background={this.state.animalProfilePicture.largeThumb} id="ProfilePicture" methodToReturnUrl={this.handleReturnedUrl} />
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