import React from 'react'
import { PayPalButtons ,PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }: { amount: number; onSuccess: (details: any) => void; onError: (err: any) => void }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{amount: { value: amount.toString() }}]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
          }
        }
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton