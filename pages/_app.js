// pages/_app.js
import "@/styles/globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '400', '600', '700'],
  subsets: ['latin'], 
  display: 'swap', 
});

export default function App({ Component, pageProps }) {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  );
}
