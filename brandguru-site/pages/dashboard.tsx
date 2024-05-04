import Head from "next/head";
import BrandGuru from "@/components/brandguru";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {intitFirebase} from "@/firebase/firebaseApp";
import {useEffect, useState} from "react";
import Link from "next/link";

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
            content='generate branding snippet, brand name, keywords, and logo for your product'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='min-h-screen flex flex-col bg-sky-950'>
          <div className='p-4 flex justify-between items-center'>
            <p className='buttonSignOut'>Welcome, {user?.displayName}</p>
            <div className='flex items-center space-x-4 mr-28'>
              <Link href='/dashboard' className='buttonSignOut'>
                Brand Identity Assistant
              </Link>
              <Link href='/logo' className='buttonSignOut'>
                Brand Logo Assistant
              </Link>
            </div>
            <button className='buttonSignOut' onClick={() => auth.signOut()}>
              Sign Out
            </button>
          </div>
          <div className='flex-grow'>
            <BrandGuru />
          </div>
        </div>
      </>
    );
  }
}
