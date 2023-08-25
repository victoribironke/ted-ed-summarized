import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { extractVideoId } from "@/utils/helpers";
import { useRecoilState } from "recoil";
import { videoData } from "@/atoms/atoms";
import Link from "next/link";

const GetVideoData = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [{ thumbnail }, setVideoInfo] = useRecoilState(videoData);

  const get = async () => {
    setLoading(true);
    const res = await (
      await fetch(
        `/api/get-video-data?id=${extractVideoId(link)}&password=${
          process.env.NEXT_PUBLIC_PASSWORD
        }`
      )
    ).json();

    if (res.success) {
      const videoDataRes = {
        videoId: res.result.items[0].id,
        title: res.result.items[0].snippet.title,
        publishedAt: res.result.items[0].snippet.publishedAt,
        thumbnail: res.result.items[0].snippet.thumbnails.maxres.url,
      };

      setVideoInfo(videoDataRes);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (link !== "") setDisabled(false);
    else setDisabled(true);
  }, [link]);

  return (
    <>
      <div className="w-full flex gap-4 max-w-lg flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Video link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white font-gt"
        />

        <button
          onClick={get}
          className="text-black bg-white rounded-lg flex items-center justify-center gap-3 h-12 w-full disabled:cursor-not-allowed disabled:bg-[#b3b3b3] font-semibold"
          disabled={disabled}
        >
          Get{" "}
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </button>
      </div>

      {thumbnail && (
        <Link
          href={thumbnail}
          target="_blank"
          className="text-white text-lg underline"
        >
          {thumbnail}
        </Link>
      )}
    </>
  );
};

export default GetVideoData;
