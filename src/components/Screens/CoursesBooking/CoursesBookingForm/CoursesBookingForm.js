import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import { Panel, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Ajout des composants du formulaire
import TextInput from '../../../customComponents/TextInput/TextInput';
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import { addNewCourseDateToDatabase, deleteEventInDatabase, editEventInDatabase } from '../../../../database/database'

import Select from 'react-select'

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import moment from 'moment';

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const eventData = {}
const userData = JSON.parse(localStorage.getItem('user'))

const COURSES_LIST = [
    {
        label: 'Aménagement enclos',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-amenagement-enclos.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Nouveau collaborateur',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-nouveau-collaborateur.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Science au zoo',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-science-zoo.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Bien-être Animal',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-bien-etre.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Animal Training',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-animal-training.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Intéragir avec les visiteurs',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-interagir-visiteur.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Ethologie Niveau 1',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-ethologie-1.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
    {
        label: 'Ethologie niveau 2',
        value: {
            url: 'http://www.akongo.fr/assets/img/vignettes/formation-ethologie-2.jpg',
            courseId: 'fdsfdssfdf'
        }
    },
]

const COURSES_PLACES = [
    {
        label: 'TOULON',
        value: {
            url: 'http://levarois.com/wp-content/uploads/2016/03/Coworking-TVT-8.jpg',
            placeId: 1
        }
    },
    {
        label: 'ZOO 1',
        value: {
            url: 'http://iledolonne-sainteanne.fr/wp-content/uploads/2018/07/zoo.jpg',
            placeId: 2
        }
    },
]
const CAPACITY = [
    { value: 1, label: '1 place' },
    { value: 2, label: '2 places' },
    { value: 3, label: '3 places' },
    { value: 4, label: '4 places' },
    { value: 5, label: '5 places' },
    { value: 6, label: '6 places' },
    { value: 7, label: '7 places' },
    { value: 8, label: '8 places' },
    { value: 9, label: '9 places' },
    { value: 10, label: '10 places' },
    { value: 11, label: '11 places' },
    { value: 12, label: '12 places' },
    { value: 13, label: '13 places' },
    { value: 14, label: '14 places' },
    { value: 15, label: '15 places' },
    { value: 16, label: '16 places' },
    { value: 17, label: '17 places' },
    { value: 18, label: '18 places' },
    { value: 19, label: '19 places' },
    { value: 20, label: '20 places' },
]

class CoursesBookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursesList: COURSES_LIST,
            coursesPlaces: COURSES_PLACES,
            selectedCourse: null,
            selectedPlace: null,
            capacity: null,
            occupency: null,
            dateTime: '',
            EditMode: false,
        };
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    }

  
    handleCourseChange(newValue) {
        this.setState({
            selectedCourse: newValue
        })
    }

    handlePlaceChange(newValue) {
        this.setState({
            selectedPlace: newValue
        })
    }

    handleCapacityChange(newValue) {

        console.log(newValue)
        this.setState({
            capacity: newValue
        })
    }

    handleDateTimeChange(moment) {
        this.setState({
            dateTime: moment
        })
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
                deleteEventInDatabase(eventData)
            });
    }

    handleClick() {
        let courseData = {
            selectedCourse: this.state.selectedCourse,
            selectedPlace: this.state.selectedPlace,
            capacity: this.state.capacity,
            dateTime: this.state.dateTime.format(),
            courseId: this.state.selectedCourse.value.courseId,
            placeId: this.state.selectedPlace.value.placeId
        }

        if (this.state.EditMode === true) {
            editEventInDatabase(courseData);
        }
        else {
            addNewCourseDateToDatabase(courseData);
        }
    }

    readEventFromFirebase(eventId) {
        var self = this
        let newGallery = this.state.eventPhotos
        let reference = (userData.zooName + '/eventsData/' + eventId);


        return firebase.database().ref(reference).once('value').then(function (snapshot) {
            let data = snapshot.val()

            for (let item in data.eventPhotos) {
                let photo = data.eventPhotos[item]
                photo.newUpload = false
                newGallery.push(photo)
            }

            self.setState({
                dataVersion: 1,
                eventId: data.eventId,
                eventProfilePicture: data.eventProfilePicture,
                eventPhotos: newGallery,
                eventName: data.eventName,
                eventDescription: data.eventDescription,
                eventDateTime: moment(data.eventDateTime),
                EditMode: true,
            });
        })

    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            this.readEventFromFirebase(this.props.location.state.eventId);
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

        // Creation du bouton suppression

        const deleteButton = (
            <Button color="danger" className="btn-labeled" bsSize="large" onClick={() => { this.handleDelete() }}>
                <span className="btn-label"><i className="fa fa-trash"></i></span> Supprimer l'évènement
            </Button>);



        // Préparation module préview Formation

        let coursePreview
        if (this.state.selectedCourse) {
            coursePreview = (
                <div className="col-md-4" >
                    <label htmlFor="userName">Photo de profile</label>
                    <img src={this.state.selectedCourse.value.url} style={{ width: '2OOpx', height: '200px' }} />
                </div>
            );
        }

        // Préparation module préview Localisation

        let placePreview
        if (this.state.selectedPlace) {
            placePreview = (
                <div className="col-md-4" >
                    <label htmlFor="userName">Photo de profile</label>
                    <img src={this.state.selectedPlace.value.url} style={{ width: '2OOpx', height: '200px' }} />
                </div>
            );
        }

        // Préparation module préview capacité

        let infoPreview
        if (this.state.capacity || this.state.dateTime) {
            let CapacityPreview
            let DatePreview
            let OccupencyPreview
            if (this.state.capacity) {
                CapacityPreview = (
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <label htmlFor="dateTime">Nombre de places</label>
                        <label htmlFor="capacity">{this.state.capacity.label}</label>
                    </div>
                );
            }
            if (this.state.dateTime) {
                DatePreview = (
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <label htmlFor="dateTime">Date  </label>
                        <label htmlFor="dateTime">{moment(this.state.dateTime).format("MMM Do YY")}</label>
                    </div>
                );
            }
            if (this.state.Occupency) {
                OccupencyPreview = (
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <label htmlFor="dateTime">Place reservés  </label>
                        <label htmlFor="dateTime">{this.state.occupency}</label>
                    </div>
                );
            }

            infoPreview = (
                <div className="col-md-4" >
                    <label htmlFor="userName">info  </label>
                    <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                        {CapacityPreview}
                        {OccupencyPreview}
                        {DatePreview}
                    </div>
                </div>
            );
        }

        // Préparation module préview Date





        return (

            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une event">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <fieldset>
                                    <label className="col-sm-6 control-label">Choix de la formation</label>
                                    <div className="col-md-12" >
                                        <div style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                                            <div className="col-md-6" >
                                                <Select
                                                    options={this.state.coursesList}
                                                    onChange={(newValue) => this.handleCourseChange(newValue)}
                                                    value={this.state.selectedCourse}
                                                    placeholder='Choix de la formation'
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Select
                                                    options={this.state.coursesPlaces}
                                                    onChange={(newValue) => this.handlePlaceChange(newValue)}
                                                    value={this.state.selectedPlace}
                                                    placeholder='Choix de la l emplacement'
                                                />
                                            </div>
                                            <div className="col-md-6" >
                                                <Select
                                                    options={CAPACITY}
                                                    onChange={(newValue) => this.handleCapacityChange(newValue)}
                                                    value={this.state.capacity}
                                                    placeholder='Choix de la la capacité'
                                                />
                                            </div>
                                            <div className="col-md-6" >
                                                <Datetime name="dateTime" inputProps={{ className: 'form-control' }} value={this.state.dateTime} onChange={this.handleDateTimeChange} dateFormat={true} timeFormat={false} />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>



                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {coursePreview}
                                    {placePreview}
                                    {infoPreview}
                                </div>
                            </fieldset>


                        </form>
                    </CardWithHeader>
                </Panel>

                <CardWithHeader header="Validation" >

                    <Button color="success" className="btn-labeled" bsSize="large" style={{ marginRight: 20 }} onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider la formation
                    </Button>

                    {this.state.EditMode ? deleteButton : null}

                </CardWithHeader>
            </ContentWrapper>
        );
    }
}
export default CoursesBookingForm;