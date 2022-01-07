import { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { AppContext } from '../contexts/AppContext';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PressableButton } from '../components/Themed';
import { CheckoutForm } from '../components/CheckoutForm';
import { RootStackScreenProps } from '../types';
import { signInWithGoogle } from '../helpers/firebase_auth';

export function CheckoutScreen({ navigation, route }: RootStackScreenProps<'Checkout'>) {
  const { state: { currentUser } } = useContext(AppContext);

  return (
    <ScreenWrapper>
      <h2>
        Checkout {route.params.grapeQty} kg of grapes 😋
      </h2>
      <br/>
      {currentUser.displayName
        ? <CheckoutForm />
        : <PressableButton
            title='Sign in with Google to Checkoout'
            onPress={signInWithGoogle}
          />
      }
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
});
