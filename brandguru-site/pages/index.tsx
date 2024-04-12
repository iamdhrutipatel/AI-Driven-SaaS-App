import Head from "next/head";
import Image from "next/image";
import logo from "@/public/BrandGuruLogo.png";
import Footer from "@/components/footer";
import {intitFirebase} from "@/firebase/firebaseApp";
import {
  getAuth,
  OAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {useState} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Signin() {
  intitFirebase();

  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");
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
    } catch (error: any) {
      if (error.code) {
        if (error.code === "auth/account-exists-with-different-credential") {
          setError("Account exists with different provider. Try another sign-in method.");
        } else {
          setError("Failed to Sign In. Please try again!");
        }
      } else {
        setError("Failed to Sign In. Please try again!");
      }
      setIsSigningIn(false);
    }
  };

  const githubsignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithPopup(auth, githubProvider);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code) {
        if (error.code === "auth/account-exists-with-different-credential") {
          setError("Account exists with different provider. Try another sign-in method.");
        } else {
          setError("Failed to Sign In. Please try again!");
        }
      } else {
        setError("Failed to Sign In. Please try again!");
      }
      setIsSigningIn(false);
    }
  };  

  const microsoftsignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithPopup(auth, microsoftProvider);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code) {
        if (error.code === "auth/account-exists-with-different-credential") {
          setError("Account exists with different provider. Try another sign-in method.");
        } else {
          setError("Failed to Sign In. Please try again!");
        }
      } else {
        setError("Failed to Sign In. Please try again!");
      }
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
    return <div>Welcome, {user.displayName}</div>;
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
                className='buttonSubmitBack mt-4'
                onClick={signIn}
                disabled={isSigningIn}>
                <i className='fab fa-google'></i> Sign In with Google
              </button>

              <button
                className='buttonSubmitBack mt-2'
                onClick={githubsignIn}
                disabled={isSigningIn}>
                <i className='fab fa-github'></i> Sign In with GitHub
              </button>
              <button
                className='buttonSubmitBack mt-2'
                onClick={microsoftsignIn}
                disabled={isSigningIn}>
                <i className='fab fa-microsoft'></i> Sign In with Microsoft
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
