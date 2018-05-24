import React from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Panel, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Ajout des composants du formulaire
import swal from 'sweetalert'
import { Typeahead } from 'react-bootstrap-typeahead';
import firebase from 'firebase';
import { saveDonationSetupToDatabase } from '../../../database/database'

// Create a single card with header text as attribute
const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const userId = "gwen"
const donationData = {}


class DonationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donationURL: '',
            logId: 0,
            dataVersion: 0,
            EditMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReturnedUrl = this.handleReturnedUrl.bind(this);
    }

    handleChange(donation) {

        let name = donation.target.name
        this.setState({ [name]: donation.target.value });

        let donationData = {
            donationURL: this.state.donationURL,
        }

        console.log(donationData)
    }

    handleReturnedUrl(returnedUrl, photoId) {

        console.log(photoId)

        if (photoId === 'PhotoProfil') {

            let photoName = ('donation' + photoId)
            this.setState({
                donationProfilePicture: returnedUrl
            });

            return
        }

        console.log(this.state.donationPhotos)

        let photoUID = photoId
        let photosArray = this.state.donationPhotos

        console.log(photosArray.length)

        let newObject = {
            photoId: photoId,
            photoURL: returnedUrl
        }

        photosArray.push(newObject)

        this.setState({
            donationPhotos: photosArray

        });

        console.log(this.state.donationPhotos)
    }

    handleDelete() {

        let donationData = {
            donationId: this.state.donationId,
            donationName: this.state.donationName,
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
                // database.deletedonationFromDatabase(donationData)
            });
    }

    handleClick() {
        let donationData = {
            dataVersion: this.state.dataVersion + 1,
            donationURL: this.state.donationURL,
            log: this.state.logId + 1
        }

        if (this.state.EditMode === true) {
            //database.editNewdonationToDatabase2(donationData);
        }
        else {
            saveDonationSetupToDatabase(donationData);
        }
    }

    componentWillMount() {
        //this.getLogLenght();
        //this.initFoodList();
        //     if (this.props.location.state.donationId !== null){
        //     //this.readdonationFromFirebase(this.props.location.state.donationId);
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


        return (
            <ContentWrapper>
                <Panel>
                    <CardWithHeader header="Ajouter/Modifier une donation">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <FormGroup>
                                    <label className="col-sm-8 control-label">URL de la page Hello Asso de la fondation</label>
                                    <Col sm={10}>
                                        <FormControl type="text" name="donationName" placeholder="HTTP:// ..." value={this.state.donationName} onChange={this.handleChange} className="form-control" />
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </form>
                    </CardWithHeader>
                </Panel>
                <CardWithHeader header="Validation" >
                    <Button color="success" className="btn-labeled" bsSize="large" style={{ marginRight: 20 }} onClick={() => { this.handleClick() }}>
                        <span className="btn-label"><i className="fa fa-check"></i></span> Valider la configuration du don
                    </Button>

                    {this.state.EditMode ? deleteButton : null}
                </CardWithHeader>
            </ContentWrapper>
        );
    }
}
export default DonationScreen;