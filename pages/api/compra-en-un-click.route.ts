import { ERROR_METHOD_NOT_ALLOWED, ERROR_SERVER } from 'dh-marvel/services/checkout/checkout.errors';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import type {NextApiRequest, NextApiResponse} from 'next';
import { Comic } from 'types';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(405).json(ERROR_METHOD_NOT_ALLOWED);
        return;
    }
    try {
        const body: Comic = req.body;
        const comic = await getComic(body.id);

        if (comic.stock  >= 1) {
            res.status(200).json({data: comic});
            return
        }else{
            res.status(400).json({message: "No hay stock disponible del comic"});
            return
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(ERROR_SERVER);
    }

}