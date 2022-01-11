import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { RootStackScreenProps } from '../types';
import { View, Text, TextInput, PressableButton } from '../components/Themed';

export function RootScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const availableWeightInKg: number = 50; // <= in a real world environment this would be coming from an API or database
  const [grapeQty, setGrapeQty] = useState('');

  const handleQtyChange = (qty: string) => {
    const parsedQty: string = qty.replace(/[^0-9]/g, '');
    if (parsedQty !== qty) {
      Toast.show({ type: 'info', text1: 'Please only use numbers for quantity' });
    } else {
      setGrapeQty(qty);
    }
  };

  const handleCheckoutClick = () => {
    if (grapeQty === '') {
      Toast.show({ type: 'info', text1: 'Quantity missing', text2: 'Please enter a grape quantity to continue to checkout' });
    } else {
      navigation.navigate('Checkout', { grapeQty });
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.titleText}>
        Buy Grapes
      </Text>
      <Text style={styles.weightText}>
        Available weight: {availableWeightInKg} kg
      </Text>
      <Text style={styles.grapIcon}>
        🍇
      </Text>
      <View style={styles.pageRowContainer}>
        <TextInput
          style={styles.quantityInput}
          onChangeText={handleQtyChange}
          value={grapeQty}
          placeholder="number"
          keyboardType="numeric"
        />
        <Text style={styles.kgTxt}>
          kg
        </Text>
      </View>
      <View style={styles.pageRowContainer}>
        <PressableButton
          title='Proceeed to checkout'
          onPress={handleCheckoutClick}
        />
      </View>
    </ ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  weightText: {
    fontSize: 20,
    paddingBottom: 20,
  },
  quantityInput: {
    width: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  grapIcon: {
    fontSize: 100,
  },
  pageRowContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  kgTxt: {
    fontSize: 20,
  },
});
