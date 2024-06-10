
import { useLoaderData } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import CheckOut from './CheckOut';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const Payment = () => {
    
    const registerContest = useLoaderData();
    

 

    return (
        <div className='container mx-auto'>
            <h1 className="text-center pt-44 text-4xl font-extrabold capitalize">Payment & Submit the Task</h1>

            <p className='text-end font-bold pr-4'>Contest Price : {registerContest?.price ||0} $</p>
            <Elements stripe={stripePromise} >
                <CheckOut registerContest={registerContest}></CheckOut>
             

            </Elements>
            
        </div>
    );
};

export default Payment;
