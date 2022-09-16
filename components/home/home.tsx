import { FC } from "react";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import type { GetStaticProps } from "next";
import { Comic } from "./types";
import Grilla from "./grilla/Grilla";
import { getComics } from "dh-marvel/services/marvel/marvel.service";

type Props = {
  comicsArray: Comic[];
};

export const getStaticProps: GetStaticProps = async () => {
  const comics = await getComics(0, 12);
  return {
    props: {
      comicsArray: comics.data.results,
    },
  };
};

const Home: FC<Props> = ({ comicsArray }) => {

  const [comics, setComics] = useState<Comic[]>();
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const limit = 12;
  console.log(comicsArray)
   return (
    <>
    
      <Pagination count={4} page={page} />
     {comicsArray && <Grilla comics={comicsArray} />}
      <Pagination count={4} page={page} />
    </>
  );
};


export default Home;
