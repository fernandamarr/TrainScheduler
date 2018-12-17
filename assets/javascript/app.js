// manipulate train time in military time with moment.js
// frequency in minutes and first train time in military time
// Users from many different machines must be able to view same train times. 
// provide up-to-date info with moment.js -- arrival time and how many minutes remain until arrival times


$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDZJPGsLd5yx4hoVyUKstt2XrP77rIAt3I",
        authDomain: "trainscheduler-79921.firebaseapp.com",
        databaseURL: "https://trainscheduler-79921.firebaseio.com",
        projectId: "trainscheduler-79921",
        storageBucket: "trainscheduler-79921.appspot.com",
        messagingSenderId: "66428144576"
    };
    firebase.initializeApp(config);

    // Variable to reference the database
    var database = firebase.database();

    // Initial values
    var train = "";
    var destination = "";
    var time = "03:30";
    var frequency = 3;

    // Capture button click
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // Store and retrieve most recent input
        train = $("#train").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        time = $("#time").val().trim();

        // Change what is saved in firebase
        database.ref().set({
            train: train,
            destination: destination,
            time: time,
            frequency: frequency
        });
    });

    // Add changes to HTML
    database.ref().on("value", function (snapshot) {

        // // Print initial data to console
        console.log(snapshot.val());
        console.log(snapshot.val().train);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().time);
        console.log(snapshot.val().frequency);

        // time = moment(time).format('HH:mm');

        // Change HTML
        $("tbody").append("<tr><td><strong>" + snapshot.val().train + "</strong></td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().time + "</td></tr>");

        // Log errors to console
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
});
