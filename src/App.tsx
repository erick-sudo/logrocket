import { useEffect, useRef } from "react";
import "./App.css";
import { World } from "./World/World";
let count = 0;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    if (count == 1) {
      const world = new World(container);
      const run = async () => {
        world.start();
      };
      run();
    }
    count++;
  }, []);

  return <div style={{ position: "fixed", inset: 0 }} ref={containerRef}></div>;
}

export default App;
