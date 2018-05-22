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