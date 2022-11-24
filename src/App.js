import logo from "./logo.svg";
import "./App.css";
// import { Component } from 'react';
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect, useRef } from "react";
import Canvas from "./component/canvas";

// let graphnodes = 0;
class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.numverts = 5;
    this.a = {
      1: [1, 2],
      2: [3],
      3: [4],
      4: [2, 3],
    };
    this.loc = {
      1: [50, 50],
      2: [50, 100],
      3: [100, 50],
      4: [100, 100],
    };
    this.curr = Object.keys(this.a);
    this.line = this.returnedges();
    console.log(this.line);
    this.listItems = this.curr.map((number) => (
      <circle
        cx={this.loc[number][0]}
        cy={this.loc[number][1]}
        r="10"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
    ));
    this.list2 = this.curr.map((number) => (
      <text
        x={this.loc[number][0]}
        y={this.loc[number][1]}
        textAnchor="middle"
        stroke="#51c5cf"
        strokeWidth="0.5px"
        dy=".3em"
      >
        {" "}
        {number}{" "}
      </text>
    ));
  }

  returnedges() {
    let curr = Object.keys(this.a);
    var res = [];
    for (let i = 0; i < curr.length; i++) {
      const p = this.a[curr[i]].map((num) => (
        <line
          x1={this.loc[curr[i]][0]}
          y1={this.loc[curr[i]][1]}
          x2={this.loc[num][0]}
          y2={this.loc[num][1]}
          stroke="black"
        />
      ));
      res = res.concat(p);
    }
    return res;
  }

  nameme() {
    return "Name of current graph is: " + this.name;
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        <g fill="#61DAFB">
          {this.line}
          {this.listItems}
          {this.list2}
        </g>
      </svg>
    );
  }
}

function App() {
  return (
    <main className="App-main">
      <Canvas name="MyDrawing" />

      {/* <Graph name="MyDrawing" /> */}
    </main>
  );
}

export default App;
