import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if (req.method == "GET"){
        const query = req.query;
        const { offset, limit } = query;
        const offsetParsed = typeof offset === "string" ? parseInt(offset) : 0;
        const limitParsed = typeof limit === "string" ? parseInt(limit) : 12;

        const resData = await getComics(offsetParsed, limitParsed );
      
          res.status(200).json({ data: resData });   
    }
    res.status(405).json({ error: 'method not supported' })
  }

