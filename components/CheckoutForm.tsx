import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextInput, View } from '../components/Themed';
import { formatCardNumber } from '../helpers/main';


export function CheckoutForm() {
  const [cardNum, setCardNum] = useState('');

  const handleCardNumChange = (text: string) => {
    const formattedTxt = formatCardNumber(text);
    setCardNum(formattedTxt);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Card Number'}
        onChangeText={handleCardNumChange}
        value={cardNum}
        maxLength={19} // 19 because we're counting the three spaces between the 4 number groups
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});