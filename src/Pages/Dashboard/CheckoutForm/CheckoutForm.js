import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  const { patientName, email, price } = booking;
  const [paymentError, setPaymentError] = useState("");

  // reference the stripe object
  const stripe = useStripe();

  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if Stripe.js script has not loaded yet
    if (!stripe || !elements) {
      return;
    }

    //   reference the mounted payment element
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentError("");
      console.log(paymentMethod);
    }

    const { paymentIntent, error: paymentConfirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email,
          },
        },
      });

    if (paymentConfirmationError) {
      setPaymentError(paymentConfirmationError.message);
      return;
    }

    console.log(paymentIntent);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* payment element that collects payment information */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-error mt-4">{paymentError}</p>
      <button
        className="btn btn-sm btn-accent mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
