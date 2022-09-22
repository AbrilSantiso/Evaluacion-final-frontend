import { FC } from "react";
import { useState, useEffect } from "react";
import { Pagination, Box } from "@mui/material";
import { Comic, HomeProps } from "../../types";
import Grilla from "./grilla/Grilla";



const Home: FC<HomeProps> = ({ comicsArray, totalPages }:HomeProps) => {

  const [comics, setComics] = useState<Comic[]>(comicsArray);
  const [page, setPage] = useState<number>(1);
  const limit = 12;
  

  useEffect(() => {
    async function fetchComics(){
      const offset = (page - 1) * 12;
      const params = new URLSearchParams();
      params.set("offset", offset.toString());
      params.set("limit", limit.toString());
      const comicsData = await fetch(`api/comics?${params}`);
      const data = await comicsData.json();    
      setComics(data.data.data.results);
    }
    fetchComics();
  }, [page])

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
 
   return (
      <Box sx={{ display:"flex", alignItems:"center", flexDirection:"column", width:"100%" }}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
     {comics && <Grilla comics={comics} />}
      <Pagination count={totalPages} page={page} onChange={handleChange} sx={{ margin:"30px" }} />
      </Box>
  );
};


export default Home;
