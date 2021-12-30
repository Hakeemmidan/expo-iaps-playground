import { StyleSheet, TouchableOpacity } from 'react-native';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export function CheckoutScreen({ navigation }: RootStackScreenProps<'Checkout'>) {
  return (
    <ScreenWrapper>
      <Text>
        Hello world!
      </Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
});
