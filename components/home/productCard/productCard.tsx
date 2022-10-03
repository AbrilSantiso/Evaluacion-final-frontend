import { FC } from "react";
import {
  Card,
  Button,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { ProductCardProps } from "../../../types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOrderContext } from "dh-marvel/context/OrderContext";
import { getComic } from "dh-marvel/services/marvel/marvel.service";

const ProductCard: FC<ProductCardProps> = ({comic, isCheckout}) => {

  const {setOrder} = useOrderContext();

  const router = useRouter();
 
  const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  const handleQuickPurchase  = async () => {
   
    await fetch(`/api/compra-en-un-click`, {
      method: 'POST', body: JSON.stringify(comic), headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      if (res.status == 400) {
        router.push(`/comics/${comic.id}`);
        return;
      } 
      if(res.status === 200){
        let data = await res.json()
        console.log(data.data)
        setOrder(data.data);
        router.push("/checkout");
        return;
      }
    })
  }
  
  return (
            <Card sx={{ width: "400px", height:"400px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <CardActionArea sx={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                <CardMedia
                  component="img"
                  sx={{ width: "100%", height:"200px", objectFit: "contain" }}
                  image={image}
                  title={comic.title}
                />
                <CardContent>
                  {isCheckout? <Typography sx={{ fontSize:"25px", marginBottom: "20px" }} variant="h5">
                    {comic.title}
                  </Typography> : <Typography sx={{ height:"80px", fontSize:"20px", }} gutterBottom variant="h5">
                    {comic.title}
                  </Typography> }
                </CardContent>
              </CardActionArea>
              {
               isCheckout && <Typography variant="h5">
               ${comic.price}
             </Typography>
              }
              {!isCheckout && <CardActions>
                <Button  color="primary" onClick={handleQuickPurchase}>
                  Compra en un click
                </Button>
                <Link href={`/comics/${comic.id}`}>
                <Button  color="primary">
                  Ver Detalle
                </Button>
                </Link>
              </CardActions>}
              
            </Card>
  );
};

export default ProductCard;
