import Head from "next/head";
import AddManually from "@/components/AddManually";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import GetVideoData from "@/components/GetVideoData";
import { auth } from "@/firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Add = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        process.env.NEXT_PUBLIC_EMAIL!,
        password
      );
    } catch (e) {
      alert("Incorrect password.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) setDisabled(false);
    else setDisabled(true);
  }, [password]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (a) => {
      if (a) setSignedIn(true);
      else setSignedIn(false);
    });
    console.log(auth.currentUser);
    return unsub;
  }, []);

  return (
    <>
      <Head>
        <title>Ted-Ed Summarized | Add New</title>
        <link rel="shortcut icon" href="/main.png" type="image/x-icon" />
      </Head>
      <main className="w-full max-w-5xl flex items-center justify-center gap-4 flex-col">
        {signedIn ? (
          <>
            <h1 className="text-white font-semibold text-3xl">Add new...</h1>

            <h1 className="text-white font-semibold text-2xl">
              Get video data...
            </h1>

            <GetVideoData />

            <h1 className="text-white font-semibold text-2xl">
              Add to database...
            </h1>

            <AddManually />
          </>
        ) : (
          <>
            <h1 className="text-white font-semibold text-3xl">Sign in...</h1>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 py-2 px-5  bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
            />

            <button
              onClick={signIn}
              className="text-black max-w-lg bg-white rounded-lg flex items-center justify-center gap-3 h-12 w-full disabled:cursor-not-allowed disabled:bg-[#b3b3b3] font-semibold"
              disabled={disabled}
            >
              Sign in
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
            </button>
          </>
        )}

        <Footer />
      </main>
    </>
  );
};

export default Add;
