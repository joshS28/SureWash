function showSession() {
  var x = document.getElementById("chart");
  if (x.style.display === "none") {
      x.style.display = "block";
      randomID();
  } else {
      x.style.display = "none";
  }
}

function randomID(){
  var random = Math.floor(100000000 + Math.random() * 900000000);
  console.log(random);
  var ref = firebase.database().ref();
  //console.log(ref);
  firebase.database().ref('sessions/' + random).set({
   sessionID: random,
  });
  document.getElementById("sessionNumber").innerHTML = random;

}

async function sessionData(){
      var sessionID = document.getElementById("sessionNumber").innerHTML;
      console.log(sessionID);
      //if you want to test a specific child in the database, comment out the avove 2 lines and
      //change the sessionID var to the number you want in the database
      var sessions = firebase.database().ref('sessions/' + sessionID);
      var values = [];

      await sessions.once("value", function(snapshot) {
        var keys = [];
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          values.push(item);
        });
       })
      var finalValues = values[0];
      //console.log(finalValues);
      var keys = [];
      for(var k in finalValues) keys.push(k);
      //console.log(keys);
      if(finalValues == 0){
        var x = document.getElementById("templateWarningSession");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

      var vals = Object.values(finalValues);
      //     get the reference for the body
      var body = document.getElementById('chart');
      // creates a <table> element and a <tbody> element
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var row = document.createElement("tr");

      for (var q = 0; q < 2; q++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          if(q == 0){
            var cell = document.createElement("td");
            var cellText = document.createTextNode("User ID");
          }

          else if(q == 1){
            var cell = document.createElement("td");
            var cellText = document.createTextNode("Scores");
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
        body.appendChild(tbl);
      // creating all cells
      for (var i = 0; i < keys.length-1; i++) {
        // creates a table row
         var row = document.createElement("tr");

        for (var j = 0; j < 2; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          if(j == 0){

            var currKey =  keys[i];
            var cell = document.createElement("td");
            var cellText = document.createTextNode(currKey);

          }

          else if(j == 1){
            var currVal = vals[i].Score;
            var cell = document.createElement("td");
            var cellText = document.createTextNode(currVal);
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      body.appendChild(tbl);
      //sets the border attribute of tbl to 2;
      tbl.setAttribute("border", "2");
      tbl.setAttribute("style", "text-align: center");
    }
