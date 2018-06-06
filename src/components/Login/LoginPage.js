import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Router, Route, Link, History, Redirect, } from 'react-router-dom';
import firebase from 'firebase';
import nav from '../../Nav/Nav'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    this.state =({
        url: 'http://www.akongo.fr/assets/background/Background-',
        email: 'gwenael.leroutier@gmail.com',
        password: ''
    });
        this.handleInputChange = this.handleInputChange.bind(this);   
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleInputChange(event) {
        let name = event.target.name
        this.setState({ [name]: event.target.value });
        console.log(this.state.email, this.state.password)   
    }

    handleClick(){



        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
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
                // User is signed out.
                // ...
            }
        });
       
    }

    generateRandomBackground(){
        let imageNumber = Math.floor(Math.random() * 3) + 1,
            newUrl = this.state.url + imageNumber + '.jpg'
        this.setState({
            url: newUrl
        })

    }

    signout(){
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            //storage.removeItem('user');
            console.error('Sign Out Error', error);
        });
    }

    componentWillMount(){
        console.log(nav)
        this.signout()
        this.generateRandomBackground();
       
    }
    render() {
        console.log('v0.0.1')
        return (
            <div style={{
                'padding-top': '-100px',
                'height': '745px',
                'margin-top': '-40px',
                'backgroundImage': `url(${this.state.url})`
            }}>
            
            <div className="block-center mt-xl wd-xl">
                { /* START panel */}
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <Link to="Dashboard">
                            <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                        </Link>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                                <form role="form" data-parsley-validate="" noValidate className="mb-lg">
                            <div className="form-group has-feedback">
                                    <input id="exampleInputEmail1" type="email" placeholder="Enter email" autoComplete="off" required="required" name="email" className="form-control" value={this.state.email} onChange={this.handleInputChange} />
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                    <input id="exampleInputPassword1" type="password" placeholder="Password" required="required" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="clearfix">
                                <div className="checkbox c-checkbox pull-left mt0">
                                    <label>
                                        <input type="checkbox" value="" name="remember" />
                                        <em className="fa fa-check"></em>Remember Me</label>
                                </div>
                                <div className="pull-right">
                                    <Link to="recover" className="text-muted">Forgot your password?</Link>
                                </div>
                            </div>   
                        </form>
                            <button onClick={this.handleClick} className="btn btn-block btn-primary mt-lg">Login</button>
                    </div>
                </div>
                { /* END panel */}
            </div>
        </div>
        );
    }

}

export default LoginPage;