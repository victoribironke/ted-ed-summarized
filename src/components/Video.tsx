import { VideoProps } from "@/types/general";
import { getPublishedDate } from "@/utils/helpers";
import Link from "next/link";

const Video = ({
  src,
  title,
  id,
  videoPublishedAt,
  summaryPublishedAt,
  summaryUrl,
}: VideoProps) => {
  const videoLink = `https://youtu.be/${id}`;

  return (
    <div className="w-full max-w-[17rem] backdrop-opacity rounded-xl bg-[#1a1a1a] p-2 flex flex-col gap-3 text-white">
      <img src={src} alt="video thumbnail" className="rounded-md" />
      <p className="text-center mb-auto">{title}</p>

      <div className="w-full flex items-center flex-col justify-center gap-3">
        <Link
          href={videoLink}
          className="bg-white text-black w-fit rounded-md py-1.5 px-3 text-[0.9rem] font-semibold"
          target="_blank"
        >
          Watch video • {getPublishedDate(videoPublishedAt)}
        </Link>
        <Link
          href={summaryUrl}
          className="bg-white text-black w-fit rounded-md py-1.5 px-3 text-[0.9rem] font-semibold"
          target="_blank"
        >
          Read summary • {getPublishedDate(summaryPublishedAt)}
        </Link>
      </div>
    </div>
  );
};

export default Video;
