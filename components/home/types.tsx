export type Comic = {
    id: number,
    title: string,
    thumbnail: Image
 }
 type Image = {
    path: string, 
    extension: string
 }
 export type ProductCardProps = {
     comic: Comic
 }

 export type GrillaProps = {
    comics: Comic[]
}

export type HomeProps = {
    comicsArray: Comic[];
    totalPages: number
}