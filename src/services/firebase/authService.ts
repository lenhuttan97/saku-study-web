import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Unsubscribe,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '@/services/firebase/config';

export interface AuthService {
  subscribeAuthState: (listener: (user: User | null) => void) => Unsubscribe;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGithub: () => Promise<UserCredential>;
  loginWithFacebook: () => Promise<UserCredential>;
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const authService: AuthService = {
  subscribeAuthState: (listener) => onAuthStateChanged(auth, listener),

  loginWithEmail: async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  registerWithEmail: async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  resetPassword: async (email) => {
    await sendPasswordResetEmail(auth, email);
  },

  logout: async () => {
    await signOut(auth);
  },

  loginWithGoogle: async () => {
    return signInWithPopup(auth, googleProvider);
  },

  loginWithGithub: async () => {
    return signInWithPopup(auth, githubProvider);
  },

  loginWithFacebook: async () => {
    return signInWithPopup(auth, facebookProvider);
  },
};
