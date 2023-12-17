import type { Metadata } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';
import ErrorBoundary from '../components/ErrorBoundary/page';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL',
  description: 'Generated by create next app',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ErrorBoundary>
  );
};

export default RootLayout;
