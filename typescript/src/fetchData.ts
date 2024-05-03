//Fetch API with simple fetch function

const baseURL = "https://dummyjson.com/products"
const url = 'https://www.course-api.com/react-tours-project';

type FetchedProduct = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
    //kicker we have to provide the correct shapy for our type, but there is no way to check on the runtime did we provide correct shape or no
    // something: boolean
}

type ProductsArray = {
    products: FetchedProduct[]
}

async function fetchData(url:string):Promise<ProductsArray>  {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data:ProductsArray = await response.json()
        console.log(data);
        return data
    } catch (error){
        const errorMsg = error instanceof Error? error.message : "there was an error..."
        console.log(errorMsg);
        return {products:[]}//returning an empty array
    }
}

 fetchData(baseURL)
     .then((myProducts) => {
        
        // console.log(myProducts.products);
        myProducts.products.map((p:any)=>{
            console.log(p.description);
        })
        
     })
     .catch((error) => {
        console.error(`error occured: ${error}`)
     })

     //can;t usy await within async func scope
// const productsData = await fetchData(baseURL)
// productsData.products.map((p:any) => {
//     console.log(p.title);
    
// })

// const tours = await fetchData(url);
// tours.map((tour: any) => {
//   console.log(tour.name);
// });



// const productsData = await fetchData(baseURL)
// productsData.products.map((p:FetchedProduct) => {
//     console.log(p.category);
// })


//ZOD library to check for runtime errors
