 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
 import { data } from '../states/dataUser.js'
 
 const firebaseConfig = {
     apiKey: "AIzaSyBAwipFgfHW68X3BXEBMwAyrVQJjPNE7SE",
     authDomain: "test-7503a.firebaseapp.com",
     databaseURL: "https://test-7503a-default-rtdb.firebaseio.com",
     projectId: "test-7503a",
     storageBucket: "test-7503a.appspot.com",
     messagingSenderId: "160578647559",
     appId: "1:160578647559:web:5fca4c4438a148cc321ca2"
 };
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);



 firebase.initializeApp(firebaseConfig);
 let db = firebase.firestore();



 var provider = new firebase.auth.GoogleAuthProvider();

 const logOutButton = document.getElementById('logOut')
 const loginWithGoogle = document.getElementById('logWithGoogle')
 const userEmail = document.getElementById('userEmail')


  // document.getElementById('testButton').addEventListener('click', ()=>{
        //     db.collection("scoreBoard").doc().set({
        //         name:'test',
        //         score:'123124'
        // });
        // })

 logOutButton.addEventListener('click', () => {
     firebase.auth().signOut().then(() => {
         // Sign-out successful.
     }).catch((error) => {
         console.log(error)
     });
 })


 document.getElementById('logWithGoogle').addEventListener('click', () => {
     firebase.auth()
         .signInWithPopup(provider)
         .then((result) => {
            // console.log(error)
         }).catch((error) => {
            console.log(error)
         });
 })




 firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         console.log(user.email)
         data.email = user.email
         logOutButton.classList.remove('hidden')
         loginWithGoogle.classList.add('hidden')
         userEmail.innerHTML = user.email
     } else {
         logOutButton.classList.add('hidden')
         loginWithGoogle.classList.remove('hidden')
         userEmail.innerHTML = 'Usuario Anónimo'

     }

 })