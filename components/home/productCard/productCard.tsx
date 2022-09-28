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

const ProductCard: FC<ProductCardProps> = ({comic, isCheckout}) => {
 
  const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
  
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
                <Button  color="primary">
                  Comprar
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
