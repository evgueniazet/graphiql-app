'use client';

import Button from '../components/Button';
import { logout } from '../firebase';

export default function Home() {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      HomePage
      <Button type="button" text="Log Out" onClick={handleLogout} className={''}></Button>
    </>
  );
}
