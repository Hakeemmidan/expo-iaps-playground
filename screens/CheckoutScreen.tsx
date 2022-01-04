import { StyleSheet } from 'react-native';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { PressableButton, Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { signInWithGoogle } from '../firebase';

export function CheckoutScreen({ navigation, route }: RootStackScreenProps<'Checkout'>) {
  return (
    <ScreenWrapper>
      <Text>
        Hello world! You want to checkout {route.params.grapeQty} kg of grapes 😋
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
