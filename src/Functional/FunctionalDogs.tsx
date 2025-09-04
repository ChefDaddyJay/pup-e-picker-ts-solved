import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

export const FunctionalDogs = ({ dogs }: { dogs: Dog[] }) => {
  return (
    <div className="content-container">
      {dogs.map((dog, index) => (
        <DogCard
          dog={dog}
          key={index}
          onTrashIconClick={() => {
            alert("clicked trash");
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
