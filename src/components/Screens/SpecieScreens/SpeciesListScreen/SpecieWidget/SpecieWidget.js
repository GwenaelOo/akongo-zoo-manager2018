import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class SpecieWidget extends React.Component {


    handleEditClic(specieId) {

    }
    render() {
        console.log(this.props.specieData.specieProfilePicture.largeThumb)
        return (
            <div className="col-xl-4">
                {/* START card- */}

                <div className="card">
                    <Link to={{
                        pathname: "SpecieScreen",
                        state: { specieId: this.props.specieData.specieId }
                    }}>
                        <img className="img-fluid" src={this.props.specieData.specieProfilePicture.largeThumb} alt="Demo" />
                    </Link>
                    <div className="card-body">
                        <div className="row text-center">
                            <div className="col-4">
                                <p>Comments</p>
                                <h3 className="m-0 text-primary">700</h3>
                            </div>
                            <div className="col-4">
                                <p>Nom</p>
                                <h3 className="m-0 text-primary">{this.props.specieData.specieName}</h3>
                            </div>
                            <div className="col-4">
                                <p>Shots</p>
                                <h3 className="m-0 text-primary">300</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default SpecieWidget;

