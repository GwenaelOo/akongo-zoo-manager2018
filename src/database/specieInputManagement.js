import { Router, Route, Link, History, withRouter, Redirect } from 'react-router-dom';
import React from 'react';
import firebase from 'firebase';

// Gestion des espèces /// 

export function manageInputs(newOrder, newClass, newFamily) {

    console.log(newFamily)


    // initClasses(newClass)
    // initFamilies(newFamily)
    // initOrder(newOrder)
    getClassesList(newClass)
    getFamiliesList(newFamily)
    getOrdersList(newOrder)

}

// Gestion des listes d'ordres

function getOrdersList(order) {
    return firebase.database().ref('/inputLists/ordersList').once('value')
        .then(function (snapshot) {
            manageOrder(snapshot.val(), order)
        })
}

function manageOrder(ordersList, order) {

    if (order !== "") {

        for (let index = 0; index < ordersList.length; index++) {

            if (ordersList[index].label === order.label) {
                console.log('osef')
            }
            else {
                ordersList.push(order)

                firebase.database().ref('/inputLists/').update({
                    ['ordersList']: ordersList
                })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
                return
            }

        }

    }
}

function initOrder(order) {


    let ordersList = []
    ordersList.push(order)

    console.log(ordersList)

    firebase.database().ref('/inputLists/').update({
        ordersList
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

// Gestion des listes de classe


function getClassesList(newClass) {
    return firebase.database().ref('/inputLists/classesList').once('value')
        .then(function (snapshot) {
            manageClasses(snapshot.val(), newClass)
        })
}

function manageClasses(classesList, newClass) {

    if (newClass === '') {
        return
    }


    for (let index = 0; index < classesList.length; index++) {

        if (classesList[index].label === newClass.label) {
            console.log('osef')
        }
        else {

            classesList.push(newClass)

            firebase.database().ref('/inputLists/').update({
                ['classesList']: classesList
            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            return
        }

    }
}

function initClasses(newClass) {

    let classesList = []
    classesList.push(newClass)

    console.log(classesList)

    firebase.database().ref('/inputLists/').set({
        classesList
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

// Gestion des listes de classe


function getFamiliesList(newFamily) {
    return firebase.database().ref('/inputLists/familiesList').once('value')
        .then(function (snapshot) {
            manageFamilies(snapshot.val(), newFamily)
        })
}

function manageFamilies(familiesList, newFamily) {

    if (newFamily === '') {
        return
    }

    for (let index = 0; index < familiesList.length; index++) {

        if (familiesList[index].label === newFamily.label) {
            console.log('osef')
        }
        else {
            familiesList.push(newFamily)

            firebase.database().ref('/inputLists/').update({
                ['familiesList']: familiesList
            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            return
        }

    }
}

function initFamilies(newFamily) {

    let familiesList = []
    familiesList.push(newFamily)

    console.log(familiesList)

    firebase.database().ref('/inputLists/').update({
        familiesList
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

