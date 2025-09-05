import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { DEFAULT_DOG } from "../helpers";

type ClassCreateDogFormProps = {
  onSubmit: (input: Dog) => void;
  isLoading: boolean;
};

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  Dog
> {
  state = { ...DEFAULT_DOG };

  handleChange(key: "name" | "description" | "image", input: string) {
    const newState: Dog = { ...this.state };
    newState[key] = input;
    this.setState(newState);
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ ...DEFAULT_DOG });
  };

  render() {
    const { name, description, image } = this.state;
    const isLoading = this.props.isLoading;

    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>

        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={isLoading}
          value={name}
          onChange={(e) => this.handleChange("name", e.target.value)}
        />

        <label htmlFor="description">Dog Description</label>
        <textarea
          cols={80}
          rows={10}
          disabled={isLoading}
          value={description}
          onChange={(e) => this.handleChange("description", e.target.value)}
        ></textarea>

        <label htmlFor="picture">Select an Image</label>
        <select
          value={image}
          disabled={isLoading}
          onChange={(e) => this.handleChange("image", e.target.value)}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
    );
  }
}
