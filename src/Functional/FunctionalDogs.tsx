import toast from "react-hot-toast";
import { Requests } from "../api";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogs,
  isLoading,
  setLoading,
  refreshDogs,
}: {
  dogs: Dog[];
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  refreshDogs: () => void;
}) => {
  const setFavorite = (dog: Dog, isFavorite: boolean) => {
    setLoading(true);
    Requests.updateDog({ ...dog, isFavorite: isFavorite })
      .then(() => refreshDogs())
      .catch(() => toast.error("Failed to update dog. Please try again."))
      .finally(() => setLoading(false));
  };

  const deleteDog = (dog: Dog) => {
    setLoading(true);
    Requests.deleteDog(dog.id)
      .then(() => refreshDogs())
      .catch(() => toast.error("Failed to delete dog. Please try again."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="content-container">
      {dogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog)}
          onHeartClick={() => setFavorite(dog, false)}
          onEmptyHeartClick={() => setFavorite(dog, true)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
