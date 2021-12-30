import { StyleSheet, TouchableOpacity } from 'react-native';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export function CheckoutScreen({ navigation, route }: RootStackScreenProps<'Checkout'>) {
  return (
    <ScreenWrapper>
      <Text>
        Hello world! You want to checkout {route.params.grapeQty} kg of grapes 😋
      </Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
});
