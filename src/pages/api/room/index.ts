import { NextApiResponseWithSocket } from "@/types";
import { NextApiRequest } from "next";

const handler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (req.method === "GET") {
    const roomId = Math.random().toString(36).slice(2, 12).toLocaleUpperCase();
    return res.status(200).json({ roomId });
  }

  return res.status(405).end();
};

export default handler;
