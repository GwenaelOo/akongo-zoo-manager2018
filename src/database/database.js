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

    let specieUID = specieData.specieName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
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
        specieDescription: specieData.specieDescription,
        specieGestation: specieData.specieGestation,
        specieWeight: specieData.specieWeight,
        specieLifeExpectancy: specieData.specieLifeExpectancy,
        specieFood: specieData.specieFood,
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
                text: "L'espèce " + specieData.specieName + " a été ajoutée à votre Zoo",
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


export function addNewEnclosureToDatabase(enclosureData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let enclosureUID = enclosureData.enclosureName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
    let reference = (userData.zooName + '/enclosuresData/' + enclosureUID);

    if (enclosureData.enclosureProfilePicture === '') {
        enclosureData.enclosureProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
    }

    firebase.database().ref(reference).set({
        dataVersion: 1,
        enclosureId: enclosureUID,
        enclosureName: enclosureData.enclosureName,
        enclosureSpeciesList: enclosureData.enclosureSpeciesList,
        enclosureDescription: enclosureData.enclosureDescription,
        enclosurePhotoProfile: enclosureData.enclosurePhotoProfile,
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
                window.location.href = nav.akongoURL + 'enclosuresList';
            })
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

export function editSpecieInDatabase(specieData) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let reference = (userData.zooName + '/speciesData/' + specieData.specieId);

    if (specieData.specieProfilePicture === '') {
        specieData.specieProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
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
        specieIUCNClassification: specieData.specieIUCNClassification,
        specieDescription: specieData.specieDescription,
        specieGestation: specieData.specieGestation,
        specieWeight: specieData.specieWeight,
        specieLifeExpectancy: specieData.specieLifeExpectancy,
        specieFood: specieData.specieFood,
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
                text: "L'espèce " + specieData.specieName + " a été ajoutée à votre Zoo",
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

export function addNewAnimalToDatabase(animalData, specieId) {

    // ********************
    // Ajout dans firebase 
    // ********************

    let list

    console.log(specieId)

    let categorie = '/speciesData/'
    let id = specieId

    let reference = userData.zooName + categorie + id
    console.log(reference)

    firebase.database().ref(reference).once('value')
        .then(function (snapshot) {
            console.log('snapshot')
            let data = snapshot.val()
            if (data.specieAnimals != undefined) {
                list = data.specieAnimals
            } else {
                list = []
            }

        })
        .then(function () {
            console.log('vieux array')



            let animalUID = animalData.animalName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
            //let reference = (userData.zooName + '/speciesData/'+ eval(specieId) + '/speciesAnimal');


            if (animalData.animalProfilePicture === '') {
                animalData.animalProfilePicture = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
            }

            let newAnimal = {
                dataVersion: 1,
                animalId: animalUID,
                animalName: animalData.animalName,
                animalLatinName: animalData.animalLatinName,
                animalEnglishName: animalData.animalEnglishName,
                animalClass: animalData.animalClass,
                animalOrder: animalData.animalOrder,
                animalFamilly: animalData.animalFamilly,
                animalIUCNClassification: animalData.animalIUCNClassification,
                animalDescription: animalData.animalDescription,
                animalGestation: animalData.animalGestation,
                animalWeight: animalData.animalWeight,
                animalLifeExpectancy: animalData.animalLifeExpectancy,
                animalFood: animalData.animalFood,
                animalProfilePicture: animalData.animalProfilePicture,
                animalPhotos: animalData.animalPhotos,
                animalCreatedBy: userData.userId,
                animalCreationDate: Date(),
                dataType: 'animal',
                zooName: userData.zooName,
            }

            list.push(newAnimal)


            console.log('nouveau array')

            firebase.database().ref(reference).update({
                specieAnimals: list
            })
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
        //              dataType: 'animal',
        //              elementId: animalData.animalId,
        //              elementName: animalData.animalName,
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
                text: "L'espèce " + animalData.animalName + " a été ajoutée à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'animalsList';
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

