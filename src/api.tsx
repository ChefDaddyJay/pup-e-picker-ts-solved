import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: async () => {
    try {
      const response = await fetch(`${baseUrl}/dogs`);
      if (response.ok) {
        const result = await response.text();
        return JSON.parse(result);
      } else {
        console.log(response.status);
        return null;
      }
    } catch (error) {
      console.error("Fetch Error: ", error);
      return null;
    }
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: () => {},

  // should delete a dog from the database
  deleteDog: () => {},

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: async () => {
    Requests.getAllDogs().then((dogs: Dog[]) =>
      console.log(dogs.findIndex((dog) => dog.id === 4))
    );
  },
};
