import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput } from '../components/Themed';

export function Root() {
  const availableWeight = '50 kg'; // <= in a real world environment this would be coming from an API or database
  const [grapeQty, setGrapeQty] = useState('');

  const onQtyBlur = () => {
    // only allow numeric values
    setGrapeQty(grapeQty.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Buy Grapes
      </Text>
      <Text style={styles.weightText}>
        <b>Available weight:</b> {availableWeight}
      </Text>
      <Text style={styles.grapIcon}>
        🍇
      </Text>
      <View style={styles.quantityInputContainer}>
        <TextInput
          style={styles.quantityInput}
          onChangeText={text => setGrapeQty(text)}
          onBlur={onQtyBlur}
          value={grapeQty}
          placeholder="number"
          keyboardType="numeric"
        />
        <Text style={styles.kgTxt}>
          kg
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
    fontFamily: 'sans-serif-light',
  },
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
  quantityInputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  kgTxt: {
    fontSize: 20,
  }
});
