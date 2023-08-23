import Head from "next/head";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const Add = () => {
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [videoPublished, setVideoPublished] = useState("");
  const [summaryGenerated, setSummaryGenerated] = useState("");
  const [summaryUrl, setSummaryUrl] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const reset = () => {
    setId("");
    setImageUrl("");
    setPassword("");
    setSummaryGenerated("");
    setTitle("");
    setVideoPublished("");
    setSummaryUrl("");
  };

  const add = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        process.env.NEXT_PUBLIC_EMAIL!,
        password
      );

      await updateDoc(doc(db, "admin/data"), {
        generated: arrayUnion({
          id,
          imageUrl,
          title,
          videoPublished,
          summaryGenerated,
          summaryUrl,
        }),
      });

      reset();
    } catch (e) {
      alert("Incorrect password.");
    }
  };

  useEffect(() => {
    const isFilled = [
      id,
      imageUrl,
      title,
      videoPublished,
      summaryGenerated,
      password,
      summaryUrl,
    ].every((s) => s !== "");

    if (isFilled) setDisabled(false);
    else setDisabled(true);
  }, [
    id,
    imageUrl,
    title,
    videoPublished,
    summaryGenerated,
    password,
    summaryUrl,
  ]);

  return (
    <>
      <Head>
        <title>Ted-Ed Summarized | Add New</title>
        <link rel="shortcut icon" href="/main.png" type="image/x-icon" />
      </Head>
      <main className="w-full max-w-5xl flex items-center justify-center gap-4 flex-col">
        <h1 className="text-white font-semibold text-3xl">Add New...</h1>

        <input
          type="text"
          placeholder="Video ID..."
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="text"
          placeholder="Image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="text"
          placeholder="Video published date..."
          value={videoPublished}
          onChange={(e) => setVideoPublished(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="text"
          placeholder="Summary URL..."
          value={summaryUrl}
          onChange={(e) => setSummaryUrl(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="text"
          placeholder="Summary generated date..."
          value={summaryGenerated}
          onChange={(e) => setSummaryGenerated(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <div className="w-full flex gap-4 max-w-lg flex-col sm:flex-row">
          <button
            onClick={add}
            className="text-black bg-white rounded-lg h-12 w-full disabled:cursor-not-allowed disabled:bg-[#b3b3b3] font-semibold"
            disabled={disabled}
          >
            Add
          </button>

          <button
            onClick={reset}
            className="text-black bg-white rounded-lg h-12 w-full font-semibold"
          >
            Reset
          </button>
        </div>
      </main>
    </>
  );
};

export default Add;
