//  Graph Data Structur
class Graph{

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
    if(this.AdjList.get(w) === true){

      this.AdjList.get(v).push(w);
    }else{
      this.addVertex(w);
      this.AdjList.get(v).push(w);
    }

  };
  connectTwoNodes(v, w) {
    this.AdjList.get(v).push(w);
  }
  removeVertex(v) {
    this.AdjList.delete(v);
  }
  removeEdge(v, w) {
    this.#remArrVal(v, w);
  };
  replaceEdge(v, w, new_w) {
    this.#updateArr(v, w, new_w);
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




const test = new Graph(4);
test.addVertex('1');
test.addVertex('2');
test.addVertex('3');
test.addEdge('1','2');
test.addEdge('1','3');
test.addEdge('1','4');
test.addEdge('4','3');
test.printGraph();
