import { useEffect, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebase';

interface WithAuthProps {
  children?: ReactNode;
}

const withAuth = <P extends WithAuthProps>(
  MainPage: React.ComponentType<P>
) => {
  return (props: P) => {
    const [user] = useAuthState(auth);

    useEffect(() => {
      if (!user) {
        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }
      }
    }, [user]);

    return user ? <MainPage {...props} /> : <p>Loading...</p>;
  };
};

export default withAuth;
