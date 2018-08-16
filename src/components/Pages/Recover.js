import React, { Component } from 'react';
import { Router, Route, Link, History, Redirect, } from 'react-router-dom';
import firebase from 'firebase';
import swal from 'sweetalert';
import nav from '../../Nav/Nav'

class Recover extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            url: 'http://www.akongo.fr/assets/background/Background-',
            email: '',
            password: ''
        });
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleInputChange(event) {
        console.log(event.target.value)
        let name = event.target.name
        console.log(name)
        // this.setState({ [name]: event.target.value });
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.email, this.state.password)
    }

    handlePasswordChange(event) {
        console.log(event.target.value)
        let name = event.target.name
        console.log(name)
        // this.setState({ [name]: event.target.value });
        this.setState({ password: event.target.value });
        console.log(this.state.email, this.state.password)
    }

    handleClick() {

        var auth = firebase.auth();
        var emailAddress = "user@example.com";

        firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
            // Email sent.

            swal({
                title: "Good job!",
                text: "Un email vous a été envoué",
                type: "success",
                showCancelButton: false
            }, function (nextState, replaceState) {
                //Redirect the user
                window.location.href = nav.akongoURL + 'LoginPage';        
            })


        }).catch(function (error) {
            // An error happened.
        });
    }

    generateRandomBackground() {
        let imageNumber = Math.floor(Math.random() * 3) + 1,
            newUrl = this.state.url + imageNumber + '.jpg'
        this.setState({
            url: newUrl
        })

    }

    signout() {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            //storage.removeItem('user');
            console.error('Sign Out Error', error);
        });
    }

    componentWillMount() {
        console.log(nav)
        this.signout()
        this.generateRandomBackground();

    }

    render() {
        return (
            <div style={{
                'height': '100%',
                'width': '100%',
                'overflow': 'hidden',
                'backgroundImage': `url(${this.state.url})`,
                'position': 'fixed'
            }}>
                <div className="block-center mt-4 wd-xl">
                    {/* START card */}
                    <div className="card card-flat">
                        <div className="card-header text-center bg-dark">
                            <a href="">
                                <img className="block-center rounded" src="img/logo.png" alt="Logo" />
                            </a>
                        </div>
                        <div className="card-body">
                            <p className="text-center py-2">PASSWORD RESET</p>
                            <form>
                                <p className="text-center">Fill with your mail to receive instructions on how to reset your password.</p>
                                <div className="form-group">
                                    <label className="text-muted" htmlFor="resetInputEmail1">Email address</label>
                                    <div className="input-group with-focus">
                                        <input className="form-control border-right-0" id="resetInputEmail1" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Enter email" autoComplete="off" />
                                        <div className="input-group-append">
                                            <span className="input-group-text fa fa-envelope text-muted bg-transparent border-left-0"></span>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-danger btn-block" type="button" onClick={this.handleClick}>Reset</button>
                            </form>
                        </div>
                    </div>
                    {/* END card */}
                    <div className="p-3 text-center">
                        <span className="mr-2">&copy;</span>
                        <span>2018</span>
                        <span className="mx-2">-</span>
                        <span>Angle</span>
                        <br />
                        <span>Bootstrap Admin Template</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recover;
