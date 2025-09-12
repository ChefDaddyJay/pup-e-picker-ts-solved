import { Dog } from "./types";

export const baseUrl = "http://localhost:3000/dogs";

export const Requests = {
  getAllDogs: async () => {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error(
        `Error Fetching Dogs: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  postDog: async ({ name, description, image, isFavorite }: Dog) => {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, image, isFavorite }),
    });
    if (!response.ok) {
      throw new Error(
        `Error Posting Dog: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  deleteDog: async (id: number) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Error Deleting Dog: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  updateDog: async (dog: Dog) => {
    const response = await fetch(`${baseUrl}/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    if (!response.ok) {
      throw new Error(
        `Error Updating Dog: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },
};
