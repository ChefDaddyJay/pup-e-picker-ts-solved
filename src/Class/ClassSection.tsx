// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

type ClassSectionProps = {
  tabs: string[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
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
  }
}
