import Link from 'next/link';
import React from 'react'

const Welcome = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <Link href='/'>Home page</Link>
        </div>
    );
};

export default Welcome;