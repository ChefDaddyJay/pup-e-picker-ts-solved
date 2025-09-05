import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

type ClassAppState = {
  allDogs: Dog[];
  activeTab: number;
  isLoading: boolean;
};

export class ClassApp extends Component<object, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    activeTab: 0,
    isLoading: false,
  };
  getFavoriteDogs() {
    return this.state.allDogs.filter((dog) => dog.isFavorite);
  }
  getUnfavoriteDogs() {
    return this.state.allDogs.filter((dog) => !dog.isFavorite);
  }

  handleSubmit(input: Dog) {
    this.setState({ isLoading: true });
    Requests.postDog(input).then(() => this.refresh());
  }

  refresh = () => {
    this.setState({ isLoading: true });
    Requests.getAllDogs().then((dogs) =>
      this.setState({
        allDogs: dogs,
        isLoading: false,
      })
    );
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { allDogs, activeTab, isLoading } = this.state;
    const favoriteDogs = this.getFavoriteDogs();
    const unfavoriteDogs = this.getUnfavoriteDogs();
    const tabs = [
      {
        label: `all ( ${allDogs.length} )`,
        content: (
          <ClassDogs
            dogs={allDogs}
            isLoading={isLoading}
            setLoading={(loading: boolean) =>
              this.setState({ isLoading: loading })
            }
            refresh={this.refresh}
          />
        ),
      },
      {
        label: `favorited ( ${favoriteDogs.length} )`,
        content: (
          <ClassDogs
            dogs={this.getFavoriteDogs()}
            isLoading={isLoading}
            setLoading={(loading: boolean) =>
              this.setState({ isLoading: loading })
            }
            refresh={this.refresh}
          />
        ),
      },
      {
        label: `unfavorited ( ${unfavoriteDogs.length} )`,
        content: (
          <ClassDogs
            dogs={this.getUnfavoriteDogs()}
            isLoading={isLoading}
            setLoading={(loading: boolean) =>
              this.setState({ isLoading: loading })
            }
            refresh={this.refresh}
          />
        ),
      },
      {
        label: "create dog",
        content: (
          <ClassCreateDogForm
            onSubmit={this.handleSubmit.bind(this)}
            isLoading={isLoading}
          />
        ),
      },
    ];

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          tabs={tabs.map((tab) => tab.label)}
          activeTab={activeTab}
          setActiveTab={(tab: number) => this.setState({ activeTab: tab })}
        >
          {tabs[activeTab].content}
        </ClassSection>
      </div>
    );
  }
}
