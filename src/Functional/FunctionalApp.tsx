import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState(-1);

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);
  const refresh = () => {
    Requests.getAllDogs().then((dogs) => setAllDogs(dogs));
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
          <FunctionalDogs dogs={allDogs} refresh={refresh} />
        )}
        {activeTab === 0 && (
          <FunctionalDogs dogs={favoriteDogs} refresh={refresh} />
        )}
        {activeTab === 1 && (
          <FunctionalDogs dogs={unfavoriteDogs} refresh={refresh} />
        )}
        {activeTab === 2 && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
