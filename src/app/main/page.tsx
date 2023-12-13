import React from 'react';
import Header from '../../components/Header/page';
import styles from './Main.module.scss'
import Footer from '../../components/Footer/page';
const Main = () => {
    return (
        <main className={styles.main}>
            <Header />
            <h1> Main Page</h1>
            <Footer/>
        </main>
    );
};

export default Main;