import toast from "react-hot-toast";
import { Dog } from "./types";

export const baseUrl = "http://localhost:3000/dogs";

export const Requests = {
  getAllDogs: async () => {
    try {
      const response = await fetch(`${baseUrl}`);
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

  postDog: async ({ name, description, image, isFavorite }: Dog) => {
    const sendObject = {
      name: name,
      description: description,
      image: image,
      isFavorite: isFavorite,
    };
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendObject),
      });
      if (response.ok) {
        const result = await response.text();
        toast.success(`Successfully created ${JSON.parse(result).name}`);
      } else {
        console.log(response.status);
        return null;
      }
    } catch (error) {
      console.error("Creation request error: ", error);
      return null;
    }
  },

  deleteDog: async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      !response.ok && console.log(response.status);
    } catch (error) {
      console.error("Delete request error:", error);
    }
  },

  updateDog: async (dog: Dog) => {
    try {
      const response = await fetch(`${baseUrl}/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dog),
      });
      !response.ok && console.log(response.status);
    } catch (error) {
      console.error("Update request error:", error);
    }
  },

  // Just a dummy function for use in the playground
  dummyFunction: async () => {},
};
