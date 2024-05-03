import { z } from 'zod'

const url = "https://www.course-api.com/react-tours-project"

//constract our schema, constracting an object
const tourSchema = z.object({
    //checking is it a string or not
    id:z.string(),
    name:z.string(),
    info:z.string(),
    image:z.string(),
    price:z.string(),
   // something: z.number() //it will print out to the console why exactly we are having an error and why it is not correct, the whole point of it is that we are checking for errors in the run time, not when we build the app
})

// now for the tour we can infer the type, so now we can add some checks on runtime
type Tour = z.infer<typeof tourSchema>

async function fetchData(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData: Tour[] = await response.json();
    const result = tourSchema.array().safeParse(rawData)
    if (!result.success) {
        throw new Error(`invalid data: ${result.error}`)
    }
    console.log(result.data);
    
    return result.data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'there was an error...';
    console.error(errMsg);

    // throw error;
    return [];
  }
}

const tours = await fetchData(url);
tours.map((tour) => {
  console.log(tour.name);
});

