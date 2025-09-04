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
      console.log("Delete request error:", error);
    }
  },

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: async () => {
    Requests.deleteDog(9);
  },
};
