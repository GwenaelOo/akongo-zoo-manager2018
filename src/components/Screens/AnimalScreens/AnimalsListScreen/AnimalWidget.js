import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class AnimalWidget extends React.Component {

    render() {
        return (
            <div className="col-xl-4">
                <div className="card">
                <Link to={{
                        pathname: "AnimalScreen",
                        state: { animalId: this.props.animalData.animalId,
                            specieId: this.props.animalData.specieId,
                         }
                    }}>
                    <div className="card-body text-center bg-center" style={{ opacity: 0.7, backgroundImage: `url(${this.props.animalData.animalPhotoEnclosure.largeThumb})` }}>
                        <div className="row">
                            <div className="col-12 text-white">
                                <img className="img-thumbnail circle thumb128" src={this.props.animalData.animalProfilePicture.largeThumb} alt="Demo" />
                                <h3 className="m-0">{this.props.animalData.animalName}</h3>
                                <p className="m-0">
                                    <em className="fa fa-twitter fa-fw"></em></p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-center bg-gray-darker">
                        <div className="row">
                            <div className="col-4">
                                <a className="text-white" href="">
                                    <em className="fa fa-twitter fa-2x"></em>
                                </a>
                            </div>
                            <div className="col-4">
                                <a className="text-white" href="">
                                    <em className="fa fa-facebook fa-2x"></em>
                                </a>
                            </div>
                            <div className="col-4">
                                <a className="text-white" href="">
                                    <em className="fa fa-comments fa-2x"></em>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="list-group">
                        <a className="list-group-item" href="">
                            <span className="badge badge-primary float-right">{this.props.animalData.animalPhotos.length}</span>
                            <em className="fa fa-fw fa-image text-muted"></em> Photos dans la gallerie de l'individu</a>
                        <a className="list-group-item" href="">
                            <span className="badge badge-primary float-right">{this.props.animalData.animalPopularity.popularity}</span>
                            <em className="fa fa-fw fa-image text-muted"></em> Popularité de l'animal</a>
                        <a className="list-group-item" href="">
                            <span className="badge badge-primary float-right">{this.props.animalData.animalSponsors.sponsors}</span>
                            <em className="fa fa-fw fa-image text-muted"></em> Parrains de l'animal</a>
                    </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AnimalWidget;








// var animals = [];
            // for (var i = 0; i < this.state.speciePhotos.length; i++) {
            //     animals.push(

