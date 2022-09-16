export type Comic = {
    id: number,
    nombre: string,
    imagen: string
 }
 
 export type ProductCardProps = {
     comic: Comic
 }

 export type GrillaProps = {
    comics: Comic[]
}
