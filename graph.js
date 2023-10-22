class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.nodes.add(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let node of vertex.adjacent){
      node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, visited = new Set()) {
    visited.add(start.value)
    
    for(let neighbor of start.adjacent){
     
      if(!visited.has(neighbor.value)){
        return this.depthFirstSearch(neighbor, visited)
      }
    }
    //if any nodes are missed, run search on that node
    for(let node of this.nodes){
      if(!visited.has(node.value)){
        return this.depthFirstSearch(node, visited)
      }
    }
    return Array.from(visited);
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    
    const visited = new Set();
    const queue = [start];

    visited.add(start.value);

    while (queue.length > 0) {
      const currentNode = queue.shift();

      for (const neighbor of currentNode.adjacent) {
        if (!visited.has(neighbor.value)) {
          visited.add(neighbor.value);
          queue.push(neighbor);
        }
      }
    }
    return Array.from(visited)
  }
}

module.exports = {Graph, Node}