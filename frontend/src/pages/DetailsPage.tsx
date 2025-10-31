// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getExperienceDetails } from '../services/api';
// import { ExperienceDetails, Slot } from '../types/index';

// const DetailsPage: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const [data, setData] = useState<ExperienceDetails | null>(null);
//     const [selectedDate, setSelectedDate] = useState<string | null>(null);
//     const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

//     useEffect(() => {
//         if (id) {
//             getExperienceDetails(id)
//                 .then(res => {
//                     setData(res);
//                     if (res.slots.length > 0) {
//                         const firstDate = res.slots[0].slot_date;
//                         setSelectedDate(firstDate);
//                     }
//                 })
//                 .catch(console.error);
//         }
//     }, [id]);

//     if (!data) return <div className="text-center p-10">Loading...</div>;

//     const { details, slots } = data;
//     const uniqueDates = [...new Set(slots.map(s => s.slot_date))];
//     const slotsForDate = slots.filter(s => s.slot_date === selectedDate);
//     const taxes = 59;
//     const total = details.price + taxes;

//     const handleConfirm = () => {
//         if (selectedSlot) {
//             navigate('/checkout', { state: { experience: details, slot: selectedSlot, total, taxes } });
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 md:p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2">
//                     <img src={details.image_url} alt={details.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-6 shadow-lg"/>
//                     <h1 className="text-4xl font-bold mb-2">{details.title}</h1>
//                     <p className="text-gray-600 mb-6">{details.description}</p>
//                     <div className="space-y-6">
//                         <div>
//                             <h2 className="text-2xl font-bold mb-3">Choose date</h2>
//                             <div className="flex flex-wrap gap-3">
//                                 {uniqueDates.map(date => (
//                                     <button key={date} onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
//                                         className={`px-4 py-2 rounded-md border-2 transition ${selectedDate === date ? 'bg-black text-white border-black' : 'bg-white hover:border-gray-400'}`}>
//                                         {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-bold mb-3">Choose time</h2>
//                             <div className="flex flex-wrap gap-3">
//                                 {slotsForDate.map(slot => (
//                                     <button key={slot.id} onClick={() => setSelectedSlot(slot)} disabled={slot.slots_left === 0}
//                                         className={`px-4 py-2 rounded-md border-2 transition ${selectedSlot?.id === slot.id ? 'bg-black text-white border-black' : 'bg-white'} 
//                                         ${slot.slots_left === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'hover:border-gray-400'}`}>
//                                         {slot.start_time} - {slot.slots_left === 0 ? 'Sold out' : `${slot.slots_left} left`}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-28">
//                     <div className="space-y-2 border-b pb-4 mb-4">
//                         <div className="flex justify-between"><p className="text-gray-600">Starts at</p><p className="font-semibold">₹{details.price}</p></div>
//                         <div className="flex justify-between"><p className="text-gray-600">Quantity</p><p className="font-semibold">1</p></div>
//                         <div className="flex justify-between"><p className="text-gray-600">Taxes</p><p className="font-semibold">₹{taxes}</p></div>
//                     </div>
//                     <div className="flex justify-between font-bold text-2xl mb-6"><p>Total</p><p>₹{total}</p></div>
//                     <button onClick={handleConfirm} disabled={!selectedSlot} className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition hover:bg-yellow-500">
//                         Confirm
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailsPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExperienceDetails } from '../services/api';
import { ExperienceDetails, Slot } from '../types';

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<ExperienceDetails | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [quantity, setQuantity] = useState(1); 

    useEffect(() => {
        if (id) {
            getExperienceDetails(id)
                .then(res => {
                    setData(res);
                    if (res.slots.length > 0) setSelectedDate(res.slots[0].slot_date);
                })
                .catch(console.error);
        }
    }, [id]);

    if (!data) return <div className="text-center p-10">Loading...</div>;

    const { details, slots } = data;
    const uniqueDates = [...new Set(slots.map(s => s.slot_date))];
    const slotsForDate = slots.filter(s => s.slot_date === selectedDate);
    const taxes = 59;
    
    const subtotal = Number(details.price) * quantity;
    const total = subtotal + taxes;

    const handleConfirm = () => {
        if (selectedSlot) {
            navigate('/checkout', { state: { experience: details, slot: selectedSlot, total, taxes, quantity, subtotal } });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <img src={details.image_url} alt={details.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-6 shadow-lg"/>
                    <h1 className="text-4xl font-bold mb-2">{details.title}</h1>
                    <p className="text-gray-600 mb-6">{details.description}</p>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Choose date</h2>
                            <div className="flex flex-wrap gap-3">
                                {uniqueDates.map(date => (
                <button 
                    key={date} 
                    onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                    className={`px-4 py-2 rounded-md border-2 transition ${selectedDate === date ? 'bg-black text-white border-black' : 'bg-white hover:border-gray-400'}`}
                >
                    {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                </button>
            ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Choose time</h2>
                            <div className="flex flex-wrap gap-3">
                                {slotsForDate.map(slot => (
                                    <button key={slot.id} onClick={() => setSelectedSlot(slot)} disabled={slot.slots_left === 0}
                                        className={`px-4 py-2 rounded-md border-2 transition relative ${selectedSlot?.id === slot.id ? 'bg-black text-white border-black' : 'bg-white'} 
                                        ${slot.slots_left === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'hover:border-gray-400'}`}>
                                        {slot.start_time}
                                        
                                        <span className={`absolute -top-2 -right-2 text-xs font-bold px-1.5 py-0.5 rounded-full ${slot.slots_left === 0 ? 'bg-gray-400 text-white' : 'bg-red-100 text-red-600'}`}>
                                            {slot.slots_left === 0 ? 'Sold out' : `${slot.slots_left} left`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-3">About</h2>
                        <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                           <p className="text-gray-700 text-sm">Scenic routes, trained guides and safety briefing. Minimum age 10.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-28">
                    <div className="space-y-2 border-b pb-4 mb-4">
                        <div className="flex justify-between"><p className="text-gray-600">Starts at</p><p className="font-semibold">₹{details.price}</p></div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-600">Quantity</p>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold">-</button>
                                <span className="font-semibold w-4 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between"><p className="text-gray-600">Subtotal</p><p className="font-semibold">₹{subtotal.toFixed(2)}</p></div>
                        <div className="flex justify-between"><p className="text-gray-600">Taxes</p><p className="font-semibold">₹{taxes}</p></div>
                    </div>
                    <div className="flex justify-between font-bold text-2xl mb-6"><p>Total</p><p>₹{total.toFixed(2)}</p></div>
                    <button onClick={handleConfirm} disabled={!selectedSlot} className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition hover:bg-yellow-500">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;