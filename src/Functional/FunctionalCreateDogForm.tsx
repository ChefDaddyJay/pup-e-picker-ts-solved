import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { defaultDog } from "../helpers";
import { Dog } from "../types";

export const FunctionalCreateDogForm = ({
  onSubmit,
}: {
  onSubmit: (input: Dog) => void;
}) => {
  const [dogInput, setDogInput] = useState({ ...defaultDog });

  const handleChange = (
    key: "name" | "description" | "image",
    input: string
  ) => {
    const newState: Dog = { ...dogInput };
    newState[key] = input;
    setDogInput(newState);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(dogInput);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        value={dogInput.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={dogInput.description}
        onChange={(e) => handleChange("description", e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={dogInput.image}
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
