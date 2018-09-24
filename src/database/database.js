import { Router, Route, Link, History, withRouter, Redirect } from 'react-router-dom';
import React from 'react';

import firebase from 'firebase';
import swal from 'sweetalert';
import nav from '../Nav/Nav'
import RedirectTo from './RedirectTo';
import {manageInputs} from './specieInputManagement'


const userData = JSON.parse(localStorage.getItem('user'))


// Gestion des espèces /// 

export function addNewSpecieToDatabase(specieData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(specieData)
   
    manageInputs(specieData.specieOrder, specieData.specieClass, specieData.specieFamilly)

    let specieUID
    
    if (specieData.specieName.fr != null) {
        specieUID = specieData.specieName.fr.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    } else if (specieData.specieName.en != null) {
        specieUID = specieData.specieName.us.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    } else {
        specieUID = specieData.specieLatinName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    }

    let reference = (userData.zooName + '/speciesData/' + specieUID);
   
    if (specieData.specieProfilePicture === '') {
        specieData.specieProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        specieId: specieUID,
        specieName: specieData.specieName,
        specieLatinName: specieData.specieLatinName,
        specieEnglishName: specieData.specieEnglishName,
        specieClass: specieData.specieClass,
        specieOrder: specieData.specieOrder,
        specieFamilly: specieData.specieFamilly,
        specieIUCNClassification: specieData.specieIUCNClassification,
        specieThreat: specieData.specieThreat,
        specieDescription: specieData.specieDescription,
        specieGestation: specieData.specieGestation,
        specieWeight: specieData.specieWeight,
        specieLifeExpectancy: specieData.specieLifeExpectancy,
        specieEnclosure: specieData.specieEnclosure,
        specieFood: specieData.specieFood,
        specieProfilePicture: specieData.specieProfilePicture,
        speciePhotos: specieData.speciePhotos,
        specieCreatedBy: userData.userId,
        specieCreationDate: Date(),
        dataType: 'specie',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + specieData.specieName.fr + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                window.location.href = nav.akongoURL + 'SpecieListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function editSpecieInDatabase(specieData) {

    manageInputs(specieData.specieOrder, specieData.specieClass, specieData.specieFamilly)

    let reference = (userData.zooName + '/speciesData/' + specieData.specieId);
    let specieAnimals

    if (specieData.specieProfilePicture === '') {
        specieData.specieProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    if (specieData.specieAnimals === undefined) {
        specieAnimals = []
    } else {
        specieAnimals = specieData.specieAnimals
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        specieId: specieData.specieId,
        specieName: specieData.specieName,
        specieLatinName: specieData.specieLatinName,
        specieEnglishName: specieData.specieEnglishName,
        specieClass: specieData.specieClass,
        specieOrder: specieData.specieOrder,
        specieFamilly: specieData.specieFamilly,
        specieThreat: specieData.specieThreat,
        specieAnimals: specieAnimals,
        specieIUCNClassification: specieData.specieIUCNClassification,
        specieDescription: specieData.specieDescription,
        specieGestation: specieData.specieGestation,
        specieWeight: specieData.specieWeight,
        specieLifeExpectancy: specieData.specieLifeExpectancy,
        specieFood: specieData.specieFood,
        specieEnclosure: specieData.specieEnclosure,
        specieProfilePicture: specieData.specieProfilePicture,
        speciePhotos: specieData.speciePhotos,
        specieCreatedBy: userData.userId,
        specieCreationDate: Date(),
        dataType: 'specie',
        zooName: userData.zooName,
    })

        // ********************
        // Ecriture du log
        // ********************

        //  .then(function () {
        //      firebase.firestore()
        //          .collection(userData.zooName + '-log')
        //          .doc("log-" + Date.now())
        //          .set({
        //              action: "create",
        //              dataType: 'specie',
        //              elementId: specieData.SpecieId,
        //              elementName: specieData.SpecieName,
        //              actionMadeById: userData.userId,
        //              actionMadeByName: userData.firstname,
        //              actionDate: Date(),
        //              actionTimestamp: Date.now(),
        //              zooName: userData.zooName
        //          })
        //  })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + specieData.specieName.fr + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'SpecieListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function deleteSpecieFromDatabase(specieData) {

    let reference = userData.zooName + '/speciesData/' + specieData.specieId

    firebase.database().ref(reference).remove()
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'individu " + specieData.specieName.fr + " a été correctement supprimé à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'SpecieListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

/// Gestion des animaux ///

export function addNewAnimalToDatabase(animalData, specieId) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let list
    let reference

    let animalUID = animalData.animalName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))


    if (animalData.animalProfilePicture === '') {
        animalData.animalProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    reference = userData.zooName + '/speciesData/' + specieId + '/specieAnimals/' + animalUID

    console.log(reference)

    firebase.database().ref(reference).set({
        dataVersion: 1,
        animalId: animalUID,
        animalName: animalData.animalName,
        animalAge: animalData.animalAge,
        animalSex: animalData.animalSex,
        animalBiography: animalData.animalBiography,
        animalSpecieName: animalData.animalSpecieName,
        animalProfilePicture: animalData.animalProfilePicture,
        animalPhotoEnclosure: animalData.animalPhotoEnclosure,
        animalPhotos: animalData.animalPhotos,
        animalSponsors: animalData.animalSponsors,
        animalPopularity: animalData.animalPopularity,
        specieId: specieId,
        animalCreatedBy: userData.userId,
        animalCreationDate: Date(),
        dataType: 'animal',
        zooName: userData.zooName,
    })
        //})

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'individu " + animalData.animalName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'SpecieListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function editAnimaleInDatabase(animalData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(animalData)

    let reference = userData.zooName + '/speciesData/' + animalData.specieId + '/specieAnimals/' + animalData.animalId

    console.log(reference)


    firebase.database().ref(reference).set({
        dataVersion: 1,
        animalId: animalData.animalId,
        animalName: animalData.animalName,
        animalAge: animalData.animalAge,
        animalSex: animalData.animalSex,
        animalBiography: animalData.animalBiography,
        animalSpecieName: animalData.animalSpecieName,
        animalProfilePicture: animalData.animalProfilePicture,
        animalPhotoEnclosure: animalData.animalPhotoEnclosure,
        animalPhotos: animalData.animalPhotos,
        animalSponsors: animalData.animalSponsors,
        animalPopularity: animalData.animalPopularity,
        specieId: animalData.specieId,
        animalCreatedBy: userData.userId,
        animalCreationDate: Date(),
        dataType: 'animal',
        zooName: userData.zooName,
    })

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + animalData.animalName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'SpecieListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function deleteAnimalFromDatabase(animalData) {


    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(animalData)

    let reference = userData.zooName + '/speciesData/' + animalData.specieId + '/specieAnimals/' + animalData.animalId

    console.log(reference)


    firebase.database().ref(reference).remove()
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'individu " + animalData.animalName + " a été correctement supprimé à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'SpecieListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

/// Gestion des enclos ///

export function addNewEnclosureToDatabase(enclosureData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let enclosureUID = enclosureData.enclosureName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/enclosuresData/' + enclosureUID);

    console.log(enclosureData.enclosurePhotos)

    if (enclosureData.enclosureProfilePicture === '') {
        enclosureData.enclosureProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        enclosureId: enclosureUID,
        enclosureName: enclosureData.enclosureName,
        enclosureSpeciesList: enclosureData.enclosureSpeciesList,
        enclosureDescription: enclosureData.enclosureDescription,
        enclosureProfilePicture: enclosureData.enclosureProfilePicture,
        enclosureWishListStatus: enclosureData.enclosureWishListStatus,
        enclosureWishListURL: enclosureData.enclosureWishListURL,
        enclosureWishListDescription: enclosureData.enclosureWishListDescription,
        enclosurePhotos: enclosureData.enclosurePhotos,
        enclosureCreatedBy: userData.userId,
        enclosureCreationDate: Date(),
        dataType: 'enclosure',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'enclos " + enclosureData.enclosureName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'EnclosureList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function editEnclosureInDatabase(enclosureData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let reference = (userData.zooName + '/enclosuresData/' + enclosureData.enclosureId);

    if (enclosureData.enclosureProfilePicture === '') {
        enclosureData.enclosureProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    console.log(enclosureData)

    firebase.database().ref(reference).update({
        dataVersion: 1,
        enclosureId: enclosureData.enclosureId,
        enclosureName: enclosureData.enclosureName,
        enclosureSpeciesList: enclosureData.enclosureSpeciesList,
        enclosureDescription: enclosureData.enclosureDescription,
        enclosureProfilePicture: enclosureData.enclosureProfilePicture,
        enclosureWishListStatus: enclosureData.enclosureWishListStatus,
        enclosureWishListURL: enclosureData.enclosureWishListURL,
        enclosureWishListDescription: enclosureData.enclosureWishListDescription,
        enclosurePhotos: enclosureData.enclosurePhotos,
        enclosureCreatedBy: userData.userId,
        enclosureCreationDate: Date(),
        dataType: 'enclosure',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + enclosureData.enclosureName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'EnclosureList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function deleteEnclosureInDatabase(enclosureData) {


    let reference = (userData.zooName + '/enclosuresData/' + enclosureData.enclosureId);

    firebase.database().ref(reference).remove()
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'enclos " + enclosureData.enclosureName + " a été correctement supprimé à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'EnclosureList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

/// Gestion des dons ///

export function saveDonationSetupToDatabase(donationData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let reference = (userData.zooName + '/donationData/');

    firebase.database().ref(reference).set({
        dataVersion: 1,
        donationURL: donationData.donationURL,
        donationCreatedBy: userData.userId,
        donationCreationDate: Date(),
        dataType: 'donation',
        zooName: userData.zooName,
    })


        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "La configuration du don a été correctement réalisée",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'speciesList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

/// Gestion des animations ///

export function addNewAnimationToDatabase(animationData) {

    let animationUID = animationData.animationName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/animationsData/' + animationUID);

    if (animationData.animationProfilePicture === '') {
        animationData.animationProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        animationId: animationUID,
        animationProfilePicture: animationData.animationProfilePicture,
        animationDescription: animationData.animationDescription,
        animationPhotos: animationData.animationPhotos,
        animationName: animationData.animationName,
        animationStartTime: animationData.animationStartTime,
        dataType: 'animation',
        zooName: userData.zooName,
    })

        // ********************
        // Ecriture du log
        // ********************

        //  .then(function () {
        //      firebase.firestore()
        //          .collection(userData.zooName + '-log')
        //          .doc("log-" + Date.now())
        //          .set({
        //              action: "create",
        //              dataType: 'animation',
        //              elementId: animationData.animationId,
        //              elementName: animationData.animationName,
        //              actionMadeById: userData.userId,
        //              actionMadeByName: userData.firstname,
        //              actionDate: Date(),
        //              actionTimestamp: Date.now(),
        //              zooName: userData.zooName
        //          })
        //  })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + animationData.animationName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function (nextState, replaceState) {
                //Redirect the user
                window.location.href = nav.akongoURL + 'AnimationsListScreen';        
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function editAnimationInDatabase(animationData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let reference = (userData.zooName + '/animationsData/' + animationData.animationId);

    if (animationData.animationProfilePicture === '') {
        animationData.animationProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        animationId: animationData.animationId,
        animationProfilePicture: animationData.animationProfilePicture,
        animationDescription: animationData.animationDescription,
        animationPhotos: animationData.animationPhotos,
        animationName: animationData.animationName,
        animationStartTime: animationData.animationStartTime,
        dataType: 'animation',
        zooName: userData.zooName,
    })

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + animationData.animationName + " a été correctement editée",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'AnimationsListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function deleteAnimationInDatabase(animationData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let reference = (userData.zooName + '/animationsData/' + animationData.animationId);

    firebase.database().ref(reference).remove()

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + animationData.animationName + " a été correctement supprimée",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'animationsList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

/// Gestion des évènements ///

export function addNewEventToDatabase(eventData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(eventData.eventName)

    let eventUID = eventData.eventName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/eventsData/' + eventUID);

    if (eventData.eventProfilePicture === '') {
        eventData.eventProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        eventId: eventUID,
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        eventProfilePicture: eventData.eventProfilePicture,
        eventPhotos: eventData.eventPhotos,
        eventDateTime: eventData.eventDateTime,

        dataType: 'event',
        zooName: userData.zooName,
    })

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + eventData.eventName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'EventsListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function editEventInDatabase(eventData) {

    let reference = (userData.zooName + '/eventsData/' + eventData.eventId);

    if (eventData.eventProfilePicture === '') {
        eventData.eventProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        eventId: eventData.eventId,
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        eventProfilePicture: eventData.eventProfilePicture,
        eventPhotos: eventData.eventPhotos,
        eventDateTime: eventData.eventDateTime,
        dataType: 'event',
        zooName: userData.zooName,
    })

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'évenement " + eventData.eventName + " a été correctement éditée",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'EventsListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function deleteEventInDatabase(eventData) {

    let reference = (userData.zooName + '/eventsData/' + eventData.eventId);

    if (eventData.eventProfilePicture === '') {
        eventData.eventProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).remove()

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'évenement " + eventData.eventName + " a été correctement supprimée",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'EventsList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

/// Gestion des services ///

export function addNewServiceToDatabase(serviceData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(serviceData.serviceName)

    let serviceUID = serviceData.serviceName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/servicesData/' + serviceUID);

    if (serviceData.serviceProfilePicture === '') {
        serviceData.serviceProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        serviceId: serviceUID,
        serviceProfilePicture: serviceData.serviceProfilePicture,
        serviceDescription: serviceData.serviceDescription,
        servicePhotos: serviceData.servicePhotos,
        serviceName: serviceData.serviceName,
        serviceType: serviceData.serviceType,
        serviceOpeningTime: serviceData.serviceOpeningTime,
        serviceClosingTime: serviceData.serviceClosingTime,
        dataType: 'service',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'espèce " + serviceData.serviceName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function editServiceInDatabase(serviceData) {

    let reference = (userData.zooName + '/servicesData/' + serviceData.serviceId);

    if (serviceData.serviceProfilePicture === '') {
        serviceData.serviceProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        serviceId: serviceData.serviceId,
        serviceProfilePicture: serviceData.serviceProfilePicture,
        serviceDescription: serviceData.serviceDescription,
        servicePhotos: serviceData.servicePhotos,
        serviceName: serviceData.serviceName,
        serviceType: serviceData.serviceType,
        serviceOpeningTime: serviceData.serviceOpeningTime,
        serviceClosingTime: serviceData.serviceClosingTime,
        dataType: 'service',
        zooName: userData.zooName,
    })

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "Le service " + serviceData.serviceName + " a été correctement édité",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function deleteServiceInDatabase(serviceData) {


    let reference = (userData.zooName + '/servicesData/' + serviceData.serviceId);

    firebase.database().ref(reference).remove()

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "Le service " + serviceData.serviceName + " a été correctement supprimé",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'servicesList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

/// Gestion des services ///

export function addNewArticleToDatabase(articleData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(userData)

    let articleUID = articleData.articleTitle.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/articlesData/' + articleUID);

    if (articleData.articleProfilePicture === '') {
        articleData.articleProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        articleId: articleUID,
        //articleProfilePicture: articleData.articleProfilePicture,
        articleTitle: articleData.articleTitle,
        articleContentHTML: articleData.articleContentHTML,
        articleCreatedBy: userData.userId,
        articleCreatedByNameToDisplay: userData.firstname,
        articleCreationDate: Date(),
        articleCategories: articleData.articleCategories,
        articleTags: articleData.articleTags,
        articleReviewer: articleData.articleReviewer,
        articleEnclosureList : articleData.articleEnclosureList,
        articleStatus: articleData.articleStatus,
        dataType: 'article',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'article " + articleData.articleTitle + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function editArticleInDatabase(articleData) {

       // ********************
    // Ajout dans firebase 
    // ********************

    console.log(articleData)

    let reference = (userData.zooName + '/articlesData/' + articleData.articleId);

    if (articleData.articleProfilePicture === '') {
        articleData.articleProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        articleId: articleData.articleId,
        //articleProfilePicture: articleData.articleProfilePicture,
        articleTitle: articleData.articleTitle,
        articleContentHTML: articleData.articleContentHTML,
        articleCreatedBy: userData.userId,
        articleCreatedByNameToDisplay: userData.firstname,
        articleCreationDate: Date(),
        articleCategories: articleData.articleCategories,
        articleTags: articleData.articleTags,
        articleReviewer: articleData.articleReviewer,
        articleEnclosureList :articleData.articleEnclosureList,
        articleStatus: articleData.articleStatus,
        dataType: 'article',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'article " + articleData.articleTitle + " a été correctement édité à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function deleteArticleFromDatabase(articleData) {

    let reference = (userData.zooName + '/articlesData/' + articleData.articleId);

    firebase.database().ref(reference).remove()

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'article " + articleData.articleTitle + " a été correctement supprimé",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'articlesList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        })


}

/// Gestion des services ///

export function addNewUserToDatabase(userData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let userUID = userData.userLastname.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/users/' + userUID);

    if (userData.userProfilePicture === '') {
        userData.userProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        userId: userUID,
        userFirstName: userData.userFirstName,
        userLastname: userData.userLastname,
        userBirthday: userData.userBirthday,
        userBiography: userData.userBiography,
        userPassword: userData.userPassword,

        userFacebook: userData.userFacebook,
        userLinkedin: userData.userLinkedin,
        userTwitter: userData.userTwitter,
        userSnapchat: userData.userSnapchat,

        userProfilePicture: userData.userProfilePicture,

        dataType: 'user',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'utilisateur " + userData.userName + '' + userData.userLastname + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function editUserInDatabase(userInfos) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(userInfos)

    let reference = (userData.zooName + '/usersInfos/' + userInfos.userId);

    if (userInfos.userProfilePicture === '') {
        userInfos.userProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        userId: userInfos.userId,
        userFirstname: userInfos.userFirstname,
        userLastname: userInfos.userLastname,
        userBirthday: userInfos.userBirthday,
        userBiography: userInfos.userBiography,
        userPassword: userInfos.userPassword,

        userFacebook: userInfos.userFacebook,
        userLinkedin: userInfos.userLinkedin,
        userTwitter: userInfos.userTwitter,
        userInstagram: userInfos.userInstagram,
        userSnapchat: userInfos.userSnapchat,

        userProfilePicture: userInfos.userProfilePicture,

        dataType: 'user',
        zooName: userData.zooName,
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'utilisateur " + userInfos.userFirstname + ' ' + userInfos.userLastname + " a été correctement édité à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}

export function deleteUserFromDatabase(articleData) {

    let reference = (userData.zooName + '/articlesData/' + articleData.articleId);

    firebase.database().ref(reference).remove()

        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "L'article " + articleData.articleTitle + " a été correctement supprimé",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'articlesList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        })


}

// Gestion des formations 

export function addNewCourseDateToDatabase(courseData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let courseUID = (Math.floor(Date.now() / 1000))
    let reference = ('/courses/coursesPlanning/' + courseUID);

    firebase.database().ref(reference).set({
        selectedCourse: courseData.selectedCourse,
        selectedPlace: courseData.selectedPlace,
        capacity: courseData.capacity,
        dateTime: courseData.dateTime,
        courseId: courseData.courseId,
        placeId: courseData.placeId
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        }).then(function () {
            swal({
                title: "Good job!",
                text: "La formation a été crée et est disponible sur akongo.fr",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'ServicesListScreen';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}



