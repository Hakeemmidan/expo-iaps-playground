import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { PressableButton, Text, TextInput, View } from '../components/Themed';
import { formatCardNumber, formatCardExpirationDate } from '../helpers/general';


export function CheckoutForm() {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleCardNumChange = (text: string) => {
    const formattedTxt = formatCardNumber(text);
    setCardNum(formattedTxt);
  };

  const handleCardExpChange = (text: string) => {
    const formattedTxt = formatCardExpirationDate(text);
    setCardExp(formattedTxt);
  };

  return (
    <View>
      <Text>
        Card Holder Name:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={'FirstName lastName'}
        onChangeText={setCardHolderName}
        value={cardHolderName}
      />
      <Text>
        Card Number:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={'0000 0000 0000 0000'}
        onChangeText={handleCardNumChange}
        value={cardNum}
        maxLength={19} // 19 because we're counting the three spaces between the 4 number groups
        keyboardType="numeric"
      />
      <Text>
        Card Expiration:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={'MM/YY'}
        onChangeText={handleCardExpChange}
        value={cardExp}
        maxLength={5}
        keyboardType="numeric"
      />
      <Text>
        Card CVV:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={'0000'}
        onChangeText={setCardCvv}
        value={cardCvv}
        maxLength={4}
        keyboardType="numeric"
      />
      <br/>
      <PressableButton title={'Buy grapes!'} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});