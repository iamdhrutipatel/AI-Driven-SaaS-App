import Head from "next/head";
import Image from "next/image";
import logo from "@/public/BrandGuruLogo.png";
import Footer from "@/components/footer";
import {intitFirebase} from "@/firebase/firebaseApp";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {useState} from "react";

export default function Signin() {
  intitFirebase();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Failed to Sign In. Please try again!");
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-white text-3xl'>Loading...</div>
      </div>
    );
  }

  if (user) {
    router.push("/dashboard");
    return <div>Welcome {user.displayName}</div>;
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
      <div className='h-screen flex'>
        <div className='m-auto p-2 container max-w-md'>
          <div className='bg-gray-50 p-6 rounded-md text-black'>
            <div className='flex flex-col items-center justify-center text-center my-6'>
              <Image src={logo} width={140} alt={"BrandGuru Logo"} />
              <h1 className={"gradientTextStyle" + " text-4xl font-medium"}>
                BrandGuru
              </h1>
              <div className={"gradientTextStyle" + " text-base font-normal"}>
                Your AI Branding Assistant
              </div>
              <button
                className='buttonSubmitBack mt-6'
                onClick={signIn}
                disabled={isSigningIn}>
                SignIn with Google!
              </button>
              {error && (
                <div className='text-red-500 mt-6 font-bold'>{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
