import { PayPalButtons ,PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }: { amount: number; onSuccess: (details: any) => void; onError: (err: any) => void }) => {
  return (
    <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{amount: { currency_code: "USD", value: amount.toFixed(2) }}]
          });
        }}
        onApprove={(_data, actions) => {
          return actions.order!.capture().then(onSuccess);
          }
        }
        onError={onError}
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
