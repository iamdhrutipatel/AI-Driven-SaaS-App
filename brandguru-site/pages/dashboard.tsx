import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import BrandGuru from "@/components/brandguru";
import Footer from "@/components/footer";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {intitFirebase} from "@/firebase/firebaseApp";
import {useEffect, useState} from "react";

export default function Home() {
  intitFirebase();

  const auth = getAuth();

  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
        } else {
          router.push("/");
        }
      });
    };

    checkAuth();
  }, [auth, router]);

  if (isUserValid) {
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
        <div className='flex justify-between ml-4 mr-4'>
          <p className='buttonSignOut'>Welcome, {user?.displayName}</p>
          <button className='buttonSignOut' onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </div>
        <BrandGuru />
      </>
    );
  }
}
