


import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut,  } from "firebase/auth";
import { getFirestore, doc, updateDoc, onSnapshot, query, orderBy, limit,  collection, getDocs, where, setDoc } from "firebase/firestore";


const provider = new GoogleAuthProvider();

import firebaseConfig from "../../env.js";
import { state, STATE_LOSING } from "../states/actionState.js";
import { data } from '../states/dataUser.js'


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const logOutButton = document.getElementById('logOut')
const loginWithGoogle = document.getElementById('logWithGoogle')
const userEmail = document.getElementById('userEmail')
const yourAttemps = document.getElementById('yourAttemps')
const yourScore = document.getElementById('yourScore')


const auth = getAuth();

async function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            createUserOnScoreDatabase(user.email)
            actualiceUserData(user.email)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

async function logOut() {
    signOut(auth).then(() => {
        console.log('Chau')
    }).catch((error) => {
        console.log(error)
    });
}

loginWithGoogle.addEventListener('click', () => {
    if (state.runState !== STATE_LOSING) {
        return null
    }

    login()
})

logOutButton.addEventListener('click', () => {
    if (state.runState !== STATE_LOSING) {
        return null
    }
    logOut()
})






async function createUserOnScoreDatabase(userEmail) {

    const q = query(collection(db, "scoreBoard"), where("email", "==", userEmail));
    const user = await getDocs(q);

    const datas = user.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (datas.length === 0) {
        const newUser = doc(collection(db, "scoreBoard"));

        await setDoc(newUser, {
            email: userEmail,
            topScore: 0,
            attempts: 0
        })
    }
    return null
}




export async function getUserData(user) {
    const q = query(collection(db, "scoreBoard"), where("email", "==", user));
    const userData = await getDocs(q);
    userData.forEach((doc) => {
        yourAttemps.innerHTML = doc.data().attempts
        yourScore.innerHTML = doc.data().topScore
        data.userId = doc.id
        data.attempts = doc.data().attempts
        data.topScore = doc.data().topScore
    });
}



export async function actualiceUserData(user) {

    const q = query(collection(db, "scoreBoard"), where("email", "==", user));
    onSnapshot(q, (doc) => {
        doc.forEach((doc) => {
            data.userId = doc.id
            data.attempts = doc.data().attempts
            data.topScore = doc.data().topScore
            yourAttemps.innerHTML = doc.data().attempts
            yourScore.innerHTML = doc.data().topScore
        })
    });
}

async function getScore() {

    const q = query(collection(db, "scoreBoard"), orderBy("topScore", "desc"), limit(20));

     onSnapshot(q, (doc) => {
        scoreBoard.innerHTML = ''
        let index = 0
        doc.forEach((doc) => {
            index++
            let email = doc.data().email
            return (
                scoreBoard.innerHTML += `
                        <div class='score'>
                           <span>${index}  ${email.slice(0, email.indexOf('@'))}</span>
                            <span class='containerScore'>
                            <span>${doc.data().topScore}-</span><span class='attempsGlobalScore'>(${doc.data().attempts})</span>
                            </span>
                        </div>`
            )
        })
    });


}
getScore()




const scoreSnake = document.getElementById('scoreSnake')

export async function editData(id, score, attempts) {

    let data = {
        topScore: score,
        attempts: attempts
    }

    const newScoreData = doc(db, "scoreBoard", id);
    await updateDoc(newScoreData, data);

}







auth.onAuthStateChanged(function (user) {
    if (user) {
        data.email = user.email
        logOutButton.classList.remove('hidden')
        loginWithGoogle.classList.add('hidden')
        userEmail.innerHTML = user.email
        getUserData(data.email)
    } else {
        logOutButton.classList.add('hidden')
        loginWithGoogle.classList.remove('hidden')
        userEmail.innerHTML = 'Usuario Anónimo'
        userEmail.innerHTML = 'Usuario Anónimo'
        yourAttemps.innerHTML = "Nivel gallina"
        yourScore.innerHTML = 0
        data.userId = ""
    }
})

