import { useLocation, Link } from 'react-router-dom';

const ResultPage: React.FC = () => {
    const { state } = useLocation();
    const { success, refId, message } = state || { success: false, message: 'An unknown error occurred.' };

    return (
        <div className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
            {success ? (
                <>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Booking Confirmed</h1>
                    <p className="text-gray-600 text-lg mb-6">Ref ID: <span className="font-mono text-black bg-gray-200 px-2 py-1 rounded">{refId}</span></p>
                </>
            ) : (
                 <>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Booking Failed</h1>
                    <p className="text-gray-600 text-lg mb-6">{message}</p>
                </>
            )}
             <Link to="/" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition">
                Back to Home
            </Link>
        </div>
    );
};

export default ResultPage;