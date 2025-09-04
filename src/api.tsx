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
  postDog: async (newDog: Dog) => {
    const sendObject: {
      name: string;
      description: string;
      image: string;
      isFavorite: boolean;
    } = { ...newDog };
    try {
      const response = await fetch(`${baseUrl}/dogs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendObject),
      });
      if (response.ok) {
        const result = await response.text();
        console.log("Successfully created new Dog: ", JSON.stringify(result));
      } else {
        console.log(response.status);
        return null;
      }
    } catch (error) {
      console.error("Creation request error: ", error);
      return null;
    }
  },

  // should delete a dog from the database
  deleteDog: async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`Successfully deleted Dog #${id}`);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Delete request error:", error);
    }
  },

  updateDog: async (dog: Dog) => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dog),
      });
      if (response.ok) {
        console.log(`Successfully updated Dog #${dog.id}`);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Update request error:", error);
    }
  },

  // Just a dummy function for use in the playground
  dummyFunction: async () => {
    Requests.deleteDog(9);
  },
};
