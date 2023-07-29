import React, { useEffect } from 'react';

const Payment = () => {

    useEffect(() => {
        document.title = 'Dashboard - Payment'
    })

    return (
        <div className='flex justify-center py-5'>
            <h1 className='text-2xl'>Payment is comming soon...</h1>
        </div>
    );
};

export default Payment;