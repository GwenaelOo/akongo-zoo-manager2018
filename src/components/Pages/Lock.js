import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import nav from '../../Nav/Nav';


class Lock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    initUser() {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.uid, 'logged')
                
                var self = this;
                var ref = firebase.database().ref('users/' + user.uid);
            
                ref.once('value').then(function (snapshot) {
                    let userInfos = snapshot.val();
                    console.log(userInfos)
                    console.log('Zoo du user logué : ' + userInfos.zooName);

                    let dataToStore = {
                        userId: user.uid,
                        userProfilePicture: userInfos.userProfilePicture,
                        city: userInfos.city,
                        zooName: userInfos.zooName,
                        firstname: userInfos.firstname,
                        zooNameDisplay: userInfos.zooNameDisplay,
                        logged: true
                    }

                    localStorage.setItem('user', JSON.stringify(dataToStore))

                }, function (error) {
                    console.error(error);
                })
                    .then(function (valeur) {
                        window.location.href = nav.akongoURL + 'dashboard';
                    }, function (raison) {
                        // Rejet de la promesse
                    })
            }
        })
    }



    componentDidMount() {
        this.initUser()
    }



    render() {
        return (
            <div className="abs-center wd-xl">
                <div className="d-flex justify-content-center">
                    <div className="p-2">
                        <img className="img-fluid img-thumbnail rounded-circle" src="img/user/02.jpg" alt="Avatar" width="60" height="60" />
                    </div>
                </div>
                <div className="card b0">
                    <div className="card-body">
                        <p className="text-center">Chargement de votre espace personnel.</p>
                        <form>
                            <div className="form-group">
                                <div className="input-group with-focus">


                                </div>
                            </div>
                            <div className="d-flex">

                            </div>
                        </form>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2018</span>
                    <span className="mx-2">-</span>
                    <span>AKONGO TECHNOLOGIE</span>
                    <br />
                    <span></span>
                </div>
            </div>
        );
    }
}

export default Lock;

