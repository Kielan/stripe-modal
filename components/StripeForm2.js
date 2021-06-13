import React, {useState} from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, Elements, ElementsConsumer, useElements, useStripe} from '@stripe/react-stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: ""
  })

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

		console.log('handleSubmit stripe & elements')
		
		if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
		
		console.log('handlesubmit stripe.js has been loaded')
    
		if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    })

		setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  }

  return (
      <form onSubmit={(event) => handleSubmit(event)}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={true}>
          Pay
        </button>
      </form>
  )
}

const InjectedCheckoutForm = () => {
  return (
  <ElementsConsumer>
    {({elements, stripe}) => (
      <CheckoutForm elements={elements} stripe={stripe} />
    )}
  </ElementsConsumer>
  )
}

const CheckoutFormContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default CheckoutFormContainer

