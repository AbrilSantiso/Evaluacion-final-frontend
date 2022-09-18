export type Comic = {
    id: number,
    title: string,
    thumbnail: Image
    description: string,
    price: number,
    oldPrice: number,
    stock: number,
    characters: {
        available: number,
        items: CharacterItem[]
    }
 }

 export type CharacterItem = {
    name: string,
    resourceURI: string
 }

 type Image = {
    path: string, 
    extension: string
 }

 export type Character = {
    name: string,
    description: string,
    thumbnail: Image
 }

 export type CharacterPageProps ={
    character: Character
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

