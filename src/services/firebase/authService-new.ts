import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  User,
  UserCredential,
  Auth
} from 'firebase/auth';
import { auth } from './config';

// Auth service interface for Firebase authentication
class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = auth;
  }

  // Subscribe to auth state changes
  subscribeAuthState = (callback: (user: User | null) => void) => {
    return this.auth.onAuthStateChanged(callback);
  };

  // Email/password login
  loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  // Email/password registration
  registerWithEmail = async (email: string, password: string, displayName: string): Promise<UserCredential> => {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    // Optionally update display name
    if (credential.user) {
      await credential.user.updateProfile({ displayName });
    }
    return credential;
  };

  // Logout
  logout = async (): Promise<void> => {
    return signOut(this.auth);
  };

  // Password reset
  resetPassword = async (email: string): Promise<void> => {
    return sendPasswordResetEmail(this.auth, email);
  };

  // Social login with Google
  loginWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  };

  // Social login with GitHub
  loginWithGithub = async (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider);
  };

  // Social login with Facebook
  loginWithFacebook = async (): Promise<UserCredential> => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  };
}

export const authService = new AuthService();
export default AuthService;