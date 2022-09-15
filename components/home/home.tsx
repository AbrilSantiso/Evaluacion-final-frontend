import { FC } from "react";
import {
  Grid,
} from "@mui/material";
import ProductCard from "./productCard/productCard";

const Home: FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4,5,6,7,8,9,10,11].map((value) => (
          <Grid key={value} item>
          {/* <ProductCard/>*/}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
