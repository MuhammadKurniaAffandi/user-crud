// import component Layout
import { Layout } from '../components/Layout';
// import module semantic ui
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
