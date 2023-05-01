import { NextApiResponseWithSocket } from "@/types";
import { getRandomId } from "@/utils";
import { NextApiRequest } from "next";

const handler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (req.method === "GET") {
    return res.status(200).json({ roomId: getRandomId() });
  }

  return res.status(405).end();
};

export default handler;
