/**
 * Maps Firebase Auth error codes to user-friendly messages
 * @param error - Firebase error object
 * @returns Translated error message
 */
export const getFirebaseErrorMessage = (error: any): string => {
  if (!error?.code) return 'Authentication failed';
  
  switch (error.code) {
    // Login errors
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'Account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
      
    // Registration errors
    case 'auth/email-already-in-use':
      return 'Email is already registered';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/operation-not-allowed':
      return 'Registration is currently disabled';
      
    // General errors
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    default:
      console.warn('Unhandled Firebase error:', error.code);
      return 'Authentication failed. Please try again';
  }
};