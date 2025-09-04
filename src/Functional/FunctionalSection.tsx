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
  const tabs = [
    `favorited ( ${favorites} )`,
    `unfavorited ( ${dogs.length - favorites} )`,
    "create dog",
  ];

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>

        <div className="selectors">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`selector ${activeTab === index && "active"}`}
              onClick={() => setActiveTab(activeTab === index ? -1 : index)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
