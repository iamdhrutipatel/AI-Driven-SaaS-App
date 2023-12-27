import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.css";
import BrandGuru from "@/components/brandguru";
import Footer from "@/components/footer";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const auth = getAuth();
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-white text-3xl'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>BrandGuru - An AI Assistant for Marketing</title>
        <meta
          name='description'
          content='generate branding snipeet, brand name and, keywords for your product'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="flex justify-between ml-4 mr-4">
        <p className="buttonSignOut">Welcome, {user?.displayName}</p>
        <button className="buttonSignOut" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      </div>
      <BrandGuru />
    </>
  );
}
