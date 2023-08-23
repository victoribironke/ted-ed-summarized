export type VideoProps = {
  src: string;
  title: string;
  id: string;
  videoPublishedAt: string;
  summaryPublishedAt: string;
  summaryUrl: string;
};

export type VideosProps = {
  data: {
    id: string;
    imageUrl: string;
    title: string;
    videoPublished: string;
    summaryGenerated: string;
    summaryUrl: string;
  }[];
};
