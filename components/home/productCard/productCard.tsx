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
import { ProductCardProps } from "../types";

const ProductCard: FC<ProductCardProps> = ({comic}) => {
  return (
            <Card >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="194"
                  image={comic.imagen}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {comic.nombre}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button  color="primary">
                  Comprar
                </Button>
                <Button  color="primary">
                  Ver Detalle
                </Button>
              </CardActions>
            </Card>
  );
};

export default ProductCard;
