import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TTabKey, TTabSet } from "../types";

export const FunctionalSection = ({
  tabs,
  activeTab,
  setActiveTab,
  children,
}: {
  tabs: TTabSet;
  activeTab: TTabKey;
  setActiveTab: (newTab: TTabKey) => void;
  children?: ReactNode;
}) => {
  const defaultTabKey = "all" as TTabKey;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>

        <div className="selectors">
          {Object.keys(tabs).map((key) => {
            const tabKey = key as TTabKey;

            return (
              <div
                key={key}
                className={`selector ${activeTab === tabKey && "active"}`}
                onClick={() =>
                  setActiveTab(activeTab === tabKey ? defaultTabKey : tabKey)
                }
              >
                {tabs[tabKey].label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
