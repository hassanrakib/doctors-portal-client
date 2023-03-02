import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

// stripe promise that resolves to a stripe object
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  const { treatment, appointmentDate, slot, price } = booking;

  return (
    <div>
      <h1 className="text-3xl mb-4">Payment for {treatment}</h1>
      <p>
        Please pay <b>${price}</b> for your appointment on {appointmentDate} at{" "}
        {slot}
      </p>
      <div className="max-w-sm mt-8">
        {/* provider component that provides stripe object to all children inside */}
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
