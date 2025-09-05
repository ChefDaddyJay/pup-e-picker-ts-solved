import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const FunctionalSection = ({
  tabs,
  activeTab,
  setActiveTab,
  children,
}: {
  tabs: string[];
  activeTab: number;
  setActiveTab: (newTab: number) => void;
  children?: ReactNode;
}) => {
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
              onClick={() => setActiveTab(activeTab === index ? 0 : index)}
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
