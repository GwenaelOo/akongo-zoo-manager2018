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
import { addNewServiceToDatabase, editServiceInDatabase, deleteServiceInDatabase } from '../../../../database/database'

import Select from 'react-select'

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import moment from 'moment';

const servicesTypes = [
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Boutiques', label: 'Boutiques' },
    { value: 'Toilette', label: 'Toilette' }
];

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const serviceData = {}
const userData = JSON.parse(localStorage.getItem('user'))

class ServiceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceId: '',
            serviceName: '',
            serviceDescription: '',
            serviceType: '',
            serviceOpeningTime: '',
            serviceClosingTime: '',
            serviceProfilePicture: {
                fullPhoto: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png',
                smallThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
            },
            servicePhotos: [{ largeThumb: 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png' }],
            logId: 0,
            dataVersion: 0,
            EditMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
        this.handleOpeningTimeChange = this.handleOpeningTimeChange.bind(this);
        this.handleClosingTimeChange = this.handleClosingTimeChange.bind(this);
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
    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'PhotoProfil') {

            let photoName = ('service' + photoId)
            this.setState({
                serviceProfilePicture: {
                    edited: false,
                    fullPhoto: returnedUrl,
                    largeThumb: returnedUrl,
                    smallThumb: returnedUrl,
                },
            });
            return
        }

        let photoUID = photoId
        let photosArray = this.state.servicePhotos

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
            servicePhotos: photosArray

        });
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
                deleteServiceInDatabase(serviceData)
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
            serviceOpeningTime: this.state.serviceOpeningTime.format(),
            serviceClosingTime: this.state.serviceClosingTime.format(),
            log: this.state.logId + 1
        }

        serviceData.servicePhotos.shift()

        if (this.state.EditMode === true) {
            editServiceInDatabase(serviceData)
        }
        else {
            addNewServiceToDatabase(serviceData);
        }
    }

    readServiceFromFirebase(serviceId) {
        //let userData = JSON.parse(localStorage.getItem('user'))
        var self = this
        let newGallery = this.state.servicePhotos

        let reference = (userData.zooName + '/servicesData/' + serviceId);

        return firebase.database().ref(reference).once('value').then(function (snapshot) {
            let data = snapshot.val()

            for (let item in data.servicePhotos) {
                let photo = data.servicePhotos[item]
                photo.newUpload = false
                newGallery.push(photo)
            }

            self.setState({
                dataVersion: 1,
                serviceId: data.serviceId,
                serviceName: data.serviceName,
                serviceProfilePicture: data.serviceProfilePicture,
                servicePhotos: newGallery,
                serviceDescription: data.serviceDescription,
                serviceOpeningTime: moment(data.serviceOpeningTime),
                serviceClosingTime: moment(data.serviceClosingTime),
                EditMode: true,
            });
        })

    }

    handleOpeningTimeChange(moment) {

        this.setState({
            serviceOpeningTime: moment
        })
    }

    handleClosingTimeChange(moment) {
        this.setState({
            serviceClosingTime: moment
        })
    }


    handleServiceType(newValue) {
        this.setState({
            serviceType: newValue
        })
    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            this.readServiceFromFirebase(this.props.location.state.serviceId);
        }
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
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer le service
            </Button>);

        // Creation de la partie ajout photo

        var rows = [];
        for (var i = 0; i < this.state.servicePhotos.length; i++) {
            rows.push(
                <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <DropzonePhoto serviceName={this.state.serviceName} background={this.state.servicePhotos[i].largeThumb} id={"Photo" + i} methodToReturnUrl={this.handleReturnedUrl} />
                </div>
            );
        }

        console.log(this.state.serviceClosingTime)

        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une service">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <fieldset>
                                    <FormGroup >
                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                            <div className="col-md-6" style={{}}  >
                                                <label className="control-label">Nom du service</label>
                                                <FormControl type="text" name="serviceName" placeholder="Ex. Vol des perroquets" value={this.state.serviceName} onChange={this.handleChange} className="form-control" />

                                            </div>

                                            <div className="col-md-6" style={{}} >
                                                <label className="control-label">Type de service</label>
                                                <Select
                                                    options={servicesTypes}
                                                    onChange={(newValue) => this.handleServiceType(newValue)}
                                                    value={this.state.serviceType}
                                                />
                                            </div>
                                        </div>

                                    </FormGroup>
                                </fieldset>

                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                    <div className="col-md-8" >

                                        <label htmlFor="userName">Description du service</label>
                                        <Panel>
                                            <textarea name="serviceDescription" rows="11" className="form-control note-editor" value={this.state.serviceDescription} onChange={this.handleChange}>
                                            </textarea>
                                        </Panel>

                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: '1em' }}>
                                            <div>
                                                <label htmlFor="userName"><i class="fa fa-clock-o" aria-hidden="true"></i> Heure d'ouverture </label>
                                                <Panel>
                                                    <Datetime inputProps={{ className: 'form-control' }} value={this.state.serviceOpeningTime} onChange={this.handleOpeningTimeChange} dateFormat={false} timeFormat="HH:mm" />
                                                </Panel>
                                            </div>
                                            <div style={{marginLeft: '1em'}}>

                                                <label htmlFor="userName"><i class="fa fa-clock-o" aria-hidden="true"></i> Heure de fermeture </label>
                                                <Panel>
                                                    <Datetime inputProps={{ className: 'form-control' }} value={this.state.serviceClosingTime} onChange={this.handleClosingTimeChange} dateFormat={false} timeFormat="HH:mm" />
                                                </Panel>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4" >
                                        <label htmlFor="userName">Photo Principale</label>
                                        <DropzonePhoto serviceName={this.state.serviceName} background={this.state.serviceProfilePicture.largeThumb} id="PhotoProfil" methodToReturnUrl={this.handleReturnedUrl} />
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

                <CardWithHeader header="Validation" >

                    <Button color="success" className="btn-labeled" bsSize="large" style={{ marginRight: 20 }} onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider le service
                    </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>
            </ContentWrapper>
        );
    }
}
export default ServiceScreen;