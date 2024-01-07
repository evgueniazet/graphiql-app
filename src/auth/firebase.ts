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

const firebaseConfig = {
  apiKey: 'AIzaSyCVrJXvhBFy6qVLzo8-Qe-X41lXx5cpMyo',
  authDomain: 'graph-ql2.firebaseapp.com',
  projectId: 'graph-ql2',
  storageBucket: 'graph-ql2.appspot.com',
  messagingSenderId: '503547212035',
  appId: '1:503547212035:web:80992c37643dbf9302f936',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      const errorCode = (err as CustomError).code;

      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User with this email address not found.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError('Error when trying to log in.');
      }
    }
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });

    setError(
      `Registration was successful! Email: ${email}, password: ${password}`
    );
  } catch (err) {
    if (err instanceof Error) {
      if ((err as CustomError).code === 'auth/email-already-in-use') {
        setError('A user with this email address has already been registered!');
      } else {
        setError('Error when trying to register');
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
