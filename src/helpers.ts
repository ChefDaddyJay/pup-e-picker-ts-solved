import { dogPictures } from "./dog-pictures";
import { Dog } from "./types";

export const DEFAULT_DOG: Dog = {
  id: -1,
  name: "",
  image: dogPictures.BlueHeeler,
  description: "",
  isFavorite: false,
};
