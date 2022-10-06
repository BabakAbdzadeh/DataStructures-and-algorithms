// kargetMinCut algorithm to compute the min cut.
//
// INPUT: Array of items, each item is an array of values which the first value is the Node(V) the others are edges(E) connected to vertex number.
// input structur is like [[N,e,e], [N,e,e], [N,ee], etc], N = vertex & e = head of edge
let inputArr = require('./fileReader.js');

//  Graph Data Structur
class Graph {

  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  };

  // Private Method
  #remArrVal(v, w) {
    const index = this.AdjList.get(v).indexOf(w);
    if (index > -1) {
      this.AdjList.get(v).splice(index, 1);
    }
  };
  #updateArr(v, w, new_w) {
    const index = this.AdjList.get(v).indexOf(w);
    if (index > -1) {
      this.AdjList.get(v).splice(index, 1);
      this.AdjList.get(v).push(new_w);
    }
  }

  // Public Methods
  addVertex(v) {
    this.AdjList.set(v, []);
  };
  addEdge(v, w) {
    // v source node, w destination node
    this.AdjList.get(v).push(w);
    // MODIFIED DUE TO THE FACT THAT INPUT ALREADY POINTED IN 2 Ways
    // // Since the graph is undirected
    // this.AdjList.get(w).push(v);
  };
  connectTwoNodes(v, w) {
    this.AdjList.get(v).push(w);
    this.AdjList.get(w).push(v);
  }
  removeVertex(v) {
    this.AdjList.delete(v);
  }
  removeEdge(v, w) {
    this.#remArrVal(v, w);
    this.#remArrVal(w, v);
  };
  replaceEdge(v, w, new_w) {
    this.#updateArr(v, w, new_w);
    this.#remArrVal(w, v);
    this.AdjList.get(new_w).push(v);
  };
  combinedNodeEdgeModificaiton(v, w, new_w) {
    this.#updateArr(v, w, new_w);;
  }
  printGraph() {
    var get_keys = this.AdjList.keys();

    for (var i of get_keys) {
      var get_values = this.AdjList.get(i);
      var conc = "";
      for (var j of get_values) {
        conc += j + " ";
      };
      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  };
  nodeEdges(v) {
    return this.AdjList.get(v);
  };
  graphSize() {
    return this.AdjList.size;
  };
  returnGraph() {
    return this.AdjList;
  }
};



//  Creating a new graph instance
var graph = new Graph(200);
//  Passing data into the graph
inputArr.forEach(item => {
  var node = item.shift();
  graph.addVertex(node);
  item.forEach(value => {
    graph.addEdge(node, value);
  })
});




function kargetMinCut(graph) {
  while (graph.graphSize() > 2) {

    // -------------------- 1.Pick a remaining edge Randomly -----------------------
    var twoNodes = randomCoupleNodes(graph);

    // combining two nodes
    var newNode = twoNodes[0] + "+" + twoNodes[1];

    // ------------------- 2. Merge (contract) two vertices into one ---------------
    // combine (concat) two edges array; it contain duplicates

    const arrConcat = graph.nodeEdges(twoNodes[0]).concat(graph.nodeEdges(twoNodes[1]));

    graph.addVertex(newNode);
    arrConcat.forEach(value => {
      graph.addEdge(newNode, value);
    });


    // Modify vertices with new vertex
    // Re-wiring the graph based on new vertices
    graph.returnGraph().forEach((value, key) => {
      for (var i = 0; i < value.length; i++) {
        if (value.includes(twoNodes[0])) {

          graph.combinedNodeEdgeModificaiton(key, twoNodes[0], newNode);
        };
        if (value.includes(twoNodes[1])) {

          graph.combinedNodeEdgeModificaiton(key, twoNodes[1], newNode);
        }
      };
    });
    //  Remove two extra nodes that already have combined
    graph.removeVertex(twoNodes[0]);
    graph.removeVertex(twoNodes[1]);


    // ----------------------- 3. Remove SelfLoops -------------------------

    var noSelfLoop = getOccurrence(graph.returnGraph().get(newNode), newNode);
    while (noSelfLoop > 0) {
      graph.removeEdge(newNode, newNode);
      noSelfLoop--;
    }

  }
  return graph;
};

const cutSizeCollector = [];
for (var i = 0; i <= 109999; i++) {

  cutSizeCollector.push(kargetMinCut(graph).returnGraph().values().next().value.length);
}
console.dir(Math.min(...cutSizeCollector));

//  Additional funcitons
function randomCoupleNodes(graph) {
  // +1 becuae first node is 1 not zero!
  // input is string
  var firstNode = getRandomKey(graph.returnGraph());


  var secondNode = graph.nodeEdges(firstNode)[Math.floor(Math.random() * graph.nodeEdges(firstNode).length)];
  return [firstNode, secondNode];
};

function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => (v === value && count++));
  return count;
};

function remArrVal(array, value) {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
};

// returns random key from Set or Map
function getRandomKey(collection) {
  let index = Math.floor(Math.random() * collection.size);
  let cntr = 0;
  for (let key of collection.keys()) {
    if (cntr++ === index) {
      return key;
    }
  }
}
