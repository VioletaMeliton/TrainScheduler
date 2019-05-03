  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJZ91IjKbJR4tVg0bT-xcTwa19PWdXyrA",
    authDomain: "train-scheduler-47b6a.firebaseapp.com",
    databaseURL: "https://train-scheduler-47b6a.firebaseio.com",
    projectId: "train-scheduler-47b6a",
    storageBucket: "train-scheduler-47b6a.appspot.com",
    messagingSenderId: "808319532563"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event) {
    event.preventDefault();

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var firstTrain = $("#firstTrain").val().trim();
var trainFreq = $("#frequency").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
    name: trainName,
    destination: trainDest,
    start: firstTrain,
    frequency: trainFreq
};

// Uploads train data to the database
    database.ref().push(newTrain);

 // Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#firstTrain").val("");
$("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());

	// Store everything into a variable
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().start;
	var frequency = childSnapshot.val().frequency;

	// Train info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	//First time
	var firstTime= moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log(firstTime);

	// Current time
	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

	var diffTime = moment().diff(moment(firstTime), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	var minutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

	// Next train arrival
	var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//
	$(".table tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");

});

