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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ProductCardProps as ComicPageProps } from "types";
import Image from "next/image";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { GetServerSideProps, NextPage } from "next/types";
import { ExpandMore } from "@mui/icons-material";
import Link from "next/link";

const ComicPage: NextPage<ComicPageProps> = ({ comic }) => {
  const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  if (comic) {
    console.log(comic);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
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
          justifyContent: "center",
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
            margin: "0 30px"
          }}
        />
        <Card sx={{ width: "300px", padding: "16px" }}>
          <Typography
            sx={{ fontSize: "1.5rem", width: "80%" }}
            gutterBottom
            variant="h4"
          >
            {comic.title}
          </Typography>
          {comic.stock > 0 && (
            <Typography
              sx={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.6)" }}
              gutterBottom
              variant="h6"
            >
              {" "}
              {`Antes $${comic.oldPrice}`}
            </Typography>
          )}
          <Typography sx={{ fontSize: "18px" }} gutterBottom variant="h6">
            {`$${comic.price}`}
          </Typography>

          <CardActions>
            {comic.stock > 0 ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Comprar
              </Button>
            ) : (
              <Button variant="contained" disabled size="large" fullWidth>
                Sin stock disponible
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom:"20px"
        }}
      >
        <Accordion
          sx={{
            maxWidth: "700px",
            width: "90%",
            marginBottom: "20px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Descripción
          </AccordionSummary>
          <AccordionDetails>
            {comic.description
              ? comic.description
              : "Sin descripción disponible"}
          </AccordionDetails>
        </Accordion>
        {comic.characters.items.length > 0 && (
          <Accordion
            sx={{
              maxWidth: "700px",
              width: "90%",
              marginBottom: "20px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              Personajes
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
             {comic.characters.items.map((item)=>(
              <Grid key={item.name} item>
                <Link href={`/personajes/${item.resourceURI.split("/")[6]}`}>{item.name}</Link>
                </Grid>
             ))}
             </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
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
