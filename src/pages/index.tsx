import Footer from "@/components/Footer";
import Search from "@/components/Search";
import Videos from "@/components/Videos";
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { classNames } from "@/utils/helpers";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

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
        className={classNames(
          "w-full flex flex-col gap-8 items-center max-w-6xl",
          hankenGrotesk.className
        )}
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
