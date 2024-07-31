import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAGZDdTO2x0jRxamCL_VpxtsCH_AzBJEpQ",
  authDomain: "ezhire-cb1e3.firebaseapp.com",
  projectId: "ezhire-cb1e3",
  storageBucket: "ezhire-cb1e3.appspot.com",
  messagingSenderId: "97650938310",
  appId: "1:97650938310:web:d1b074e103aa79138662c7",
  measurementId: "G-L2F971LW4K",
};

const subscriberEmailInput = document.getElementById("subscriberEmailInput");
const subscriberEmailInputFooter = document.getElementById(
  "subscriberEmailInputFooter"
);
const subscribebutton = document.getElementById("subscribebutton");
const subscribebuttonnew = document.getElementById("subscribebuttonnew");
const subscribebuttonfooter = document.getElementById("subscribebuttonfooter");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
var category = "";

var dialog = document.getElementById("cardDialog");
const serviceButton = document.querySelectorAll(".service-button");
var cardTitleDisplay = document.getElementById("cardTitleDisplay");
var cardIdDisplay = document.getElementById("cardIdDisplay");
const categoryCard = document.querySelectorAll(".service-card");
const submitButton = document.getElementById("submitButton");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

dialog.querySelector("button").addEventListener("click", () => {
  dialog.close(); // Close the dialog box on button click
});
serviceButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const buttonId = button.id;
    cardIdDisplay = document.getElementById("cardIdDisplay");
    cardTitleDisplay = document.getElementById("cardTitleDisplay");

    cardIdDisplay.textContent = `${buttonId}`;
    category = button.id;
    console.log("hey");
    dialog.showModal();
  });
});
categoryCard.forEach((card) => {
  card.addEventListener("click", (event) => {
    const cardId = card.id;
    category = card.id;
    dialog = document.getElementById("cardDialog");
    cardIdDisplay = document.getElementById("cardIdDisplay");
    cardTitleDisplay = document.getElementById("cardTitleDisplay");
    const clickedElement = event.target;

    cardIdDisplay.textContent = `${cardId}`;
    dialog.querySelector("button").addEventListener("click", () => {
      dialog.close(); // Close the dialog box on button click
    });
    console.log("Clicked card title: ", cardId);
    dialog.showModal();
  });
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('dropdownMenuButton').textContent = event.target.textContent;

        
        category = event.target.textContent;
        console.log(event.target.textContent);
    });
});
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (nameInput.value == "") {
    alert("Name is mandatory.");
  } else if (emailInput.value == "") {
    alert("E-mail is mandatory.");
  } else {
    addLeadToFirestore(
      emailInput.value || null,
      nameInput.value || null,
      phoneInput.value || null,
      category || null,
      messageInput.value || null
    )
      .then((result) => {
        if (result) {
          alert("You'll be contacted shortly!");
          // dialog.close();
          console.log("Lead added successfully!");
          emailInput.value = "";
          nameInput.value = "";
          phoneInput.value = "";
          subjectInput.value = "";
          messageInput.value = "";
          category = "";
          // Handle success scenario
        } else {
          alert("Some error occured!");
          console.error("Error adding lead!");
          // Handle error scenario
        }
      })
      .catch((error) => {
        console.error("Error adding lead:", error);
      });
  }
});
// submitButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   if (nameInput.value == "") {
//     alert("Name is mandatory.");
//   } else if (emailInput.value == "") {
//     alert("E-mail is mandatory.");
//   } else {
//     addLeadToFirestore(
//       emailInput.value || null,
//       nameInput.value || null,
//       phoneInput.value || null,
//       category || null,
//       messageInput.value || null
//     )
//       .then((result) => {
//         if (result) {
//           alert("You'll be contacted shortly!");
//           // dialog.close();
//           console.log("Lead added successfully!");
//           emailInput.value = "";
//           nameInput.value = "";
//           phoneInput.value = "";
//           subjectInput.value = "";
//           messageInput.value = "";
//           category = "";
//           // Handle success scenario
//         } else {
//           alert("Some error occured!");
//           console.error("Error adding lead!");
//           // Handle error scenario
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding lead:", error);
//       });
//   }
// });

async function addLeadToFirestore(email, name, phone, subject, message) {
  try {
    const collectionRef = await collection(db, "leads");

    const newLead = {
      email,
      name,
      phone,
      subject,
      message,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collectionRef, newLead);

    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}
function subscribe(email){
  addSubscriberToFirestore(email || null)
    .then((result) => {
      if (result) {
        alert("You have successfully subscribed to our newsletter!");
        dialog.close();
        console.log("subscriber added successfully!");
        email = "";
        // Handle success scenario
      } else {
        alert("Some error occured!");
        console.error("Error adding subscriber!");
        // Handle error scenario
      }
    })
    .catch((error) => {
      console.error("Error adding subscriber:", error);
    });
}
async function addSubscriberToFirestore(email) {
  try {
    const collectionRef = await collection(db, "subscribers");

    const newLead = {
      email,

      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collectionRef, newLead);

    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}
subscribebutton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("hi hello sahil");
  console.log(subscriberEmailInput.value);
  subscribe(subscriberEmailInput.value);
});
subscribebuttonnew.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("hi hello sahil");
  console.log(subscriberEmailInput.value);
//   subscribe(subscriberEmailInput.value);
});
subscribebuttonfooter.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(subscriberEmailInputFooter.value);
  subscribe(subscriberEmailInputFooter.value);
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('dropdownMenuButton').textContent = event.target.textContent;

        subjectInput = event.target.textContent;
        
        console.log(event.target.textContent);
    });
});
