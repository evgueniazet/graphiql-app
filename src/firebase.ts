import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

class CustomError extends Error {
  code?: string;

  constructor(message?: string, code?: string) {
    super(message);
    this.code = code;
  }
}

//TODO:replace firebaseConfig to .env file

const firebaseConfig = {
  apiKey: 'AIzaSyDIXJ5YT7hoNbBFqK3TBcV41-TzIO-7n7w',
  authDomain: 'fir-auth-6edd8.firebaseapp.com',
  projectId: 'fir-auth-6edd8',
  storageBucket: 'fir-auth-6edd8.appspot.com',
  messagingSenderId: '904760319835',
  appId: '1:904760319835:web:44fd0d957f114b4e51447e',
  measurementId: 'G-Q4TYKH9GG7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      const errorCode = (err as CustomError).code;

      switch (errorCode) {
        case 'auth/user-not-found':
          alert('User with this email address not found.');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password.');
          break;
        default:
          alert('Error when trying to log in.');
      }
    }
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });

    alert(`регистрация прошла успешно! Email: ${email}, password: ${password}`);
  } catch (err) {
    if (err instanceof Error) {
      if ((err as CustomError).code === 'auth/email-already-in-use') {
        //TODO: add custom error
        alert('A user with this email address has already been registered!');
      } else {
        //TODO: add custom error
        alert('Error when trying to register');
      }
    }
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
