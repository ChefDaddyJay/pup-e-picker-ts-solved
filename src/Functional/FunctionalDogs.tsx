import { Requests } from "../api";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogs,
  isLoading,
  setLoading,
  refresh,
}: {
  dogs: Dog[];
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  refresh: () => void;
}) => {
  const setFavorite = (dog: Dog, isFavorite: boolean) => {
    setLoading(true);
    Requests.updateDog({ ...dog, isFavorite: isFavorite }).then(() =>
      refresh()
    );
  };

  const deleteDog = (dog: Dog) => {
    setLoading(true);
    Requests.deleteDog(dog.id).then(() => refresh());
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
