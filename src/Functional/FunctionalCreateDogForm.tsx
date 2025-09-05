import { FormEvent, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { DEFAULT_DOG } from "../helpers";
import { Dog } from "../types";

export const FunctionalCreateDogForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (input: Dog) => void;
  isLoading: boolean;
}) => {
  const [inputState, setInputState] = useState({ ...DEFAULT_DOG });

  const handleChange = (
    key: "name" | "description" | "image",
    input: string
  ) => {
    const newState: Dog = { ...inputState };
    newState[key] = input;
    setInputState(newState);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputState);
    setInputState({ ...DEFAULT_DOG });
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>

      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={inputState.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={inputState.description}
        onChange={(e) => handleChange("description", e.target.value)}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={inputState.image}
        disabled={isLoading}
        onChange={(e) => handleChange("image", e.target.value)}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>

      <input type="submit" />
    </form>
  );
};
