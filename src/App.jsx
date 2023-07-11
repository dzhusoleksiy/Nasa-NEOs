import DaysList from "./components/Days/DaysList";
import Accordion from "react-bootstrap/Accordion";

function App() {
  return (
    <div className="container mx-auto w-[1200px]">
      <Accordion className="mt-[10px]">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is NEO?</Accordion.Header>
          <Accordion.Body>
            A near-Earth object (NEO) is a small Solar System body that comes
            into close proximity with Earth due to its orbit. NEOs are
            categorized based on their closest approach to the Sun and their
            size. If a NEO's orbit crosses Earth's orbit and it is larger than
            140 meters, it is considered a potentially hazardous object (PHO).
            Most NEOs are asteroids, but some are comets. There are over 30,503
            known near-Earth asteroids and a hundred known short-period
            near-Earth comets. Collisions with NEOs in the past have had a
            significant impact on Earth's geological and biological history. The
            study of NEOs and the potential dangers they pose has gained
            attention since the 1980s. Various scales, such as the Torino scale
            and Palermo scale, assess the risk and consequences of an NEO
            impact. Efforts like Spaceguard aim to track and catalog NEOs, with
            a focus on objects that could cause global catastrophes. NEOs have
            low surface gravity and Earth-like orbits, making them potential
            targets for spacecraft exploration. Some NEOs have been visited by
            spacecraft, and there are plans for commercial asteroid mining.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <DaysList />
    </div>
  );
}

export default App;
