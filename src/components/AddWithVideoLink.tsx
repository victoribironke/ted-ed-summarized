import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { extractVideoId } from "@/utils/helpers";

const AddWithVideoLink = () => {
  const [link, setLink] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLink("");
    setPassword("");
  };

  const add = async () => {
    const videoId = extractVideoId(link);
    if (!videoId) {
      alert("Invalid link");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        process.env.NEXT_PUBLIC_EMAIL!,
        password
      );

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT}?id=${videoId}`
      );

      await updateDoc(doc(db, "admin/data"), {
        generated: arrayUnion(res.data.summaryPayload),
      });

      reset();
    } catch (e) {
      alert("Incorrect password.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFilled = [link, password].every((s) => s !== "");

    if (isFilled) setDisabled(false);
    else setDisabled(true);
  }, [link, password]);

  return (
    <>
      <input
        type="text"
        placeholder="Video link..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
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
          className="text-black bg-white rounded-lg flex items-center justify-center gap-3 h-12 w-full disabled:cursor-not-allowed disabled:bg-[#b3b3b3] font-semibold"
          disabled={disabled}
        >
          Add{" "}
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </button>

        <button
          onClick={reset}
          className="text-black bg-white rounded-lg h-12 w-full font-semibold"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default AddWithVideoLink;
