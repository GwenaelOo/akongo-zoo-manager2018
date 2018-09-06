import { Router, Route, Link, History, withRouter, Redirect } from 'react-router-dom';
import React from 'react';
import firebase from 'firebase';

// Gestion des espèces /// 

export function manageInputs(newOrder, newClass, newFamilly) {


    // initClasses(newClass)
    // initFamilies(newFamilly)
    // initOrder(newOrder)
    getClassesList(newClass)
    getFamilliesList(newFamilly)
    getOrdersList(newOrder)

}

// Gestion des listes d'ordres

function getOrdersList(order) {
    return firebase.database().ref('/inputLists/ordersList').once('value')
        .then(function (snapshot) {
            if (snapshot.val() === null) {
                initOrder(order)
            } else {
                manageOrder(snapshot.val(), order)
            }

        })
}

function manageOrder(ordersList, order) {
    let detected = false

    for (let index = 0; index < ordersList.length; index++) { 
        if (ordersList[index].label === order.label) {
            detected = true
        }
    }

    if (detected === false) {
        order.id = Date.now()
        ordersList.push(order)

        firebase.database().ref('/inputLists/').update({
            ordersList
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        return
    }
}

function initOrder(order) {
    let ordersList = []
    ordersList.push(order)

    firebase.database().ref('/inputLists/').update({
        ordersList
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

// Gestion des listes de classe


function getClassesList(classe) {
    return firebase.database().ref('/inputLists/classesList').once('value')
        .then(function (snapshot) {
            if (snapshot.val() === null) {
                initClass(classe)
            } else {
                manageClass(snapshot.val(), classe)
            }

        })
}

function manageClass(classesList, classe) {
    let detected = false

    for (let index = 0; index < classesList.length; index++) { 
        if (classesList[index].label === classe.label) {
            detected = true
        }
    }

    if (detected === false) {
        classe.id = Date.now()
        classesList.push(classe)

        firebase.database().ref('/inputLists/').update({
            classesList
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        return
    }
}

function initClass(classe) {
    console.log(classe)
    let classesList = []
   // classe.id = Date.now()
    classesList.push(classe)

    firebase.database().ref('/inputLists/').update({
        classesList
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}


// Gestion des listes de Familles


function getFamilliesList(familly) {
    return firebase.database().ref('/inputLists/familliesList').once('value')
        .then(function (snapshot) {
            if (snapshot.val() === null) {
                initFamilly(familly)
            } else {
                manageFamillies(snapshot.val(), familly)
            }

        })
}

function manageFamillies(familliesList, familly) {
    let detected = false

    for (let index = 0; index < familliesList.length; index++) { 
        if (familliesList[index].label === familly.label) {
            detected = true
        }
    }

    if (detected === false) {
        familly.id = Date.now()
        familliesList.push(familly)

        firebase.database().ref('/inputLists/').update({
            familliesList
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        return
    }
}

function initFamilly(familly) {

    console.log(familly)
    let familliesList = []
    //familly.id = Date.now()
    familliesList.push(familly)

    console.log(familliesList)
    firebase.database().ref('/inputLists/').update({
        familliesList
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}
