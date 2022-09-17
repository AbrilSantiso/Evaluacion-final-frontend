import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Home from 'dh-marvel/components/home/home';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { HomeProps } from 'types';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';

const Index: NextPage<HomeProps> = ({ comicsArray, totalPages }) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle title={"Comics"}>
                <Home comicsArray={comicsArray} totalPages={totalPages}/>
            </BodySingle>
        </>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    const data = await getComics(0, 12)
    
    return {
      props: {
        comicsArray: data.data.results,
        totalPages: Math.ceil(data.data.total / 12)
      },
    };
  };



export default Index
