import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";

import { firestore } from '../helpers/firebase';
import { View, Text } from './Themed';
import { ChargeListItem } from '../types';
import { CurrentUser } from '../contexts/AppContext';
import { openBrowserAsync } from 'expo-web-browser';

interface ChargeListProps {
  currentUser: CurrentUser
}

export function ChargeList(props: ChargeListProps) {
  const [chargesList, setChargeList] = useState<ChargeListItem[]>([]);
  const { currentUser } = props;

  useEffect(() => {
    try {
      const chargesCollection = collection(firestore, 'stripe', currentUser.email, 'charges');
      let formattedCharges: ChargeListItem[] = [];

      onSnapshot((chargesCollection), (chargesSnapshot) => {
        formattedCharges = [];

        chargesSnapshot.forEach((doc) => {
          const chargeListItem = doc.data() as ChargeListItem;
          formattedCharges.push(chargeListItem);
        });

        setChargeList(formattedCharges);
      });
    } catch (e) {
      console.error(e);
    }
  }, [chargesList]);

  return (
    <View>
      <View style={chargeListStyles.headerContainer}>
        <Text style={chargeListStyles.header}>Your previous charges:</Text>
        <Text>(Click on card to view reciept)</Text>
      </View>
      <View>
        {chargesList.map((chargeListItem) => (
          <ChargeListItemPressable key={chargeListItem.stripe_charge_id} chargeListItem={chargeListItem} />
        ))}
      </View>
    </View>
  );
};

function ChargeListItemPressable({ chargeListItem }: { chargeListItem: ChargeListItem }) {
  const { created_formatted, status, amount, receipt_url } = chargeListItem;
  let amountTxt: string = `-$${amount}`;
  let statusTxt: string;
  let infoTxt: string = '';

  if (status === 'succeeded') {
    statusTxt = '✅ Succeeded';
  } else if (status === 'pending') {
    statusTxt = '🔄 Pending';
  } else if (status === 'failed') {
    statusTxt = '❌ Failed';
    infoTxt = 'ⓘ You did not get charged, or a refund is on the way. You can try to re-order again.';
  } else {
    amountTxt = '---';
    statusTxt = 'Something went wrong. Please contact app developer.';
    infoTxt = '';
  }

  return (
    <Pressable style={chargeListItemStyles.container} onPress={() => openBrowserAsync(receipt_url) }>
      <View style={chargeListItemStyles.mainView}>
        <Text>{created_formatted}</Text>
        <View style={chargeListItemStyles.secondRow}>
          <Text>{statusTxt}</Text>
          <Text>{amountTxt}</Text>
        </View>
        <View style={chargeListItemStyles.thirdRow}>
          <Text style={chargeListItemStyles.secondaryInfo}>
            {infoTxt}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const chargeListStyles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const chargeListItemStyles = StyleSheet.create({
  container: {
    width: 500,
    borderRadius: 13,
    marginBottom: 30,
    padding: 12,
    backgroundColor: 'whitesmoke',
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  mainView: {
    backgroundColor: 'inherit',
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'inherit',
  },
  thirdRow: {
    marginTop: 3,
    backgroundColor: 'inherit',
  },
  secondaryInfo: {
    fontSize: 12,
    opacity: 0.5,
  }
});