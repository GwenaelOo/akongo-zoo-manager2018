import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Router, Route, Link, History } from 'react-router-dom';
import firebase from 'firebase';
import nav from '../../Nav/Nav';


class InitialLoading extends React.Component {
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
                    console.log('Zoo du user logué : ' + userInfos.zooName);
                   
                    let dataToStore = {
                        userId: user.uid,
                        city: userInfos.city,
                        zooName: userInfos.zooName,
                        firstname: userInfos.firstname,
                        zooNameDisplay: userInfos.zooNameDisplay,
                        logged: true
                    }

                    localStorage.setItem('user', JSON.stringify(dataToStore))

                }, function (error) {
                    console.error(error);
                }).then(function (valeur) {
                    
                   // window.location.href = nav.akongoURL + 'dashboard';
                }, function (raison) {
                    // Rejet de la promesse
                });
            }
        })
    }

   
    componentDidMount() {

        alert('omg')
        
        this.initUser()    
    }
    
    render() {
        return (
            <div>
              
            </div>
        );
    }
}

export default InitialLoading;