import firebase from 'firebase';
import swal from 'sweetalert';
// récupération config

var config = require("../../config/config");
const nav = require("../Nav/Nav");

// Init dataBase

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

// init zoo Id

     let userData = JSON.parse(localStorage.getItem('user'))
      
        
module.exports = {

     addNewSpecieToDatabase2: function (specieData) {

        // ********************
        // Ajout dans firebase 
        // ********************

         let specieUID = specieData.SpecieName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
         let reference = (userData.zooName + '/speciesData/' + specieUID);
         
         if (specieData.SpeciePhotoProfil === '') {
             specieData.SpeciePhotoProfil = 'http://thedroideffect.com/wp-content/themes/thedroideffect/images/missing-image-640x360.png'
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
                     specieProfilePicture: specieData.SpeciePhotoProfil,
                     speciePhotos: specieData.SpeciePhotos,
                     specieCreatedBy: userData.userId,
                     specieCreationDate: Date(),
                     dataType: 'specie',
                     zooName: userData.zooName,
            })
        
        // ********************
        // Ajout dans firestore 
        // ********************


         //let collection = (userData.zooName + '-species');
         //let document = specieData.SpecieName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
         //let specieId = document


         /* firebase.firestore()
             .collection(collection)
             .doc(document)
             .set({
                 SpecieId: specieId,
                 SpecieName: specieData.SpecieName,
                 SpecieLatinName: specieData.SpecieLatinName,
                 SpecieEnglishName: specieData.SpecieEnglishName,
                 SpecieClass: specieData.SpecieClass,
                 SpecieOrder: specieData.SpecieOrder,
                 SpecieFamilly: specieData.SpecieFamilly,
                 SpecieIUCNClassification: specieData.SpecieIUCNClassification,
                 SpecieDescription: specieData.SpecieDescription,
                 SpecieGestation: specieData.SpecieGestation,
                 SpecieWeight: specieData.SpecieWeight,
                 SpecieLifeExpectancy: specieData.SpecieLifeExpectancy,
                 SpecieFood: specieData.SpecieFood,
                 SpeciePhotoProfil: specieData.SpeciePhotoProfil,
                 SpeciePhoto1: specieData.SpeciePhoto1,
                 SpeciePhoto2: specieData.SpeciePhoto2,
                 SpeciePhoto3: specieData.SpeciePhoto3,
                 SpeciePhoto4: specieData.SpeciePhoto4,
                 SpecieCreatedBy: userData.userId,
                 SpecieCreationDate: Date(),
                 dataType: 'specie',
                 zooName: userData.zooName,
             }) */

             // ********************
             // Ecriture du log
             // ********************

             .then(function () {
                 firebase.firestore()
                     .collection(userData.zooName + '-log')
                     .doc("log-" + Date.now())
                     .set({
                         action: "create",
                         dataType: 'specie',
                         elementId: specieData.SpecieId,
                         elementName: specieData.SpecieName,
                         actionMadeById: userData.userId,
                         actionMadeByName: userData.firstname,
                         actionDate: Date(),
                         actionTimestamp: Date.now(),
                         zooName: userData.zooName
                     })
             })
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


     },

      editNewSpecieToDatabase2: function (specieData) {

          // ********************
          // Ajout dans firebase 
          // ********************

          let reference = (userData.zooName + '/speciesData/' + specieData.specieId);

          firebase.database().ref(reference).update({
              dataVersion: specieData.dataVersion + 1,
              specieId: specieData.specieUID,
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
              specieProfilePicture: specieData.SpeciePhotoProfil,
              speciePhotos: specieData.SpeciePhotos,
              specieCreatedBy: userData.userId,
              specieCreationDate: Date(),
              dataType: 'specie',
              zooName: userData.zooName,
          })

          // ********************
          // Ajout dans FireStore 
          // ********************

          /* let collection = (userData.zooName + '-species');
          let document = specieData.SpecieId
          firebase.firestore()
              .collection(collection)
              .doc(document)
              .update({
                  SpecieId: specieData.SpecieId,
                  SpecieName: specieData.SpecieName,
                  SpecieLatinName: specieData.SpecieLatinName,
                  SpecieEnglishName: specieData.SpecieEnglishName,
                  SpecieClass: specieData.SpecieClass,
                  SpecieOrder: specieData.SpecieOrder,
                  SpecieFamilly: specieData.SpecieFamilly,
                  SpecieIUCNClassification: specieData.SpecieIUCNClassification,
                  SpecieDescription: specieData.SpecieDescription,
                  SpecieGestation: specieData.SpecieGestation,
                  SpecieWeight: specieData.SpecieWeight,
                  SpecieFood: specieData.SpecieFood,
                  SpecieLifeExpectancy: specieData.SpecieLifeExpectancy,
                  SpeciePhotoProfil: specieData.SpeciePhotoProfil,
                  SpeciePhoto1: specieData.SpeciePhoto1,
                  SpeciePhoto2: specieData.SpeciePhoto2,
                  SpeciePhoto3: specieData.SpeciePhoto3,
                  SpeciePhoto4: specieData.SpeciePhoto4,
                  SpecieLastModificationBy: userData.userId,
                  SpecieLastEditDate: Date()
              }) */

              // ********************
              // Ecriture du log
              // ********************
              .then(function () {
                  firebase.firestore()
                      .collection(userData.zooName + '-log')
                      .doc("log-" + Date.now())
                      .set({
                          action: "edit",
                          dataType: 'specie',
                          elementId: specieData.SpecieId,
                          elementName: specieData.SpecieName,
                          actionMadeById: userData.userId,
                          actionMadeByName: userData.firstname,
                          actionDate: Date(),
                          actionTimestamp: Date.now(),
                          zooName: userData.zooName
                      })
              })
              .then(function () {
                  swal({
                      title: "Good job!",
                      text: "L'espèce " + specieData.SpecieName + " a été correctement éditée",
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


      },

    

    editNewSpecieToDatabase: function (specieData) {

        console.log(specieData.SpecieId)

        // ********************
        // Ajout dans firebase 
        // ********************

        let collection = (userData.zooName + '-species');
        let document = specieData.SpecieId

        firebase.firestore()
            .collection(collection)
            .doc(document)
            .update({
                SpecieId: specieData.SpecieId,
                SpecieName: specieData.SpecieName,
                SpecieLatinName: specieData.SpecieLatinName,
                SpecieEnglishName: specieData.SpecieEnglishName,
                SpecieClass: specieData.SpecieClass,
                SpecieOrder: specieData.SpecieOrder,
                SpecieFamilly: specieData.SpecieFamilly,
                SpecieIUCNClassification: specieData.SpecieIUCNClassification,
                SpecieDescription: specieData.SpecieDescription,
                SpecieGestation: specieData.SpecieGestation,
                SpecieWeight: specieData.SpecieWeight,
                SpecieFood: specieData.SpecieFood,
                SpecieLifeExpectancy: specieData.SpecieLifeExpectancy,
                SpeciePhotoProfil: specieData.SpeciePhotoProfil,
                SpeciePhoto1: specieData.SpeciePhoto1,
                SpeciePhoto2: specieData.SpeciePhoto2,
                SpeciePhoto3: specieData.SpeciePhoto3,
                SpeciePhoto4: specieData.SpeciePhoto4,
                SpecieLastModificationBy: userData.userId,
                SpecieLastEditDate: Date()
            })

            // ********************
            // Ecriture du log
            // ********************
            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "edit",
                        dataType: 'specie',
                        elementId: specieData.SpecieId,
                        elementName: specieData.SpecieName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })
            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'espèce " + specieData.SpecieName + " a été correctement éditée",
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


    },

    deleteSpecieFromDatabase: function (specieData) {


        // ********************
        // Ajout dans firebase 
        // ********************

        let collection = (userData.zooName + '-species');
        let document = specieData.SpecieId

        firebase.firestore()
            .collection(collection)
            .doc(document)
            .delete()

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "delete",
                        dataType: 'specie',
                        elementId: specieData.SpecieId,
                        elementName: specieData.SpecieName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })
            

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'espèce " + specieData.SpecieName + " a été correctement supprimée",
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


    },

    addNewAnimalToDatabase: function (animalData) {

        // ********************
        // Ajout dans firebase 
        // ********************

        let collection = (userData.zooName + '-animals');
        let document = animalData.animalName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
        let specieId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .set({
                animalSpecieId: animalData.animalSpecieId,
                animalSpecie: animalData.animalSpecie,
                animalId: specieId,
                animalName: animalData.animalName,
                animalDescription: animalData.animalDescription,
                animalLifeExpectancy: animalData.animalLifeExpectancy,
                animalPhotoProfil: animalData.animalPhotoProfil,
                animalCreatedBy: userData.userId,
                animalCreationDate: Date(),
                dataType: 'animal',
                zooName: userData.zooName
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "create",
                        dataType: 'animal',
                        elementId: animalData.animalId,
                        elementName: animalData.animalName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'espèce " + animalData.animalName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'SpeciesList';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    },

    editNewAnimalToDatabase: function (animalData) {

        let collection = (userData.zooName + '-animals');
        let document = animalData.animalId
        let specieId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .update({
                animalSpecieId: animalData.animalSpecieId,
                animalSpecie: animalData.animalSpecie,
                animalId: specieId,
                animalName: animalData.animalName,
                animalDescription: animalData.animalDescription,
                animalLifeExpectancy: animalData.animalLifeExpectancy,
                animalPhotoProfil: animalData.animalPhotoProfil,
                animalLastModificationBy: userData.userId,
                animalLastEditDate: Date()
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "edit",
                        dataType: 'animal',
                        elementId: animalData.animalId,
                        elementName: animalData.animalName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'espèce " + animalData.animalName + " a été correctement éditée",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'SpeciesList';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    },

    deleteAnimalFromDatabase: function (animalData) {

        let collection = (userData.zooName + '-animals');
        let document = animalData.animalId

        firebase.firestore()
            .collection(collection)
            .doc(document)
            .delete()

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "delete",
                        dataType: 'animal',
                        elementId: animalData.animalId,
                        elementName: animalData.animalName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })
            
            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'espèce " + animalData.animalName + " a été supprimée de votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'SpeciesList';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    },

    addNewServiceToDatabase: function (serviceData) {

        let collection = (userData.zooName + '-services');
        let document = serviceData.serviceName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
        let serviceId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .set({
                serviceId: serviceId,
                serviceName: serviceData.serviceName,
                serviceDescription: serviceData.serviceDescription,
                servicePhotoProfil: serviceData.servicePhotoProfil,
                serviceOpeningTime: serviceData.serviceOpeningTime,
                serviceClosingTime: serviceData.serviceClosingTime,
                serviceCreatedBy: userData.userId,
                serviceCreationDate: Date(),
                dataType: 'service',
                zooName: userData.zooName
                
            })
            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "create",
                        dataType: 'service',
                        elementId: serviceData.serviceId,
                        elementName: serviceData.serviceName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "Le service " + serviceData.serviceName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    editNewServiceToDatabase: function (serviceData) {

        let collection = (userData.zooName + '-services');
        let document = serviceData.serviceId
        let serviceId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .update({
                serviceId: serviceId,
                serviceName: serviceData.serviceName,
                serviceDescription: serviceData.serviceDescription,
                servicePhotoProfil: serviceData.servicePhotoProfil,
                serviceOpeningTime: serviceData.serviceOpeningTime,
                serviceClosingTime: serviceData.serviceClosingTime,
                serviceLastModificationBy: userData.userId,
                serviceLastEditDate: Date()
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "edit",
                        dataType: 'service',
                        elementId: serviceData.serviceId,
                        elementName: serviceData.serviceName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "Le service " + serviceData.serviceName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    deleteServiceFromDatabase: function (serviceData) {

        let collection = (userData.zooName + '-services');
        let document = serviceData.serviceId

        firebase.firestore()
            .collection(collection)
            .doc(document)
            .delete()

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "delete",
                        dataType: 'service',
                        elementId: serviceData.serviceId,
                        elementName: serviceData.serviceName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })
            .then(function () {
                swal({
                    title: "Good job!",
                    text: "Le service " + serviceData.serviceName + " a été supprimé de votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    addNewAnimationToDatabase: function (animationData) {

        let collection = (userData.zooName + '-animations');
        let document = animationData.animationName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
        let animationId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .set({
                animationId: animationData.animationName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000)),
                animationName: animationData.animationName,
                animationDescription: animationData.animationDescription,
                //animationStartingTime: animationData.animationStartingTime,
                animationPhotoProfil: animationData.animationPhotoProfil,
                animationPhotoProfilId: animationData.animationPhotoProfilId,
                animationCreatedBy: userData.userId,
                animationCreationDate: Date(),
                dataType: 'animation',
                zooName: userData.zooName
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "create",
                        dataType: 'animation',
                        elementId: document,
                        elementName: animationData.animationName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'animation " + animationData.animationName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    editNewAnimationToDatabase: function (animationData) {

        let collection = (userData.zooName + '-animations');
        let document = animationData.animationId
        let animationId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .update({
                animationId: animationData.animationId,
                animationName: animationData.animationName,
                animationDescription: animationData.animationDescription,
                //animationStartingTime: animationData.animationStartingTime,
                animationPhotoProfil: animationData.animationPhotoProfil,
                animationLastModificationBy: userData.userId,
                animationLastEditDate: Date()
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "edit",
                        dataType: 'animation',
                        elementId: document,
                        elementName: animationData.animationName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'animation " + animationData.animationName + " a été correctement éditée",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    deleteAnimationFromDatabase: function (animationData) {

        let collection = (userData.zooName + '-animations');
        let document = animationData.animationId

        firebase.firestore()
            .collection(collection)
            .doc(document)
            .delete()
            
            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "delete",
                        dataType: 'animation',
                        elementId: document,
                        elementName: animationData.animationName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "L'animation " + animationData.animationName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    addNewHeaderToDatabase: function (headerData) {

        console.log('dans la bdd je recupère ' + headerData.headerName)

        let collection = (userData.zooName + '-headers');
        let document = headerData.headerName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000))
        let headerId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .set({
                headerId: headerData.headerName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000)),   
                headerCreatedBy: userData.userId,
                headerCreationDate: Date(),
                dataType: 'header',
                zooName: userData.zooName,
                EditMode: false,
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "create",
                        dataType: 'header',
                        elementId: document,
                        elementName: headerData.headerName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "La bannière " + headerData.headerName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    editNewHeaderAnimationToDatabase: function (headerData) {

        let collection = (userData.zooName + '-headers');
        let document = headerData.headerId
        let headerId = document


        firebase.firestore()
            .collection(collection)
            .doc(document)
            .update({
                headerId: headerData.headerName.toUpperCase().replace(/ /g, "") + (Math.floor(Date.now() / 1000)),
                headerLastModificationBy: userData.userId,
                headerLastEditDate: Date(),
                dataType: 'header',
                zooName: userData.zooName,
            })

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "edit",
                        dataType: 'header',
                        elementId: document,
                        elementName: headerData.headerName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "La bannière " + headerData.headerName + " a été correctement éditée",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    deleteHeaderFromDatabase: function (headerData) {

        let collection = (userData.zooName + '-headers');
        let document = headerData.headerId

        firebase.firestore()
            .collection(collection)
            .doc(document)
            .delete()

            .then(function () {
                firebase.firestore()
                    .collection(userData.zooName + '-log')
                    .doc("log-" + Date.now())
                    .set({
                        action: "delete",
                        dataType: 'header',
                        elementId: document,
                        elementName: headerData.headerName,
                        actionMadeById: userData.userId,
                        actionMadeByName: userData.firstname,
                        actionDate: Date(),
                        actionTimestamp: Date.now(),
                        zooName: userData.zooName
                    })
            })

            .then(function () {
                swal({
                    title: "Good job!",
                    text: "La bannière " + headerData.headerName + " a été ajoutée à votre Zoo",
                    type: "success",
                    showCancelButton: false
                }, function () {
                    // Redirect the user
                    window.location.href = nav.akongoURL + 'Dashboard';
                })
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    //
    // Gestion de l'ajout dans Akongo
    //
   
    addSeveralSpeciesToDatabase: function(speciesList, logId) {

        let i = logId - 1
        
        let userData = JSON.parse(localStorage.getItem('user'))
        
        for (let specie of speciesList) {

            let specieData
            let newLogId = i++

            // Récupération des information de l'espèce sur la base akongo

            let docRef = firebase.firestore()
                .collection('Akongo-species')
                .doc(specie);

            docRef.get().then(function (snapshot) {
                // The Promise was "fulfilled" (it succeeded).
                specieData = snapshot.data()
                }).
                
                // Ecriture dans la base du zoo
                
                then(function () {

                    firebase.firestore()
                        .collection(userData.zooName + '-species')
                        .doc(specieData.SpecieId)
                        .set({
                            SpecieId: specieData.SpecieId,
                            SpecieName: specieData.SpecieName,
                            SpecieLatinName: specieData.SpecieLatinName,
                            SpecieEnglishName: specieData.SpecieEnglishName,
                            SpecieClass: specieData.SpecieClass,
                            SpecieOrder: specieData.SpecieOrder,
                            SpecieFamilly: specieData.SpecieFamilly,
                            SpecieIUCNClassification: specieData.SpecieIUCNClassification,
                            SpecieDescription: specieData.SpecieDescription,
                            SpecieGestation: specieData.SpecieGestation,
                            SpecieWeight: specieData.SpecieWeight,
                            SpecieLifeExpectancy: specieData.SpecieLifeExpectancy,
                            SpecieFood: specieData.SpecieFood,
                            SpeciePhotoProfil: specieData.SpeciePhotoProfil,
                            SpeciePhoto1: specieData.SpeciePhoto1,
                            SpeciePhoto2: specieData.SpeciePhoto2,
                            SpeciePhoto3: specieData.SpeciePhoto3,
                            SpeciePhoto4: specieData.SpeciePhoto4,
                            SpecieCreatedBy: userData.userId,
                            SpecieCreationDate: Date(),
                            dataType: 'specie',
                            zooName: userData.zooName,
                        })

                    
                        .then(function () {
                            firebase.firestore()
                                .collection(userData.zooName + '-log')
                                .doc("log-" + newLogId)
                                .set({
                                    action: "create",
                                    dataType: 'specie',
                                    elementId: specieData.SpecieId,
                                    elementName: specieData.SpecieName,
                                    actionMadeById: userData.userId,
                                    actionMadeByName: userData.firstname,
                                    actionDate: Date(),
                                    actionTimestamp: Date.now(),
                                    zooName: userData.zooName
                                })
                        })
                })
        } 
            swal({
                title: "Good job!",
                text: "Les " + speciesList.length + " espèces ont été ajoutées à votre Zoo",
                type: "success",
                showCancelButton: false
            }, function () {
                // Redirect the user
                window.location.href = nav.akongoURL + 'Dashboard';
            })
        },


    //
    // Gestion des listes Nouritures 
    //


    updateFoodDataBase: function (foodListSubmited) {

        let newList = []


        var query = firebase.database().ref(userData.zooName + '/Lists/FoodList').orderByKey();
        query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    newList.push(childData);

                });
            })

            .then(function () {
                // Promesse tenue

                foodListSubmited.forEach(FoodItem => {
                    console.log('Le mot à tester est', FoodItem)
                    console.log('La liste est', newList)
                    
                   
                    if (FoodItem.customOption === true) {
                        console.log('c est du custom')

                        newList.push(FoodItem.SpecieFood)
                    } else {
                        if (newList.indexOf(FoodItem) === -1) {
                            console.log(FoodItem + ' PAS présent dans la liste')

                            newList.push(FoodItem)

                        } else {
                            console.log(FoodItem + ' Présent dans la liste')
                        }
                    }

                })
            })

            .then(function () {
                // Promesse tenue
                console.log('apres traitement', newList)
                let FoodList = newList
                firebase.database().ref(userData.zooName + '/Lists/').set({
                    FoodList,
                })
            })
    },




    //
    // Ces fonction prend un objet Specie comprenant les données d'une espèce et l'ajoute en base
    //
    testStateUpdate: function () {
        let data = 1;

        this.setState({
            speciesList: data.data
        });
    },


};