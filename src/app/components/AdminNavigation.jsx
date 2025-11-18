import React from 'react';
import Link from "next/link";

const AdminNavigation = () => {
  return (
    <>
        <div className='navSection'>
            <div className="title">
                <Link href="/" className="link">
                    <h2>Holiday Resort</h2>
                </Link>
            </div>
            <p>Welcome:
                <span style={{color: 'yellow', marginLeft: '5px', fontSize: '1.2rem', border: 'none'}}>
                    Admin
                    </span>
            </p>
            <Link href="/signout" className='link'>
                <div className="logout">
                    Logout
                </div>
            </Link>
        </div>
    </>
  );
};

export default AdminNavigation;
