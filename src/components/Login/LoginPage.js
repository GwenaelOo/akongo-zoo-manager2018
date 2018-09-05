import React, { Component } from 'react';
import { Router, Route, Link, History, Redirect, } from 'react-router-dom';
import swal from 'sweetalert';
import firebase from 'firebase';
import nav from '../../Nav/Nav'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            url: 'http://www.akongo.fr/assets/background/Background-',
            email: 'gwenael.leroutier@gmail.com',
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

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {

            swal({
                title: "Mot de passe incorrect!",
                text: "Veuillez réesayer",
                type: "warning",
                timer: 1000,
                showCancelButton: false
            }, function () {
                // Redirect the user
               // window.location.href = nav.akongoURL + '';
            })

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('logged')
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                window.location.href = nav.akongoURL + 'lock';

            } else {
            }
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
                'position':'fixed'
            }}>
                <div className="block-center mt-4 wd-xl">
                    <div className="card card-flat">
                        <div className="card-header text-center bg-dark">
                            <a href="">
                                <img className="block-center rounded" src="http://www.akongo.eu/assets/img/logo/bravana-default.png" alt="Logo" />
                            </a>
                        </div>
                        <div className="card-body">
                            <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                            <form className="mb-3" id="LoginForm" noValidate>
                                <div className="form-group">
                                    <div className="input-group with-focus">
                                        <input className="form-control border-right-0" id="exampleInputEmail1" type="email" placeholder="Enter email" autoComplete="off" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                                        <div className="input-group-append">
                                            <span className="input-group-text fa fa-envelope text-muted bg-transparent border-left-0"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group with-focus">
                                        <input className="form-control border-right-0" id="exampleInputPassword1" type="password" placeholder="password" name="password " value={this.state.password} onChange={this.handlePasswordChange} required />
                                        <div className="input-group-append">
                                            <span className="input-group-text fa fa-lock text-muted bg-transparent border-left-0"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix">
                                    <div className="checkbox c-checkbox float-left mt-0">
                                        <label>
                                            <input type="checkbox" value="" name="remember" />
                                            <span className="fa fa-check"></span>Remember Me</label>
                                    </div>
                                    <div className="float-right">
                                        <Link to="recover" className="text-muted">Forgot your password?</Link>
                                    </div>
                                </div>
                                <button className="btn btn-block btn-primary mt-3" type="button" onClick={this.handleClick}>Login</button>
                            </form>
                            <p className="pt-3 text-center">Need to Signup?</p>
                            <Link to="register" className="btn btn-block btn-secondary">Register Now</Link>
                        </div>
                    </div>
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

export default Login;
