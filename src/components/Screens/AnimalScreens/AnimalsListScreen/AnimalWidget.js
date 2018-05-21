import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class AnimalWidget extends React.Component {

    render() {
        return (
            <div className="col-xl-4">
                <div className="card">
                    <div className="card-body text-center bg-center" style={{ opacity: 0.9, backgroundImage: `url(${this.props.animalEnclosurePhoto})` }}>
                        <div className="row">
                            <div className="col-12 text-white">
                                <img className="img-thumbnail circle thumb128" src="img/user/06.jpg" alt="Demo" />
                                <h3 className="m-0">Chris</h3>
                                <p className="m-0">
                                    <em className="fa fa-twitter fa-fw"></em>@chris</p>
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
                            <span className="badge badge-primary float-right">15</span>
                            <em className="fa fa-fw fa-clock-o text-muted"></em>Recent Activity</a>
                        <a className="list-group-item" href="">
                            <span className="badge badge-primary float-right">100</span>
                            <em className="fa fa-fw fa-user text-muted"></em>Following</a>
                        <a className="list-group-item" href="">
                            <span className="badge badge-primary float-right">300</span>
                            <em className="fa fa-fw fa-folder-open-o text-muted"></em>Photos</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnimalWidget;








// var animals = [];
            // for (var i = 0; i < this.state.speciePhotos.length; i++) {
            //     animals.push(

