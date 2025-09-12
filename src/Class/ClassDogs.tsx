import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type ClassDogsProps = {
  dogs: Dog[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  refresh: () => void;
};

export class ClassDogs extends Component<ClassDogsProps> {
  setFavorite(dog: Dog, isFavorite: boolean) {
    this.props.setLoading(true);
    Requests.updateDog({ ...dog, isFavorite: isFavorite })
      .then(() => this.props.refresh())
      .catch(() => toast.error("Failed to update dog. Please try again."))
      .finally(() => this.props.setLoading(false));
  }

  deleteDog(dog: Dog) {
    this.props.setLoading(true);
    Requests.deleteDog(dog.id)
      .then(() => this.props.refresh())
      .catch(() => toast.error("Failed to delete dog. Please try again."))
      .finally(() => this.props.setLoading(false));
  }

  render() {
    const { dogs, isLoading } = this.props;

    return (
      <div className="content-container">
        {dogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => this.deleteDog(dog)}
            onHeartClick={() => this.setFavorite(dog, false)}
            onEmptyHeartClick={() => this.setFavorite(dog, true)}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  }
}
