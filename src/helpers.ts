import { Dog } from "./types";

export function countFavorites(dogs: Dog[]) {
  return dogs.reduce((count, dog) => (dog.isFavorite ? count + 1 : count), 0);
}
