import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { countFavorites } from "../helpers";

export const FunctionalSection = ({
  activeTab,
  setActiveTab,
  dogs,
  children,
}: {
  activeTab: number;
  setActiveTab: (newTab: number) => void;
  dogs: Dog[];
  children?: ReactNode;
}) => {
  const favorites = countFavorites(dogs);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>

        <div className="selectors">
          <div
            className={`selector ${activeTab === 0 && "active"}`}
            onClick={() => setActiveTab(activeTab === 0 ? -1 : 0)}
          >
            favorited ( {favorites} )
          </div>

          <div
            className={`selector ${activeTab === 1 && "active"}`}
            onClick={() => setActiveTab(activeTab === 1 ? -1 : 1)}
          >
            unfavorited ( {dogs.length - favorites} )
          </div>

          <div
            className={`selector ${activeTab === 2 && "active"}`}
            onClick={() => setActiveTab(activeTab === 2 ? -1 : 2)}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
