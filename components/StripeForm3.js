import React, {useState} from 'react'
import styled from 'styled-components'
import {loadStripe} from '@stripe/stripe-js'
import {CardNumberElement,CardCvcElement,CardExpiryElement,
				Elements,ElementsConsumer,useElements,useStripe} from '@stripe/react-stripe-js'
import IconNextArrow from './IconNextArrow'

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const CheckoutStyledForm = styled.form`
  height: 5em;
  width: 100%;
  height: 5.5em;
  margin: 0em 1em 0em 0em;
  position: relative;
  transform: translateX(0em);
`
const CheckoutWrapperDiv = styled.div``
const FieldContainerDiv = styled.div`
  position: absolute;
  width: 100%;
  border: 1px solid #fff;
  z-index: 2;
  opacity: 1;
  transition: all 500ms $bouncy;
 -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  transform-origin: bottom;
  transition: transform 0.3s $bouncy, opacity 0.5s;
  opacity: 1;
  .StripeElement {
    background: transparent;
  }
	input::placeholder {
		color: ${(props) => props.fieldFocus ? '#FFFFFF' : 'transparent'};
	}
`
const FieldLabel = styled.label`
  --bouncy: cubic-bezier(.20, 1.3, .7, 1);
  color: #FFF;
  position: absolute;
  top: 0em;
  left: 0.2em;
  transition: transform 0.3s cubic-bezier(.20, 1.3, .7, 1), color 0.3s;
  transform: ${(props) => props.fieldFocus ? 'scale(0.8) translate(0em, -2.5em)' : 'none'};
	transform-origin: 0 0;
  font-size: 1.5em;
  line-height: 1;
	white-space: nowrap;
`
const CheckoutForm = ({fieldFocus,onFieldBlur,onFieldFocus,placeholderVisible}) => {
  const stripe = useStripe()
  const elements = useElements()
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
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus()
      return;
    }

    if (cardComplete) {
      setProcessing(true)
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: billingDetails
    })

    setProcessing(false)

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  }
	if (placeholderVisible != true) {
		Object.assign(ELEMENT_OPTIONS, {style: {base: {'::placeholder': { color: 'transparent' }}}})
	} else {
		Object.assign(ELEMENT_OPTIONS, {style: {base: {'::placeholder': { color: '#AAB7C4' }}}})
	}
	console.log('kdl placeholderVisible = true ', placeholderVisible, ELEMENT_OPTIONS)

  return (
      <CheckoutStyledForm id="cardForm" onSubmit={(event) => handleSubmit(event)}>
				<FieldContainerDiv>
        	<FieldLabel fieldFocus={fieldFocus} for="card-number">Card Number</FieldLabel>
        	<CardNumberElement
          	id={`${placeholderVisible ? "card-number placeholder-hidden" : "card-number"}`}
          	onBlur={onFieldBlur}
          	onChange={console.log('change')}
          	onFocus={onFieldFocus}
          	onReady={console.log('ready')}
          	options={ELEMENT_OPTIONS}
        	/>
				</FieldContainerDiv>        

				{/*<button type="submit" disabled={true}>
          Pay
        </button>*/}
      </CheckoutStyledForm>
  )
}
const CheckoutFormContainerDiv = styled.div`
  --primary: #282828;
  --success: #4CAF50;
  --error: #f44336;
  --small-screen: 467px;
  --bouncy: cubic-bezier(.20, 1.3, .7, 1);
  display: flex;
  width: 80%;
  margin: 0em auto;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-height: 260px;
  perspective: 100;
  position: relative;
  background-color: var(--primary);
  background: linear-gradient(185grad, darken(var(--primary), 20%), var(--primary));

  @media (max-width: $small-screen) {
    width: 90%;
  }
`
const FormControlsStepsDiv = styled.div`
  color: #FFFFFF;
  font-size: 1.5em;
  position: absolute;
  right: 1em;
  transform: translateY(-1.9em);
  opacity: 0.3;
`
const FormControlsNav = styled.nav`
  position: absolute;
  right: 0;
  z-index: 5;
  animation: arrowIntroScale 0.3s 0.4s $bouncy backwards;
  transition: transform 0.3s $bouncy;
  @media (max-width: $small-screen) {
     right: 0.5em;
  }
  a {
    cursor: pointer;
    display: inline-block;
    padding: 1em 0.5em;
    transform: scale(0.8);
    transition: transform 0.3s $bouncy;
    
    @media (max-width: $small-screen) {
      padding: 0.7em 0.1em;
      transform: scale(0.8);
    }
  }
  a:hover {
    transform: scale(0.9);
    transition: transform 0.1s $bouncy;
  }
`
const FormNextAnchor = styled.a`
  position: absolute;
  right: 0;
  top: .5em;
  z-index: 5;
  animation: arrowIntroScale 0.3s 0.4s $bouncy backwards;
  transition: transform 0.3s $bouncy;
  @media (max-width: $small-screen) {
     right: 0.5em;
  }
`
const CheckoutFormContainer = () => {
  const [fieldFocus, setFieldFocus] = useState(false)
	const [stepNumber, setStepNumber] = useState(1)
  const [placeholderVisible, setPlaceholderVisible] = useState(false)
	
	const stepNumberStepForward = () => {
		const newStepNumber = stepNumber + 1
		setStepNumber(newStepNumber)
	}
	const stepNumberStepBack = () => {
		const newStepNumber = stepNumber - 1
		setStepNumber(newStepNumber)
	}
  const onFieldBlur = () => {
		setFieldFocus(false)
		setPlaceholderVisible(false)
	}
	const onFieldFocus = () => {
    setFieldFocus(true)
		setPlaceholderVisible(true)
  }
  return (
		<CheckoutFormContainerDiv>
			<div>
    		<Elements stripe={stripePromise}>
					<FormControlsStepsDiv>{stepNumber}/4</FormControlsStepsDiv>					
					<FormControlsNav>
						<FormNextAnchor>
							<IconNextArrow />
						</FormNextAnchor>
					</FormControlsNav>
      		<CheckoutForm 
						fieldFocus={fieldFocus}
						onFieldBlur={onFieldBlur}
						onFieldFocus={onFieldFocus}
						placeholderVisible={placeholderVisible}
						stepNumber={stepNumber}
					/>
    		</Elements>
			</div>
		</CheckoutFormContainerDiv>
  )
}

export default CheckoutFormContainer

