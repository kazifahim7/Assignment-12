import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import usePublicAxios from "../hook/usePublicAxios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ registerContest }) => {
    const { user } = useContext(AuthContext);
    const price = parseInt(registerContest?.price);
    console.log(price);
    const axiosSecure=usePublicAxios()

   const [loading,setLoading]=useState(false)
   const navigate=useNavigate()
    
    const [error, setError] = useState('');
    const [clientSecret, setClientSecrete] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecrete(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const answer=e.target.answer.value;

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // confirm payment :--
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
        } else {
            console.log('payment intent ', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('payment success');
                setTransectionId(paymentIntent.id);

                // Save payment to the database
                const payment = {
                    registerId:registerContest?._id,
                    contestName: registerContest?.contestName,
                    contestType: registerContest?.contestType,
                    price: registerContest?.price,
                    prize: registerContest?.prize,
                    task: registerContest?.task,
                    image: registerContest?.image,
                    hostName: registerContest?.hostName,
                    hostEmail: registerContest?.hostEmail,
                    hostImage: registerContest?.hostImage,
                    ContestId: registerContest?.ContestId,
                    date: new Date(),
                    status: "pending",
                    participateUserName: user?.displayName,
                    participateUserEmail: user?.email,
                    participateUserPhoto: user?.photoURL,
                    answer,
                    tranSectionId: paymentIntent?.id,
                    ContestDate:registerContest?.dates
                    
                };

                await axiosSecure.post('/payments', payment)
                    .then(data => {
                        console.log('payment save', data.data);
                        Swal.fire({
                            title: "Good job!",
                            text: "You clicked the button!",
                            icon: "success"
                        });
                        navigate('/dashboard/participate')
                        setLoading(false)
                        e.target.reset()
                    });
            }
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="m-5">
            <div className="form-control mb-5">
                <label className="label">
                    <span className="label-text">Task : {registerContest?.task}</span>
                </label>
                <textarea name="answer" className="textarea textarea-accent w-full " placeholder="write the answer" required ></textarea>
            </div>

            <CardElement
                className="border mx-10 p-5 border-[#0ecdb9]"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#0ecdb9',
                            '::placeholder': {
                                color: '#0ecdb9',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="flex justify-center">
                <button className="btn text-white bg-[#0ecdb9] w-1/2 my-10" type="submit" disabled={!stripe || !clientSecret}>
                    {loading ? <ImSpinner9 className='animate-spin mx-auto'></ImSpinner9> : 'pay'}
                </button>
                <p className="text-red-600">{error}</p>
                {transectionId && <p className="text-green-600">Your transaction ID is: {transectionId}</p>}
            </div>
        </form>

    );
};

export default CheckOut;