const firebaseConfig = {
    apiKey: "AIzaSyCzSMopyXu-9i8iaR87WedNp7xCIllUquQ",
    authDomain: "ldproject-621d4.firebaseapp.com",
    databaseURL: "https://ldproject-621d4-default-rtdb.firebaseio.com",
    projectId: "ldproject-621d4",
    storageBucket: "ldproject-621d4.firebasestorage.app",
    messagingSenderId: "280478819925",
    appId: "1:280478819925:web:49d132ece45cde2c61d6dc",
    measurementId: "G-R5WEZ0HZ4X"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

   
const form = document.getElementById('contact-form');
// form.addEventListener('submit', function (event)
//  {
//     event.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('gmail').value;
//     const type = document.getElementById('turn').value;
//     const message = document.getElementById('message').value;
//     console.log('שם פרטי:', name);
//     console.log('כתובת מייל:', email);
//     console.log('סוג פנייה:', type);
//     console.log('תיאור פנייה:', message);
//     form.reset();
// });

function signin(){
    console.log("welcome to the web")

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const gmail = document.getElementById('gmail').value;

    firebase.auth().createUserWithEmailAndPassword(gmail, password)
  .then((userCredential) => {
 
    var user = userCredential.user;
    console.log(user.uid)
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    // ..
  });
}

function login(){
    console.log("welcome")

    const name = document.getElementById('uname').value;
    const password = document.getElementById('pswd').value;

    firebase.auth().createUserWithEmailAndPassword(uname, pswd)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user.uid)
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    // ..
  });
}

// document.addEventListener('DOMContentLoaded', function () 
// {
//     const form = document.getElementById('login-form');

//     form.addEventListener('submit', function (event) 
//     {
//         event.preventDefault();
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const email = document.getElementById('gmail').value;
//         console.log('שם משתמש:', username);
//         console.log('סיסמה:', password);
//         console.log('כתובת מייל:', email);
//         form.reset();
//     });
// });


const DB = firebase.database();
const EmptySlotsRef = DB.ref("LiorTheKing/TX/C");

let ParkingString = "000000"; // Default binary string

EmptySlotsRef.on("value", (snapshot) => {
  const EmptySlots = parseInt(snapshot.val(), 10);
  console.log("EmptySlots as Integer: ", EmptySlots);
  
  ParkingString = EmptySlots.toString(2).padStart(6, '0');
  console.log("Binary String (6 digits): ", ParkingString);

  let ParkingArray = createParkingArray(ParkingString);
  console.log("Parking Array: ", ParkingArray);

  // Update the UI
  updateParkingSlots(ParkingArray);
});

// Function to convert binary string to boolean array
function createParkingArray(binaryString) {
  return Array.from(binaryString, bit => bit === '0');
}

// Function to update the UI based on parking availability
function updateParkingSlots(ParkingArray) {
  for (let i = 0; i < ParkingArray.length; i++) {
    let slotId = `p${i + 1}`; // Assuming slot IDs are "p1", "p2", etc.
    let slotElement = document.getElementById(slotId);

    if (slotElement) {
      slotElement.style.background = ParkingArray[i] ? "red" : "green";
    }
  }
}


//הזמנת החנייה
function reserveParking() {
  const selectedSpot = document.querySelector('input[name="parking"]:checked');
  if (!selectedSpot) {
      alert("אנא בחר חנייה");
      return;
  }

  const parkingSpot = selectedSpot.value; // מספר החנייה שנבחר
  const name = document.getElementById("name").value.trim();
  const license = document.getElementById("license").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const duration = document.getElementById("duration").value;

  if (!name || !license || !date || !time || !duration) {
      alert("אנא מלא את כל השדות");
      return;
  }

  // שמירת נתוני ההזמנה ב-Firebase
  db.ref("parkingSlots/" + parkingSpot).set({
      status: "occupied",
      reservedBy: name,
      license: license,
      date: date,
      time: time,
      duration: duration
  }).then(() => {
      alert("החנייה הוזמנה בהצלחה!");
      selectedSpot.parentElement.classList.remove("available");
      selectedSpot.parentElement.classList.add("unavailable");
      selectedSpot.parentElement.innerHTML = `<label>${parkingSpot}</label>`;
  }).catch((error) => {
      console.error("שגיאה בשמירת הנתונים: ", error);
  });
}

function openGate() {

  // Optionally, update Firebase or send a request to your IoT system
  const DB = firebase.database();
  DB.ref("GateControl").set({
      status: "open",
      timestamp: new Date().toISOString()
  }).then(() => {
      console.log("Gate Open Command Sent!");
  }).catch(error => {
      console.error("Error opening gate:", error);
  });
}
// פונקציה לטעינת סטטוס החניות מה-Database ולהתאמה בעמוד
function openGateRemote() {
  firebase.database().ref("LiorTheKing/GateControl").set(1)
    .then(() => {
      console.log("השער נפתח!");
    })
    .catch((error) => {
      console.error("שגיאה בפתיחת שער:", error);
    });
}




/*
DB.ref("/parkingSlots").on("value", (snapshot) => {
  try {
    const parkingData = snapshot.val();
    
    strARR = parkingData.toString(2).padStart(8, '0');
    for (i = 0; i < strARR.length; i++) {
      console.log(strARR[i]);
      if (strARR[i] == 1) {
        switch (i) {
          case 0:
            document.getElementById("p1").style.background = "red";
            break;
          default:
            break;
        }
      }
      if (strARR[i] == 2) {
        switch (i) {
          case 0:
            document.getElementById("p2").style.background = "red";
            break;
          default:
            break;
        }
      }
    }

    if (parkingData == 1) {
      console.log(parkingData);
      document.getElementById("p1").style.background = "red";
    }
    if (parkingData == 2) {
      console.log(parkingData);
      document.getElementById("p2").style.background = "red";
    }
    if (parkingData == 3) {
      console.log(parkingData);
      document.getElementById("p3").style.background = "red";
    }
    if (parkingData == 4) {
      console.log(parkingData);
      document.getElementById("p4").style.background = "red";
    }
    if (parkingData == 5) {
      console.log(parkingData);
      document.getElementById("p5").style.background = "red";
    }
    if (parkingData == 6) {
      console.log(parkingData);
      document.getElementById("p6").style.background = "red";
    }

  } catch (error) {
    console.error("Error loading parking data:", error);
  }
});
*/

  
// לקרוא את מצב החניות כשהעמוד נטען
// document.addEventListener("DOMContentLoaded", loadParkingSlots);

// אתחול ה-Firebase


// אתחול אפליקציית Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

function activateLamp() {
  let mode = 3;  
  console.log("Lamp:", mode);

  db.ref('LiorTheKing/RX').set(mode)
      .then(() => console.log("RX set to:", mode))
      .catch(error => console.error("Error setting RX:", error));
}


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function closeLamp() {
  let mode = 0;  
  console.log("Lamp:", mode);

  db.ref('LiorTheKing/RX').set(mode)
      .then(() => console.log("RX set to:", mode))
      .catch(error => console.error("Error setting RX:", error));


}


function openServoGate() {
  const data_in = "10000011";
  firebase.database().ref("LiorTheKing/data_in").set(data_in)
    .then(() => console.log("נשלחה פקודת פתיחה:", data_in))
    .catch((error) => console.error("שגיאה:", error));
}

function closeServoGate() {
  const data_in = "10000000";
  firebase.database().ref("LiorTheKing/data_in").set(data_in)
    .then(() => console.log("נשלחה פקודת סגירה:", data_in))
    .catch((error) => console.error("שגיאה:", error));
}

