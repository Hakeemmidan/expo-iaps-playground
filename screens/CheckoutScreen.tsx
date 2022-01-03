import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import firebase from '../firebase';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PressableButton, Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { signInWithGoogle } from '../firebase';

export function CheckoutScreen({ navigation, route }: RootStackScreenProps<'Checkout'>) {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser: any) => {
      setUser(authUser);
    })
  }, []);

  return (
    <ScreenWrapper>
      <Text>
        Hello world! You want to checkout {route.params.grapeQty} kg of grapes 😋
        {JSON.stringify(user)}
      </Text>
      <PressableButton
        title='Sign in with Google'
        onPress={signInWithGoogle}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
});
