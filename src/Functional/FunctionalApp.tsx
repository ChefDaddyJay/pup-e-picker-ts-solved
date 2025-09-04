import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const handleSubmit = (input: Dog) => {
    setIsLoading(true);
    Requests.postDog(input).then(() => refresh());
  };

  const refresh = () => {
    setIsLoading(true);
    Requests.getAllDogs().then((dogs) => {
      setAllDogs(dogs);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dogs={allDogs}
      >
        {activeTab === -1 && (
          <FunctionalDogs
            dogs={allDogs}
            isLoading={isLoading}
            setLoading={setIsLoading}
            refresh={refresh}
          />
        )}
        {activeTab === 0 && (
          <FunctionalDogs
            dogs={favoriteDogs}
            isLoading={isLoading}
            setLoading={setIsLoading}
            refresh={refresh}
          />
        )}
        {activeTab === 1 && (
          <FunctionalDogs
            dogs={unfavoriteDogs}
            isLoading={isLoading}
            setLoading={setIsLoading}
            refresh={refresh}
          />
        )}
        {activeTab === 2 && (
          <FunctionalCreateDogForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
