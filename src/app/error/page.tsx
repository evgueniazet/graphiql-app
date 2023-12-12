import Link from 'next/link';
import React from 'react'

const ErrorPage = () => {
    return (
        <div>
            <h1>ErrorPage</h1>
            <Link href='/'>Home page</Link>
        </div>
    );
};

export default ErrorPage;