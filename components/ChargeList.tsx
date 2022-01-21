import { useEffect, useState } from 'react';
import { ScrollView, Pressable, StyleSheet } from 'react-native';
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
  const [totalCharged, setTotalCharged] = useState<number|string>('🔄');
  const { currentUser } = props;

  useEffect(() => {
    try {
      const chargesCollection = collection(firestore, 'stripe', currentUser.email, 'charges');
      let formattedCharges: ChargeListItem[] = [];

      onSnapshot((chargesCollection), (chargesSnapshot) => {
        formattedCharges = [];
        let newTotalCharged: number = 0;

        chargesSnapshot.forEach((doc) => {
          const chargeListItem = doc.data() as ChargeListItem;
          if (chargeListItem.status === 'succeeded' || chargeListItem.status === 'pending') newTotalCharged += Number(chargeListItem.amount);
          formattedCharges.push(chargeListItem);
        });

        setTotalCharged(newTotalCharged);
        setChargeList(formattedCharges);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <View style={chargeListStyles.container}>
      <View style={chargeListStyles.headerContainer}>
        <Text style={chargeListStyles.header}>Your previous charges:</Text>
        <Text style={chargeListStyles.uMarginTop3}>Total: ${totalCharged} (USD)</Text>
        <Text style={chargeListStyles.uMarginTop3}>(Click on card to view reciept)</Text>
      </View>
      <ScrollView  style={chargeListStyles.scrollView}>
        {chargesList.map((chargeListItem) => (
          <ChargeListItemPressable key={chargeListItem.stripe_charge_id} chargeListItem={chargeListItem} />
        ))}
      </ScrollView>
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
    amountTxt = `$${amount}`;
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
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
    height: 300,
  },
  uMarginTop3: {
    marginTop: 3,
  },
});

const chargeListItemStyles = StyleSheet.create({
  container: {
    maxWidth: 500,
    minWidth: 300,
    borderRadius: 13,
    marginBottom: 30,
    padding: 12,
    backgroundColor: '#f5f5f5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  mainView: {
    backgroundColor: '#f5f5f5',
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  thirdRow: {
    marginTop: 3,
    backgroundColor: '#f5f5f5',
  },
  secondaryInfo: {
    fontSize: 12,
    opacity: 0.5,
  }
});