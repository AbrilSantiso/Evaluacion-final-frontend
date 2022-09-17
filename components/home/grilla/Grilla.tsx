import {
    Grid
  } from "@mui/material";
  import { FC } from "react"; 
  import { GrillaProps } from "../types";
  import ProductCard from "../productCard/productCard";

  const Grilla: FC<GrillaProps> = ({comics}) => {
   
    return (
        <Grid container spacing={2} sx={{justifyContent:"center", alignItems:"center", margin:"20px" }}>
          {comics.map((comic) => (
            <Grid key={comic.id} item>
               <ProductCard comic={comic}/>
            </Grid>
          ))}
        </Grid>
    );
  };
  
  export default Grilla;