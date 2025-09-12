import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, Tab, TTabKey, TTabSet } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TTabKey>("all" as TTabKey);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const refreshDogs = () => Requests.getAllDogs().then(setAllDogs);

  const createDog = (input: Dog) => {
    setIsLoading(true);
    return Requests.postDog(input)
      .then(() => refreshDogs())
      .catch(() => {
        throw new Error("Failed to create dog.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const buildDogsElement = (dogs: Dog[]) => (
    <FunctionalDogs
      dogs={dogs}
      isLoading={isLoading}
      setLoading={setIsLoading}
      refreshDogs={refreshDogs}
    />
  );

  const buildDogsTab = (dogs: Dog[], label: string = "all") => {
    const tab: Tab = {
      label: `${label} ( ${dogs.length} )`,
      content: buildDogsElement(dogs),
    };
    return tab;
  };

  useEffect(() => {
    refreshDogs().then(() => setIsLoading(false));
  }, []);

  // Here, I'm using the "all" tab because I think it's an improvement.
  // A null value could be used instead, but I feel this makes the UI
  // a little more understandable without really changing the function.
  const tabs: TTabSet = {
    all: buildDogsTab(allDogs),
    favorite: buildDogsTab(favoriteDogs, "favorited"),
    unfavorite: buildDogsTab(unfavoriteDogs, "unfavorited"),
    create: {
      label: "create dog",
      content: (
        <FunctionalCreateDogForm onSubmit={createDog} isLoading={isLoading} />
      ),
    },
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {tabs[activeTab].content}
      </FunctionalSection>
    </div>
  );
}
