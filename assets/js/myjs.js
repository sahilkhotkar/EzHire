
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyAGZDdTO2x0jRxamCL_VpxtsCH_AzBJEpQ",
    authDomain: "ezhire-cb1e3.firebaseapp.com",
    projectId: "ezhire-cb1e3",
    storageBucket: "ezhire-cb1e3.appspot.com",
    messagingSenderId: "97650938310",
    appId: "1:97650938310:web:d1b074e103aa79138662c7",
    measurementId: "G-L2F971LW4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
var subjectInput = "";
const messageInput = document.getElementById('message');
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

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    event.preventDefault();
    if (emailInput.value == "" || nameInput.value == "" ||
        phoneInput.value == ""
    ) {
        alert("Please fill the mandatory fields.")
    }
    else {
        addLeadToFirestore(
            emailInput.value || null,
            nameInput.value || null,
            phoneInput.value || null,
            subjectInput || null,
            messageInput.value || null
        )
            .then((result) => {
                if (result) {
                    alert("You'll be contacted shortly!");
                    console.log("Lead added successfully!");
                    emailInput.value = "";
                    nameInput.value = "";
                    phoneInput.value = "";
                    subjectInput = "";
                    messageInput.value = "";
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
    // Prevent default form submission


});
const serviceButton = document.querySelectorAll('.service-button');
var cardTitleDisplay = document.getElementById('cardTitleDisplay');
var cardIdDisplay = document.getElementById('cardIdDisplay');
const dialog = document.getElementById('cardDialog');

serviceButton.forEach((button) => {

    button.addEventListener('click', (e) => {

        e.preventDefault();
        const buttonId = button.id;
        cardIdDisplay = document.getElementById('cardIdDisplay');
        cardTitleDisplay = document.getElementById('cardTitleDisplay');
        

        cardIdDisplay.textContent = `${buttonId}`;
        // category = button.id;
        console.log("hey");
        dialog.showModal();
    });
});
dialog.querySelector('button').addEventListener('click', () => {
            dialog.close(); // Close the dialog box on button click
        });

        submitButton.addEventListener('click', () => {
    event.preventDefault(); // Prevent default form submission
    if (nameInput.value == "") {
        alert("Name is mandatory.");
    }
    else if (emailInput.value == "") {
        alert("E-mail is mandatory.");
    }
    else {
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
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('dropdownMenuButton').textContent = event.target.textContent;

        subjectInput = event.target.textContent;

        console.log(event.target.textContent);
    });
});