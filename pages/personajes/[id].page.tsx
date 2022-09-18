import {
    Card,
    Typography,
    Box,
  } from "@mui/material";
  import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
  import { GetServerSideProps, NextPage } from "next/types";
import { CharacterPageProps } from "types";
  
  const CharacterPage: NextPage<CharacterPageProps> = ( {character} ) => {

    const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;
   
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
          {character.name}
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
          <Card sx={{ width: "300px", padding: "16px" }} variant="outlined">
          <Typography
              sx={{ fontSize: "1.5rem", width: "90%", textAlign: "center", fontWeight: "bold" }}
              gutterBottom
              variant="h3"
            >
              Descripción
            </Typography>
            <Typography
              sx={{ fontSize: "1rem", width: "100%", textAlign: "center" }}
              gutterBottom
              variant="h6"
            >
              {character.description ? character.description : "Sin descripción disponible"}
            </Typography>
          </Card>
        </Box>
      </Box>
    );
  };
  export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const id = parseInt(query.id as string);
    const character = await getCharacter(id);

    return {
      props: {
        character,
      },
    };
  };
  export default CharacterPage;
  