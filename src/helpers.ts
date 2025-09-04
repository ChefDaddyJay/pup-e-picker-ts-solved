import { dogPictures } from "./dog-pictures";
import { Dog } from "./types";

export function countFavorites(dogs: Dog[]) {
  return dogs.reduce((count, dog) => (dog.isFavorite ? count + 1 : count), 0);
}

export const defaultDog: Dog = {
  id: -1,
  name: "",
  image: dogPictures.BlueHeeler,
  description: "",
  isFavorite: false,
};
