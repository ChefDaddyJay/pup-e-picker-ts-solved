import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, Tab, TTabKey, TTabSet } from "../types";
import { Requests } from "../api";

type ClassAppState = {
  allDogs: Dog[];
  activeTab: TTabKey;
  isLoading: boolean;
};

export class ClassApp extends Component<object, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    activeTab: "all",
    isLoading: false,
  };
  getFavoriteDogs() {
    return this.state.allDogs.filter((dog) => dog.isFavorite);
  }
  getUnfavoriteDogs() {
    return this.state.allDogs.filter((dog) => !dog.isFavorite);
  }
  refreshDogs = () =>
    Requests.getAllDogs()
      .then((allDogs) => this.setState({ allDogs }))
      .catch(() => {
        throw new Error("Failed to retrieve dogs.");
      });

  async createDog(input: Dog) {
    this.setState({ isLoading: true });
    try {
      await Requests.postDog(input);
      return await this.refreshDogs();
    } catch {
      throw new Error("Failed to create dog.");
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.refreshDogs();
  }

  render() {
    const { allDogs, activeTab, isLoading } = this.state;
    const setLoading = (loading: boolean) =>
      this.setState({ isLoading: loading });
    const favoriteDogs = this.getFavoriteDogs();
    const unfavoriteDogs = this.getUnfavoriteDogs();

    const dogsTab = (label: TTabKey, dogs: Dog[]) => {
      return {
        label: `${label} ( ${dogs.length} )`,
        content: (
          <ClassDogs
            dogs={dogs}
            isLoading={isLoading}
            setLoading={setLoading}
            refresh={this.refreshDogs}
          />
        ),
      } as Tab;
    };

    const tabs: TTabSet = {
      all: dogsTab("all", allDogs),
      favorite: dogsTab("favorite", favoriteDogs),
      unfavorite: dogsTab("unfavorite", unfavoriteDogs),
      create: {
        label: "create dog",
        content: (
          <ClassCreateDogForm
            onSubmit={this.createDog.bind(this)}
            isLoading={isLoading}
          />
        ),
      },
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={(tab: TTabKey) => this.setState({ activeTab: tab })}
        >
          {tabs[activeTab].content}
        </ClassSection>
      </div>
    );
  }
}
