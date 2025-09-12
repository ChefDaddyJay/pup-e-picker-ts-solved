// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TTabKey, TTabSet } from "../types";

type ClassSectionProps = {
  tabs: TTabSet;
  activeTab: TTabKey;
  setActiveTab: (tab: TTabKey) => void;
  children?: ReactNode;
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const { tabs, activeTab, setActiveTab, children } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {Object.keys(tabs).map((key) => {
              const tab = key as TTabKey;
              return (
                <div
                  key={tab}
                  className={`selector ${activeTab === tab && "active"}`}
                  onClick={() => setActiveTab(activeTab === tab ? "all" : tab)}
                >
                  {tabs[tab].label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
