import Head from "next/head";
import AddManually from "@/components/AddManually";
import AddWithVideoLink from "@/components/AddWithVideoLink";
import { useState } from "react";
import Footer from "@/components/Footer";

const Add = () => {
  const [addMethod, setAddMethod] = useState<"manual" | "automatic">(
    "automatic"
  );

  const changeAddMethod = () => {
    setAddMethod((k) => (k === "manual" ? "automatic" : "manual"));
  };

  return (
    <>
      <Head>
        <title>Ted-Ed Summarized | Add New</title>
        <link rel="shortcut icon" href="/main.png" type="image/x-icon" />
      </Head>
      <main className="w-full max-w-5xl flex items-center justify-center gap-4 flex-col">
        <h1 className="text-white font-semibold text-3xl">Add New...</h1>

        {addMethod === "manual" ? <AddManually /> : <AddWithVideoLink />}

        <h1 className="text-white font-semibold text-3xl">Or...</h1>

        <button
          onClick={changeAddMethod}
          className="text-black max-w-lg bg-white rounded-lg h-12 w-full font-semibold"
        >
          Add {addMethod === "manual" ? "via API" : "manually"}
        </button>

        <Footer />
      </main>
    </>
  );
};

export default Add;
