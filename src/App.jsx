import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import QuestionAnswering from "./components/QuestionAnswering/QuestionAnswering";
import ImageClassification from "./components/ImageClassification/ImageClassification";
import ImageToText from "./components/ImageToText/ImageToText";

function App() {
  return (
    <>
      <h1>Transformers js</h1>
      <Tabs
        defaultActiveKey="qa"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="qa" title="Question-Answer">
          <QuestionAnswering />
        </Tab>
        <Tab eventKey="ic" title="Image Classification">
          <ImageClassification />
        </Tab>
        <Tab eventKey="imt" title="Image To Text">
          <ImageToText />
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
