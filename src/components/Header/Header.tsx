import Link from 'next/link';
import React from 'react'

const Header = () => {
    return (
        <header>
            <Link href='/welcome'>Welcome page</Link><br />
            <button>switch the language</button><br />
            <Link href='/user'>Login</Link>
        </header>
    );
};

export default Header;