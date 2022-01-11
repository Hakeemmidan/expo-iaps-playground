import { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { AppContext } from '../contexts/AppContext';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Text } from '../components/Themed';
import { CheckoutForm } from '../components/CheckoutForm';
import { RootStackScreenProps } from '../types';
import { SignInWithGoogle } from '../components/SignInWithGoogle';

export function CheckoutScreen({ navigation, route }: RootStackScreenProps<'Checkout'>) {
  const { state: { currentUser } } = useContext(AppContext);

  return (
    <ScreenWrapper>
      <Text style={styles.header}>
        Checkout {route.params.grapeQty} kg of grapes 😋
        {"\n"}
        {"\n"}
      </Text>
      {currentUser.displayName
        ? <CheckoutForm />
        : <SignInWithGoogle/>
      }
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
  }
});
