import { atom } from "recoil";

export const filter = atom({
  key: "filter",
  default: "",
});

export const videoData = atom({
  key: "videoData",
  default: { videoId: "", title: "", publishedAt: "", thumbnail: "" },
});
