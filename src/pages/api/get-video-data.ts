import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  try {
    const result = await (
      await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`,
        { headers: { Accept: "application/json" } }
      )
    ).data;

    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};

export default handler;
