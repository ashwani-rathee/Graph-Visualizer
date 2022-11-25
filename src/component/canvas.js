import { useState } from "react";

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

const Canvas = ({ name }) => {
  const [numVertices, setNumVertices] = useState(5);
  const [colors, setColors] = useState({
    1: "white",
    2: "white",
    3: "white",
    4: "white",
    5: "white",
    6: "white",
    7: "white",
    8: "white",
  });
  const [edges, setEdges] = useState({
    1: [2,3,4],
    2: [1, 3, 4, 7],
    3: [1, 4, 8],
    4: [1, 2, 3, 5],
    5: [4, 6],
    6: [5],
    7: [2],
    8: [3],
  });
  const [location, setLocation] = useState({
    1: [50, 50],
    2: [50, 100],
    3: [100, 50],
    4: [100, 100],
    5: [150, 100],
    6: [150, 150],
    7: [50, 150],
    8: [250, 150],
  });

  const changePos = (edge, loc1, loc2) => {
    setLocation((prevstate) => {
      return {
        ...prevstate,
        edge: [loc1, loc2],
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

  const addNode = () => {
    setNumVertices((prevstate) => prevstate + 1);
    setColors((prevstate) => {
      return {
        ...prevstate,
        [numVertices + 1]: "white",
      };
    });
    setEdges((prevstate) => {
      return {
        ...prevstate,
        [numVertices + 1]: [],
      };
    });
    setLocation((prevstate) => {
      return {
        ...prevstate,
        [numVertices + 1]: [0, 0],
      };
    });
  }

  const runDFS = () => {
    let start = 1;
    let visited = {};
    let stack = [];
    let path = [];
    stack.push(start);
    visited[start] = true;
    while (stack.length > 0) {
      let curr = stack.pop();
      console.log(curr);
      setColors((prevstate) => {
        return {
          ...prevstate,
          [curr]: "red",
        };
      });
      // await timeout(10000); //for 1 sec delay
      path.push(curr);
      for (let i = 0; i < edges[curr].length; i++) {
        if (!visited[edges[curr][i]]) {
          stack.push(edges[curr][i]);
          visited[edges[curr][i]] = true;
          setColors((prevstate) => {
            return {
              ...prevstate,
              [curr]: "white",
            };
          });
        }
      }
    
  }
};

  const runBFS = () => {
    let start = 1;
    let visited = {};
    let queue = [];
    let path = [];
    queue.push(start);
    visited[start] = true;
    while (queue.length > 0) {
      let curr = queue.shift();
      console.log(curr);
      setColors((prevstate) => {
        return {
          ...prevstate,
          [curr]: "red",
        };
      });
      // await timeout(10000); //for 1 sec delay
      path.push(curr);
      for (let i = 0; i < edges[curr].length; i++) {
        if (!visited[edges[curr][i]]) {
          queue.push(edges[curr][i]);
          visited[edges[curr][i]] = true;
          setColors((prevstate) => {
            return {
              ...prevstate,
              [curr]: "white",
            };
          });
        }
      }
    }
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
        fill={colors[number]}
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
      <button onClick={addEdge}>add Edge</button>
      <button onClick={addNode}>add Node</button>
      <button onClick={runDFS}> run DFS</button>
      <button onClick={runBFS}> run BFS</button>
    </>
  );
};

export default Canvas;
