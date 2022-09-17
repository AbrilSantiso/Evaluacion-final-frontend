import {
  Card,
  Button,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  Grid,
} from "@mui/material";
import { ProductCardProps as ComicPageProps } from "types";
import Image from "next/image";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { GetServerSideProps, NextPage } from "next/types";

const ComicPage: NextPage<ComicPageProps> = ({ comic }) => {
  const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  return (
    <Box sx={{
        display: "flex",
       flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>
      <Typography
      component="h2"
        sx={{
          fontSize: "28px",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: "1.2",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        {comic.title}
      </Typography>
      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexFlow: "row wrap",
          marginTop: "40px",
          alignItems: "center",
          marginBottom: "32px",
          maxWidth: "700px",
        }}
      >
        <Box
          component={"img"}
          src={image}
          sx={{
            width: "300px",
            height: "350px",
            objectFit: "contain",
            
          }}
        />
        <Card sx={{ width: "300px", padding:"16px" }}>
          
            <Typography
              sx={{ height: "80px", fontSize: "1.5rem", width:"80%" }}
              gutterBottom
              variant="h4"
            >
              {comic.title}
            </Typography>
            { comic.stock > 0 && <Typography
              sx={{ fontSize: "14px", color:"rgba(0, 0, 0, 0.6)"}}
              gutterBottom
              variant="h6"
            > {`Antes $${comic.oldPrice}`}
                </Typography>}
            <Typography
              sx={{ fontSize: "18px" }}
              gutterBottom
              variant="h6"
            >
              {`$${comic.price}`}
            </Typography>
       
          <CardActions>
            <Button color="primary">Comprar</Button>
          </CardActions>
        </Card>
      </Box>
      <Box>Aca van descripcion y personajes</Box>
    </Box>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = parseInt(query.id as string);
  const comic = await getComic(id);

  return {
    props: {
      comic,
    },
  };
};
export default ComicPage;
