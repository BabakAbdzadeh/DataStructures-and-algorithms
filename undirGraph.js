// Undirected Graph

//  a Map Object provided by ES6 is used in order to implement the Adjacency list.
// Where the key of a map holds a vertex and values hold an array of an adjacent node.

class Graph{

  constructor(noOfVertices){
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }
  addVertex(v){
    this.AdjList.set(v, []);
  }
  addEdge(v, w){
    // v source node, w destination node
    this.AdjList.get(v).push(w);
    // Since the graph is undirected
    this.AdjList.get(w).push(v);
  }
  printGraph(){
    var get_keys = this.AdjList.keys();

    for(var i of get_keys){
      var get_values = this.AdjList.get(i);
      var conc = "";

      for(var j of get_values){
        conc += j + " ";
      };
      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }
};


// Using the above implemented graph class
var g = new Graph(6);
var vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}

// adding edges
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');

g.printGraph();
