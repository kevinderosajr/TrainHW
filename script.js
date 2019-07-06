

// 1. Initialize Firebase
const config = {
    apiKey: "AIzaSyA2-9TMCKrrLQjzBzuACqV-xtoEo7qP9Tc",
    authDomain: "classtest-521e9.firebaseapp.com",
    databaseURL: "https://classtest-521e9.firebaseio.com",
    projectId: "classtest-521e9",
    storageBucket: "classtest-521e9.appspot.com",
    messagingSenderId: "231256602051",
    appId: "1:231256602051:web:3b4b141c8c31e83f"
  };
  
  firebase.initializeApp(config);
  
  const database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    const trainName = $("#train-name-input").val().trim();
    const destination = $("#destination-input").val().trim();
    const firstTime = moment($("#first-time-input").val().trim(), "MM/DD/YYYY").format("X");
    const frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    const newTrain = {
      name: trainName,
      role: destination,
      start: firstTime,
      rate: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    const trainName = childSnapshot.val().name;
    const destination = childSnapshot.val().role;
    const firstTime = childSnapshot.val().start;
    const frequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
  
    // Prettify the employee start
    let firstTimePretty = moment.unix(firstTime).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    let empMonths = moment().diff(moment(firstTime, "X"), "minutes");
    console.log(empMonths);
  
    // Calculate the total billed rate
    let empBilled = empMonths * frequency;
    console.log(empBilled);
  
    // Create the new row
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(firstTimePretty),
      $("<td>").text(empMonths),
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  