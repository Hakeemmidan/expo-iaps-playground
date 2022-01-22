# Buy Grapes
A simple web/iOS/Android app that lets users signup, buy grapes, and view their previous transactions.

## Setup
1. `yarn install`
2. `yarn start`

There are no tests for now. This project was made just to analyze and understand the Expo the in-app purchases workflow and experience.

## Try it out
1. Login with Google.
2. Click on 'Checkout'.
3. Fill out the checkout page.
   1. Enter the email that you signed up with. (That way the transaction would get mapped to your account.)
   2. Enter one of the following test card numbers, depending on the case you want to see:
      - Success
        - 4242424242424242
      - Success but with [3DSecure](https://en.wikipedia.org/wiki/3-D_Secure)
        - 4000000000003220
      - Decline
        - 4000000000000002
4. You should now see the transaction showing in the UI after you close the checkout page.

## Tools used (and the use behind each):
- Expo
  - For making a web/iOS/Android compatable app using React Native.
- Firebase
  - For OAuth, and for storing transactions per user (stored in Firestore).
- Zapier
  - For a webhook that listens for Stripe charges and creates a transaction Firestore document for the associated user if there's any (mapped using email).
- Stripe
  - For payment processing.
  - A [Stripe Payments page](https://stripe.com/docs/connect/creating-a-payments-page) was used to not deal with creating a server, or with creating Firebase cloud functions (which require an account upgrade).

## Screenshot
<img width="800px" src="assets/images/app_screenshot.png" />

