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
            Requests.deleteDog(dog.id).then();
            refresh();
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
      ))}
    </div>
  );
};
