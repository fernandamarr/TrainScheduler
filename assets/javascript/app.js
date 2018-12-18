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

    // Show current time
    $("#current-time").append(moment().format("hh:mm A"));

    // Capture button click for adding trains
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // Store and retrieve most recent input
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var first = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();


        // Push to firebase
        database.ref().push({
            name: name,
            destination: destination,
            first: first,
            frequency: frequency
        });

        // Clear textboxes before new input
        $("#name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

        return false; // this will prevent from moving to new page??

    });

    // Add changes to HTML
    database.ref().on("child_added", function (childSnapshot) {

        // console.log(childSnapshot.val());
        // console.log(childSnapshot.val().name);
        // console.log(childSnapshot.val().destination);
        // console.log(childSnapshot.val().first);
        // console.log(childSnapshot.val().frequency);

        // Re-define time in snapshot
        var first = childSnapshot.val().first;
        var frequency = childSnapshot.val().frequency;
        var time = moment();

        // testing
        console.log(time);

        // Format train time
        var timeConverted = moment(first, "hh:mm").subtract(1, "years");

        // Calculate difference between current and converted time
        var diffTime = moment().diff(moment(timeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;

        // Minutes until train
        var minutesTillTrain = frequency - tRemainder;

        // Next train
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        var nextTrainFormat = moment(nextTrain).format("hh:mm a");

        // Change HTML
        $("#new-train").append("<tr><td><strong>" + childSnapshot.val().name + "</strong></td><td>" + childSnapshot.val().destination + "</td><td>" + frequency + "</td><td>" + nextTrainFormat + "</td><td>" + minutesTillTrain + "</td></tr>");

        // Handle errors
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // Remove button
    // $(document.body).on("click", ".checkbox", function () {
    //     var remove = $(this).attr("#row");
    //     $(".checkbox" + remove).remove();
    // })

});
