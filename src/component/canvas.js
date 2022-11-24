import { useState } from "react";

const Canvas = ({ name }) => {
  const [numVertices, setNumVertices] = useState(5);
  const [edges, setEdges] = useState({
    1: [1, 2],
    2: [3],
    3: [4],
    4: [2, 3],
  });
  const [location, setLocation] = useState({
    1: [50, 50],
    2: [50, 100],
    3: [100, 50],
    4: [100, 100],
  });

  const changePos = () => {
    setLocation((prevstate) => {
      return {
        ...prevstate,
        4: [150, 150],
      };
    });
  };

  const addEdge = () => {
    setEdges((prevstate) => {
      // console.log(prevstate[4]);
      return {
        ...prevstate,
        4: [...prevstate[4], 1],
      };
    });
  };

  console.log(edges);

  const returnedges = () => {
    let curr = Object.keys(edges);
    var res = [];
    for (let i = 0; i < curr.length; i++) {
      const p = edges[curr[i]].map((num) => {
        return (
          <line
            x1={location[curr[i]][0]}
            y1={location[curr[i]][1]}
            x2={location[num][0]}
            y2={location[num][1]}
            stroke="black"
          />
        );
      });
      res = res.concat(p);
    }
    return res;
  };

  let curr = Object.keys(edges);
  let line = returnedges();
  // console.log(line);
  let listItems = curr.map((number) => {
    return (
      <circle
        cx={location[number][0]}
        cy={location[number][1]}
        r="10"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
    );
  });

  let list2 = curr.map((number) => {
    return (
      <text
        x={location[number][0]}
        y={location[number][1]}
        textAnchor="middle"
        stroke="#51c5cf"
        strokeWidth="0.5px"
        dy=".3em"
      >
        {" "}
        {number}{" "}
      </text>
    );
  });
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        <g fill="#61DAFB">
          {line}
          {listItems}
          {list2}
        </g>
      </svg>
      <button onClick={changePos}>change loc</button>
      <button onClick={addEdge}>add Node</button>
    </>
  );
};

export default Canvas;
