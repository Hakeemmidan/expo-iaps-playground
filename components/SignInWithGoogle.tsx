import { useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';

import { firebaseApp } from '../helpers/firebase';
import { PressableButton } from './Themed';

export function SignInWithGoogle() {
    const [request, response, promptAsync] = useIdTokenAuthRequest(
    {
      clientId: process.env.REACT_APP_FIREBASE_GOOGLE_WEB_CLIENT_ID,
    },
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth(firebaseApp);
      
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);


  return (
    <PressableButton
      title='Sign in with Google'
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
};
