
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
const provider = new firebase.auth.GoogleAuthProvider();


export const db = firebase.firestore();




const logOutButton = document.getElementById('logOut')
const loginWithGoogle = document.getElementById('logWithGoogle')
const userEmail = document.getElementById('userEmail')


logOutButton.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log(error)
    });
})


loginWithGoogle.addEventListener('click', () => {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // console.log(error)
        }).catch((error) => {
            console.log(error)
        });
})




async function createUserOnScoreDatabase(userEmail) {

    let result = await db.collection("scoreBoard").where("email", "==", userEmail).get()
    const datas = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (datas.length === 0) {
        db.collection("scoreBoard").doc().set({
            email: userEmail,
            topScore: 0,
            attempts: 0
        });
    }
    return null
}


let yourAttemps = document.getElementById('yourAttemps')
let yourScore = document.getElementById('yourScore')


async function getUserData(user) {
    db.collection("scoreBoard").where("email", "==", user).onSnapshot((res) => {
        res.forEach((doc) => {
            yourAttemps.innerHTML = doc.data().attempts
            yourScore.innerHTML = doc.data().topScore
        });

    });
}

async function getScore() {
    db.collection("scoreBoard").orderBy("topScore", "desc").limit(20).onSnapshot((res) => {
        scoreBoard.innerHTML = ''
        res.forEach((doc) => {
            return (
                scoreBoard.innerHTML += `
                <div class='score'>
                    <span>${doc.data().email}</span><span>${doc.data().topScore}-(${doc.data().attempts})</span>
                </div>`
            )
        });
    });
}
getScore()











firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        data.email = user.email
        logOutButton.classList.remove('hidden')
        loginWithGoogle.classList.add('hidden')
        userEmail.innerHTML = user.email
        createUserOnScoreDatabase(data.email)
        getUserData(data.email)
        data.userId = user.uid
    } else {
        logOutButton.classList.add('hidden')
        loginWithGoogle.classList.remove('hidden')
        userEmail.innerHTML = 'Usuario Anónimo'
    }

})