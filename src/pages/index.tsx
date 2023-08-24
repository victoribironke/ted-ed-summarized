import Footer from "@/components/Footer";
import Search from "@/components/Search";
import Videos from "@/components/Videos";
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Hanken_Grotesk } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const hanken_grotesk = Hanken_Grotesk({ subsets: ["latin"] });

const Home = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "admin/data"), (doc) => {
      if (doc.exists()) {
        const data = doc.data().generated;

        setSummaries(data);
      }
    });

    return unsub;
  }, []);

  return (
    <>
      <Head>
        <title>Ted-Ed Summarized</title>
        <link rel="shortcut icon" href="/main.png" type="image/x-icon" />
      </Head>
      <main
        className={`w-full flex flex-col gap-8 items-center ${hanken_grotesk.className}`}
      >
        <Search />
        <Link
          href="/add"
          className="max-w-xs text-black bg-white rounded-lg h-12 w-full flex items-center justify-center font-semibold"
        >
          Add New
        </Link>
        <Videos data={summaries} />
        <Footer />
      </main>
    </>
  );
};

export default Home;
