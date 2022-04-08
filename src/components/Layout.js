import Head from 'next/head';
// import component Navbar
import { Navbar } from './Navbar';

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>CRUD USER APP</title>
    </Head>
    <Navbar />
    {children}
  </>
);
