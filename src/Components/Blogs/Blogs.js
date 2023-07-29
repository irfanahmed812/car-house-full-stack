import React, { useEffect } from 'react';

const Blogs = () => {

    useEffect(() => {
        document.title = 'Blogs'
    })

    return (
        <div className='text-center py-8'>
            <h1 className='text-2xl'>Blogs is comming soon...</h1>
        </div>
    );
};

export default Blogs;