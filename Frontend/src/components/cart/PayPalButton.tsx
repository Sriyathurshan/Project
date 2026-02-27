import React from 'react'
import { PayPalButtons ,PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }: { amount: number; onSuccess: (details: any) => void; onError: (err: any) => void }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AQ38jJBTrQoDt2GFf4Jlv9lhP_sb6Iao9vthw8jjIcJXhKS80v7RjHpDexFhU9WkATm_gZUATqveV6gp" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{amount: { value: amount }}]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
          }
        }
        // onSuccess={onSuccess}
        // onError={onError}
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton