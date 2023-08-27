import { filter } from "@/atoms/atoms";
import Video from "./Video";
import { useRecoilValue } from "recoil";
import { VideosProps } from "@/types/general";

const Videos = ({ data }: VideosProps) => {
  const filterValue = useRecoilValue(filter);

  return (
    <section className="w-full flex flex-wrap justify-center max-w-5xl gap-4">
      {data
        .filter((a) => {
          if (filterValue === "") return true;

          return a.id == filterValue;
        })
        .map((item, i) => (
          <Video
            src={item.imageUrl}
            id={item.id}
            title={item.title}
            key={i}
            videoPublishedAt={item.videoPublished}
            summaryPublishedAt={item.summaryGenerated}
            summaryUrl={item.summaryUrl}
          />
        ))}
    </section>
  );
};

export default Videos;
