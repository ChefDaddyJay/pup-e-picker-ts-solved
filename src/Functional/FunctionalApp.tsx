import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState(0);
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

  const tabs = [
    {
      label: `all ( ${allDogs.length} )`,
      content: (
        <FunctionalDogs
          dogs={allDogs}
          isLoading={isLoading}
          setLoading={setIsLoading}
          refresh={refresh}
        />
      ),
    },
    {
      label: `favorited ( ${favoriteDogs.length} )`,
      content: (
        <FunctionalDogs
          dogs={favoriteDogs}
          isLoading={isLoading}
          setLoading={setIsLoading}
          refresh={refresh}
        />
      ),
    },
    {
      label: `unfavorited ( ${unfavoriteDogs.length} )`,
      content: (
        <FunctionalDogs
          dogs={unfavoriteDogs}
          isLoading={isLoading}
          setLoading={setIsLoading}
          refresh={refresh}
        />
      ),
    },
    {
      label: "create dog",
      content: (
        <FunctionalCreateDogForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        tabs={tabs.map((tab) => tab.label)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {tabs[activeTab].content}
      </FunctionalSection>
    </div>
  );
}
