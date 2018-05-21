import firebase from 'firebase';
import swal from 'sweetalert';
import nav from '../Nav/Nav'

const userData = {
    zooName: 'AkongoFakeZoo',
    userId: 'Gwen'
}



export function addNewSpecieToDatabase(specieData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let specieUID = specieData.SpecieName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/speciesData/' + specieUID);

    if (specieData.SpecieProfilePicture === '') {
        specieData.SpecieProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        specieId: specieUID,
        specieName: specieData.SpecieName,
        specieLatinName: specieData.SpecieLatinName,
        specieEnglishName: specieData.SpecieEnglishName,
        specieClass: specieData.SpecieClass,
        specieOrder: specieData.SpecieOrder,
        specieFamilly: specieData.SpecieFamilly,
        specieIUCNClassification: specieData.SpecieIUCNClassification,
        specieDescription: specieData.SpecieDescription,
        specieGestation: specieData.SpecieGestation,
        specieWeight: specieData.SpecieWeight,
        specieLifeExpectancy: specieData.SpecieLifeExpectancy,
        specieFood: specieData.SpecieFood,
        specieProfilePicture: specieData.SpecieProfilePicture,
        speciePhotos: specieData.SpeciePhotos,
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
                text: "L'espèce " + specieData.SpecieName + " a été ajoutée à votre Zoo",
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

export function addNewAnimationToDatabase(animationData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    console.log(animationData)

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
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'animationsList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

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
    
        dataType: 'event',
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
        //              dataType: 'event',
        //              elementId: eventData.eventId,
        //              elementName: eventData.eventName,
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
                text: "L'espèce " + eventData.eventName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'eventsList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}


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
        dataType: 'service',
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
        //              dataType: 'service',
        //              elementId: serviceData.serviceId,
        //              elementName: serviceData.serviceName,
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
                text: "L'espèce " + serviceData.serviceName + " a été ajoutée à votre Zoo",
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

