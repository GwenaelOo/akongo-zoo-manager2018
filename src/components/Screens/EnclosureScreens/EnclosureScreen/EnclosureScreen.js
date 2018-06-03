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
import { addNewEnclosureToDatabase, editEnclosureInDatabase, deleteEnclosureInDatabase } from '../../../../database/database'
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
            dataVersion: 0,
            enclosureId: '',
            enclosureName: '',
            enclosureSpeciesList: '',
            enclosureWishListURL: '',
            enclosureWishListStatus: '',
            enclosureWishListDescription: '',
            enclosureDescription: '',
            enclosureProfilePicture: {
                fullPhoto: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                smallThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
            },
            enclosurePhotos: [{ largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
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
            enclosureSex: this.state.enclosureSex,
            enclosureProfilePicture: this.state.enclosureProfilePicture,
            enclosureWishListStatus: this.state.enclosureWishListStatus,
            enclosureWishListDescription: this.state.enclosureWishListDescription,
            enclosureWishListURL: this.state.enclosureWishListURL,
            enclosurePhotos: this.state.enclosurePhotos,
        }

        console.log(enclosureData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        if (photoId === 'PhotoProfil') {

            let photoName = ('enclosure' + photoId)
            this.setState({
                enclosureProfilePicture: {
                    edited: false,
                    fullPhoto: returnedUrl,
                    largeThumb: returnedUrl,
                    smallThumb: returnedUrl,
                },
            });

            return
        }

        let photoUID = photoId
        let photosArray = this.state.enclosurePhotos
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
               deleteEnclosureInDatabase(enclosureData)
            });
            
    }

    handleClick() {
        let enclosureData = {
            enclosureId: this.state.enclosureId,
            enclosureName: this.state.enclosureName,
            enclosureSpeciesList: this.state.enclosureSpeciesList,
            enclosureDescription: this.state.enclosureDescription,
            enclosureProfilePicture: this.state.enclosureProfilePicture,
            enclosureWishListStatus: this.state.enclosureWishListStatus,
            enclosureWishListURL: this.state.enclosureWishListURL,
            enclosureWishListDescription: this.state.enclosureWishListDescription,
            enclosurePhotos: this.state.enclosurePhotos,
            log: this.state.logId + 1
        }

        enclosureData.enclosurePhotos.shift()

        if (this.state.EditMode === true) {
            editEnclosureInDatabase(enclosureData);
        }
        else {
            addNewEnclosureToDatabase(enclosureData);
        }
    }

    readEnclosureFromFirebase(enclosureId) {
        //let userData = JSON.parse(localStorage.getItem('user'))
        let newGallery = this.state.enclosurePhotos
        let self = this

        let reference = (userData.zooName + '/enclosuresData/' + enclosureId);

        return firebase.database().ref(reference).once('value')
            .then(function (snapshot) {
                let data = snapshot.val()

                for (let item in data.enclosurePhotos){
                    let photo = data.enclosurePhotos[item]
                    photo.newUpload = false
                    newGallery.push(photo)
                }

                self.setState({
                    dataVersion: 1,
                    enclosureId: data.enclosureId,
                    enclosureName: data.enclosureName,
                    enclosureSpeciesList: data.enclosureSpeciesList,
                    enclosureDescription: data.enclosureDescription,
                    enclosureProfilePicture: data.enclosureProfilePicture,
                    enclosurePhotos: newGallery,
                    EditMode: true,
                });
            })

    }

    getSpeciesInThisEnclosure(enclosureId) {
        var self = this;

        let reference = (userData.zooName + '/speciesData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let speciesList = result.val()

                for (let specie in speciesList) {
                    if (speciesList[specie].specieEnclosure.enclosureId != enclosureId)

                        delete speciesList[specie]
                }

                self.setState({
                    enclosureSpeciesList: speciesList
                })
            })
    }

    initPage() {
        if (this.props.location.state != undefined) {
            this.readEnclosureFromFirebase(this.props.location.state.enclosureId);
            this.getSpeciesInThisEnclosure(this.props.location.state.enclosureId);
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
            <Button color="danger" className="btn-labeled" bsSize="large" onClick={() => { this.handleDelete() }}>
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'enclos
            </Button>

        );

        // Gestion des photos

        var rows = [];
        for (var i = 0; i < this.state.enclosurePhotos.length; i++) {
            rows.push(
                <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    <DropzonePhoto enclosureName={this.state.enclosureName} background={this.state.enclosurePhotos[i].largeThumb} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
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

                                        <div className="col-md-12" >
                                            <fieldset>
                                                <FormGroup>
                                                    <label htmlFor="userName">Description de l'enclos</label>
                                                    <Panel>
                                                        <textarea name="enclosureDescription" rows="10" className="form-control note-editor" value={this.state.enclosureDescription} onChange={this.handleChange}>
                                                        </textarea>
                                                    </Panel>
                                                </FormGroup>
                                            </fieldset>
                                        </div>
                                    </div>


                                    <div className="col-md-6" >
                                        <label htmlFor="userName">Photo de profile</label>
                                        <DropzonePhoto eventName={this.state.eventName} background={this.state.enclosureProfilePicture.largeThumb} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
                                    </div>

                                </div>
                                <div style={{ display: 'flex', flexDirection: "row" }} >
                                    <div className="col-md-6" >
                                        <fieldset>
                                            <FormGroup>
                                                <label className="col-sm-12 control-label">Adresse de la wishlist</label>
                                                <Col sm={10}>
                                                    <FormControl type="text" name="enclosureWishListURL" placeholder="HTTP:// ..." value={this.state.enclosureWishListURL} onChange={this.handleChange} className="form-control" />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="userName">Description de la wishlist</label>
                                        <Panel>
                                            <textarea name="enclosureDescription" rows="12" className="form-control note-editor" value={this.state.enclosureDescription} onChange={this.handleChange}>
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

                        {/* <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <legend>Espèces dans l'enclos</legend>
                            <SpecieList speciesList={this.state.enclosureSpeciesList} />
                        </form> */}
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