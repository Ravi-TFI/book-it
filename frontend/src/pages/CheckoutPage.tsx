// import { useState } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { createBooking } from '../services/api';

// const CheckoutPage: React.FC = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const { experience, slot, total, taxes } = state || {};

//     const [userInfo, setUserInfo] = useState({ fullName: '', email: '' });
//     const [promo, setPromo] = useState('');
//     const [agree, setAgree] = useState(false);
//     const [error, setError] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);

//     if (!experience) {
//         return <div className="text-center p-10">Invalid checkout state. <Link to="/" className="text-blue-600">Go Home</Link></div>;
//     }

//     const handleBooking = async () => {
//         if (!agree || !userInfo.fullName || !userInfo.email) {
//             setError('Please fill all fields and agree to the terms.');
//             return;
//         }
//         setError('');
//         setIsProcessing(true);

//         try {
//             const response = await createBooking({
//                 slot_id: slot.id,
//                 user_name: userInfo.fullName,
//                 user_email: userInfo.email,
//                 promo_code: promo,
//                 final_price: total,
//             });
//             if (response.success) {
//                 navigate('/result', { state: { success: true, refId: response.refId } });
//             } else {
//                 throw new Error(response.message || 'Booking failed');
//             }
//         } catch (err: any) {
//             navigate('/result', { state: { success: false, message: err.response?.data?.message || err.message } });
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 md:p-8">
//             <Link to={`/details/${experience.id}`} className="text-gray-600 hover:text-black mb-6 inline-block">← Back to Details</Link>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
//                     <h2 className="text-3xl font-bold mb-6">Checkout</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
//                             <input type="text" placeholder="John Doe" value={userInfo.fullName} onChange={e => setUserInfo({...userInfo, fullName: e.target.value})} className="p-3 border rounded-md w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                             <input type="email" placeholder="test@test.com" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} className="p-3 border rounded-md w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none" />
//                         </div>
//                     </div>
//                     <div className="flex mb-6">
//                         <input type="text" placeholder="Promo code" value={promo} onChange={e => setPromo(e.target.value)} className="p-3 border rounded-l-md w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none" />
//                         <button className="bg-gray-800 text-white font-bold px-6 rounded-r-md hover:bg-black">Apply</button>
//                     </div>
//                     <div className="flex items-center">
//                         <input type="checkbox" id="terms" checked={agree} onChange={e => setAgree(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"/>
//                         <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the terms and safety policy</label>
//                     </div>
//                     {error && <p className="text-red-500 mt-4">{error}</p>}
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-28">
//                     <h3 className="text-xl font-bold mb-4 border-b pb-3">Summary</h3>
//                     <div className="space-y-2 mb-4">
//                       <div className="flex justify-between"><p className="text-gray-600">Experience</p><p className="font-semibold">{experience.title}</p></div>
//                       <div className="flex justify-between"><p className="text-gray-600">Date</p><p className="font-semibold">{new Date(slot.slot_date).toLocaleDateString()}</p></div>
//                       <div className="flex justify-between"><p className="text-gray-600">Time</p><p className="font-semibold">{slot.start_time}</p></div>
//                     </div>
//                     <div className="space-y-2 border-t pt-4">
//                       <div className="flex justify-between"><p className="text-gray-600">Subtotal</p><p className="font-semibold">₹{total - taxes}</p></div>
//                       <div className="flex justify-between mb-4"><p className="text-gray-600">Taxes</p><p className="font-semibold">₹{taxes}</p></div>
//                       <div className="flex justify-between font-bold text-2xl border-t pt-4"><p>Total</p><p>₹{total}</p></div>
//                     </div>
//                     <button onClick={handleBooking} disabled={isProcessing} className="mt-6 w-full bg-yellow-400 text-black font-bold py-3 rounded-lg transition hover:bg-yellow-500 disabled:bg-gray-300">
//                         {isProcessing ? 'Processing...' : 'Pay and Confirm'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;


import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createBooking, validatePromo } from '../services/api';

const CheckoutPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { experience, slot, subtotal, taxes, quantity } = state || { experience: null, slot: null, subtotal: 0, taxes: 0, quantity: 0 };

    const [userInfo, setUserInfo] = useState({ fullName: '', email: '' });
    const [formErrors, setFormErrors] = useState({ fullName: '', email: '' });
    const [promoCodeInput, setPromoCodeInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<any>(null);
    const [promoMessage, setPromoMessage] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'fullName' && value.trim().length < 2) {
            error = 'Full name must be at least 2 characters.';
        } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Please enter a valid email address.';
        }
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const discount = useMemo(() => {
        if (!appliedPromo) return 0;
        if (appliedPromo.discount_type === 'FLAT') {
            return Number(appliedPromo.discount_value);
        }
        if (appliedPromo.discount_type === 'PERCENT') {
            return subtotal * (Number(appliedPromo.discount_value) / 100);
        }
        return 0;
    }, [appliedPromo, subtotal]);

    const finalTotal = subtotal - discount + taxes;

    const handleApplyPromo = async () => {
        if (!promoCodeInput) return;
        try {
            const promoData = await validatePromo(promoCodeInput);
            setAppliedPromo(promoData);
            setPromoMessage(`Success! "${promoData.code}" applied.`);
        } catch (err: any) {
            setAppliedPromo(null);
            setPromoMessage(err.response?.data?.message || 'Invalid code.');
        }
    };

    const handleBooking = async () => {
        validateField('fullName', userInfo.fullName);
        validateField('email', userInfo.email);
        if (formErrors.fullName || formErrors.email || !userInfo.fullName || !userInfo.email) {
            setError('Please fill in your name and email.');
            return;
        }
        if (!agree) {
            setError('You must agree to the terms and safety policy.');
            return;
        }

        setError('');
        setIsProcessing(true);

        try {
            const response = await createBooking({
                slot_id: slot.id,
                user_name: userInfo.fullName,
                user_email: userInfo.email,
                promo_code: appliedPromo ? appliedPromo.code : '',
                final_price: finalTotal,
            });
            if (response.success) {
                navigate('/result', { state: { success: true, refId: response.refId } });
            } else {
                throw new Error(response.message || 'Booking failed');
            }
        } catch (err: any) {
            navigate('/result', { state: { success: false, message: err.response?.data?.message || err.message } });
        } finally {
            setIsProcessing(false);
        }
    };

    if (!experience) {
        return <div className="text-center p-10">Invalid checkout state. <Link to="/" className="text-blue-600">Go Home</Link></div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Link to={`/details/${experience.id}`} className="text-gray-600 hover:text-black mb-6 inline-block">← Back</Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6">Checkout</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                            {/* <input type="text" placeholder="John Doe" value={userInfo.fullName} onChange={e => setUserInfo({...userInfo, fullName: e.target.value})} className="p-3 border rounded-md w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none" /> */}
                            <input type="text" name="fullName" placeholder="John Doe" value={userInfo.fullName} onChange={handleInputChange} className={`p-3 border rounded-md w-full bg-gray-50 focus:bg-white focus:ring-2 outline-none ${formErrors.fullName ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-yellow-400'}`}/>
                            {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            {/* <input type="email" placeholder="test@test.com" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} className="p-3 border rounded-md w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none" /> */}
                            <input type="email" name="email" placeholder="test@test.com" value={userInfo.email} onChange={handleInputChange} className={`p-3 border rounded-md w-full bg-gray-50 focus:bg-white focus:ring-2 outline-none ${formErrors.email ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-yellow-400'}`}/>
                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                        </div>
                    </div>
                    
                    <div className="mb-6">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Promo code (optional)</label>
                        <div className="flex">
                            <input type="text" placeholder="Enter code" value={promoCodeInput} onChange={e => setPromoCodeInput(e.target.value.toUpperCase())} className="p-3 border rounded-l-md w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none" />
                            <button onClick={handleApplyPromo} className="bg-gray-800 text-white font-bold px-6 rounded-r-md hover:bg-black">Apply</button>
                        </div>
                        {promoMessage && <p className={`text-sm mt-2 ${appliedPromo ? 'text-green-600' : 'text-red-600'}`}>{promoMessage}</p>}
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="terms" checked={agree} onChange={e => setAgree(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"/>
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the terms and safety policy</label>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-28">
                    <h3 className="text-xl font-bold mb-4 border-b pb-3">Summary</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between"><p className="text-gray-600">Experience</p><p className="font-semibold">{experience.title}</p></div>
                      <div className="flex justify-between"><p className="text-gray-600">Date</p><p className="font-semibold">{new Date(slot.slot_date).toLocaleDateString()}</p></div>
                      <div className="flex justify-between"><p className="text-gray-600">Time</p><p className="font-semibold">{slot.start_time}</p></div>
                      <div className="flex justify-between"><p className="text-gray-600">Quantity</p><p className="font-semibold">{quantity}</p></div>
                    </div>
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between"><p className="text-gray-600">Subtotal</p><p className="font-semibold">₹{subtotal.toFixed(2)}</p></div>
                      {appliedPromo && <div className="flex justify-between text-green-600"><p>Discount</p><p className="font-semibold">- ₹{discount.toFixed(2)}</p></div>}
                      <div className="flex justify-between mb-4"><p className="text-gray-600">Taxes</p><p className="font-semibold">₹{taxes.toFixed(2)}</p></div>
                      <div className="flex justify-between font-bold text-2xl border-t pt-4"><p>Total</p><p>₹{finalTotal.toFixed(2)}</p></div>
                    </div>
                    <button onClick={handleBooking} disabled={isProcessing} className="mt-6 w-full bg-yellow-400 text-black font-bold py-3 rounded-lg transition hover:bg-yellow-500 disabled:bg-gray-300">
                        {isProcessing ? 'Processing...' : 'Pay and Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;