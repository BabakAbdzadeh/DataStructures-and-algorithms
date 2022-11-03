//  Graph Data Structur
class Graph {

  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  };

  // Private Methods
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
    if(this.AdjList.get(v) !== undefined){

      // v source node, w destination node
      if (this.AdjList.get(w) !== undefined) {

        this.AdjList.get(v).push(w);
      }else{
        this.addVertex(w);
        this.AdjList.get(v).push(w);
      }
    }else{
      console.log(`The problem is ${v} and ${w}`);
      console.log(this.AdjList.get(v));
    }
  };
  addVertex_ListEdges(v , w){
    this.AdjList.set(v, w);
  }
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
  };
  graphSize(){
    return this.AdjList.size;
  }
  transposeGraph() {
    const transposeGraph = new Graph(this.noOfVertices);
    for(let i = 1 ; i <= this.noOfVertices ; i++){
      transposeGraph.addVertex(i);
    }
    var entries = this.AdjList[Symbol.iterator]();

    for( const adjList of entries) {
      var node = adjList[0];
      var edgeList = this.AdjList.get(node);
      if (edgeList !== undefined) {

        for (var head = 0; head < edgeList.length; head++) {
        
          transposeGraph.addEdge(edgeList[head], node);
      }}
    };
    return transposeGraph;
  };


};




module.exports = Graph;
