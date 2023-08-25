import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { videoData } from "@/atoms/atoms";
import { useRecoilState } from "recoil";

const AddManually = () => {
  const [summaryGenerated, setSummaryGenerated] = useState(
    new Date().toISOString()
  );
  const [summaryUrl, setSummaryUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [{ thumbnail, publishedAt, title, videoId }, setVideoInfo] =
    useRecoilState(videoData);

  const reset = () => {
    setSummaryUrl("");
    setVideoInfo({
      thumbnail: "",
      publishedAt: "",
      title: "",
      videoId: "",
    });
  };

  const add = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "admin/data"), {
        generated: arrayUnion({
          id: videoId,
          imageUrl: thumbnail,
          title,
          videoPublished: publishedAt,
          summaryGenerated,
          summaryUrl,
        }),
      });

      reset();
    } catch (e) {
      alert("Incorrect password.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFilled = [
      title,
      summaryGenerated,
      summaryUrl,
      thumbnail,
      publishedAt,
      title,
      videoId,
    ].every((s) => s !== "");

    if (isFilled) setDisabled(false);
    else setDisabled(true);
  }, [
    title,
    summaryGenerated,
    summaryUrl,
    thumbnail,
    publishedAt,
    title,
    videoId,
  ]);

  return (
    <>
      <div className="w-full flex gap-4 max-w-lg flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Video ID..."
          value={videoId}
          disabled
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg disabled:cursor-not-allowed"
        />

        <input
          type="text"
          placeholder="Image URL..."
          value={thumbnail}
          disabled
          className="w-full h-12 py-2 px-5 disabled:cursor-not-allowed bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />
      </div>

      <div className="w-full flex gap-4 max-w-lg flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          disabled
          className="w-full h-12 py-2 px-5 disabled:cursor-not-allowed bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />

        <input
          type="text"
          placeholder="Video published date..."
          value={publishedAt}
          disabled
          className="w-full h-12 py-2 px-5 disabled:cursor-not-allowed bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />
      </div>

      <div className="w-full flex gap-4 max-w-lg flex-col sm:flex-row">
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
          disabled
          className="w-full h-12 py-2 px-5 disabled:cursor-not-allowed bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt max-w-lg"
        />
      </div>

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

export default AddManually;
