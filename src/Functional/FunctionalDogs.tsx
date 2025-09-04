import { Requests } from "../api";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogs,
  refresh,
}: {
  dogs: Dog[];
  refresh: () => void;
}) => {
  return (
    <div className="content-container">
      {dogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id).then(() => refresh());
          }}
          onHeartClick={() => {
            Requests.updateDog({ ...dog, isFavorite: false }).then(() =>
              refresh()
            );
          }}
          onEmptyHeartClick={() => {
            Requests.updateDog({ ...dog, isFavorite: true }).then(() =>
              refresh()
            );
          }}
          isLoading={false}
        />
      ))}
    </div>
  );
};
