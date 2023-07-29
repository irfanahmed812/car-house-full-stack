import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {

    useEffect(() => {
        document.title = '404 Not Found'
    }, [])

    return (
        <div>
            <div id="error-page" className='shadow-2xl shadow-teal-500 rounded-xl'>
                <div class="content">
                    <h2 class="header" data-text="404">
                        404
                    </h2>
                    <h4 data-text="Opps! Page not found">
                        Opps! Page not found
                    </h4>
                    <p className='dark:text-white'>
                        Sorry, the page you're looking for doesn't exist. Please go back home.
                    </p>
                    <div class="pt-4">
                        <Link className='btn-outline btn-accent btn' to="/">return home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;