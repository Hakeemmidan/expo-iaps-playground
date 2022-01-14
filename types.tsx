/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Modal: undefined;
  NotFound: undefined;
  Checkout: {
    grapeQty: string
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

enum chargeListItemStatusEnum { 
  succeeded = "succeeded",
  pending = "pending",
  failed = "failed"
}

export type ChargeListItem = {
  stripe_charge_id: string,
  amount: string,
  currency: string,
  created_formatted: string,
  receipt_url: string,
  status: chargeListItemStatusEnum,
}