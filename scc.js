const inputArr = require('./Assignment/fileReader');
const Graph = require(__dirname + '/dirGraph.js');

// Creating a graph from input array
const graph = new Graph(875714);
for( var i  = 1; i <= 875714 ; i++){
  graph.addVertex(i);
};

for( var i = 0 ; i < inputArr.length  ; i++){
  graph.addEdge(parseInt(inputArr[i][0]), parseInt(inputArr[i][1]));
};

// ------------- Test graph ---------------//
 // const testGraph = new Graph(12);
// for(let i= 1; i<13; i++){
//   testGraph.addVertex(i);
// };
// //
// //
// //
// testGraph.addEdge(1, 2);
// testGraph.addEdge(2, 3);
// testGraph.addEdge(2, 4);
// testGraph.addEdge(2, 5);
// testGraph.addEdge(3, 6);
// testGraph.addEdge(4, 5);
// testGraph.addEdge(4, 7);
// testGraph.addEdge(5, 2);
// testGraph.addEdge(5, 6);
// testGraph.addEdge(5, 7);
// testGraph.addEdge(6, 3);
// testGraph.addEdge(6, 8);
// testGraph.addEdge(7, 8);
// testGraph.addEdge(7, 10);
// testGraph.addEdge(8, 7);
// testGraph.addEdge(9, 7);
// testGraph.addEdge(10, 9);
// testGraph.addEdge(10, 11);
// testGraph.addEdge(11, 12);
// testGraph.addEdge(12, 10);
//
//
//
//
// testGraph.printGraph();

//  Strongly Connected Components
// ---------- 1. Create transpose Graph ------------------
  const testTransGraph = graph.transposeGraph();
console.log('trans DONE');
// --------- 2. DFS-Loop on G^rev-------------------------
// 2.1 Get the finish time of the rev_graph
const finishTime = dfsLoop(testTransGraph, testTransGraph.graphSize()).finishTime;

console.log('dfs on trans DONE');
// 2.2 Assigne the finish time as new_key to nodes
const assignedGraph = new Graph(graph.graphSize());

finishTime.forEach((new_key, key )=>{
  // console.log(`Old node: ${key} and New Node: ${new_key}`);

  // console.log(`For vertixe: ${key} arcs are: ${values}`);
  const values = graph.returnGraph().get(key);
  const updatedValues = [];
  for(const value of values) {
    // console.log(`For vertixe: ${key} arc, ${value} is gonna be changed with ${finishTime.get(value)}`);

    updatedValues.push(finishTime.get(value));
  };
  // console.log(`For vertixe: ${new_key} arcs are: ${updatedValues}`);
  assignedGraph.addVertex_ListEdges(new_key,updatedValues);
});

console.log(' Assigne DONE');

// -------- 3. DFS-Loop on G (assigned with new time consts) -----------------------------
const leader = dfsLoop(assignedGraph, assignedGraph.graphSize()).leader;
// key to leader show the SCC
console.log(leader);
console.log('DONE DONE');


// DFS-Loop:
function dfsLoop(g, size){
  // console.log("We are inside");
  var t = 0;
  var s = null;
  // Assuem nodes are labellled 1 to n.
  // For later update;
  var explore = new Map();
  for( let i = 1; i <= size ; i++){
    explore.set(i,'unexplored');
  }
  var leader = new Map();
  var f_time = new Map();
  for(let i = size; i > 0 ; i--){

      if (explore.get(i) === 'unexplored'){
        s = i;
        // Here must be a function
         function dfs(g, i){

          explore.set(i, 'explored');
          leader.set(i, s);
          g.nodeEdges(i).forEach(arc => {
            // console.log(`Arc: (${i},${arc})`);
            if(explore.get(arc) === 'unexplored'){
               dfs(g,arc);
            }
          });

          t++;
          // console.log(`${i} is gonna be ${t}`);
          f_time.set(i, t);
        }
         dfs(g, i);
        // The must function must finish here
      };
  };

  // console.log(f_time);
  // console.log(leader);
  return {
    'finishTime' : f_time,
    'leader' : leader
  }
};
