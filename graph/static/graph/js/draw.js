window.onload = function(){
  ns = 'http://www.w3.org/2000/svg';
  var nodes = [];
  var edges = [];
  var draw = document.getElementById("draw");
  var isCreatingEdges = true;
  
  function Node(coordX, coordY){
    this.edgesIn = [];
    this.edgesOut = [];
    this.ball = document.createElementNS(ns, 'circle');
    this.ball.setAttributeNS(null, 'cx', coordX);
    this.ball.setAttributeNS(null, 'cy', coordY);
    this.ball.setAttributeNS(null, 'r', 10);
    this.ball.setAttributeNS(null, 'fill', "#F5A9A9");
    
    this.name = "vertex" + nodes.length;
    this.text = document.createElementNS(ns, "text");
    this.text.setAttributeNS(null, "x", coordX-15);
    this.text.setAttributeNS(null, "y", coordY+30);
    this.text.setAttributeNS(null, "id", "vertex");
    //this.text.setAttributeNS(null, "color", "#F8ECE0");
    this.text.innerHTML = this.name;
    draw.append(this.text);

    
    draw.append(this.ball);
    
    this.ball.addEventListener("mouseover", (e)=>{
      this.ball.setAttributeNS(null, "fill", "#FA5858");
      this.ball.setAttributeNS(null, "r", 20);
      this.edgesOut.forEach(element=>{  
        element.changeEdge = true;
        element.triangle.setAttributeNS(null, "fill", "#2EFEC8");
        element.setPosition(
          this.ball.getAttribute("cx"),
          this.ball.getAttribute("cy"),
          element.secondNode.ball.getAttribute("cx"),
          element.secondNode.ball.getAttribute("cy"),
          this.ball.getAttribute("r")
        );
        element.changeEdge = false;
      });
      this.edgesIn.forEach(element=>{
        element.triangle.setAttributeNS(null, "fill", "#F84040");
      });
    });
  
    this.ball.addEventListener("mouseout", (e) => {
      this.ball.setAttributeNS(null, "fill", "#F5A9A9");
      this.ball.setAttributeNS(null, "r", 10);
      this.edgesOut.forEach(element=>{
        element.changeEdge = true;
        element.triangle.setAttributeNS(null, "fill", "#F2F5A9");
        element.setPosition(
          this.ball.getAttribute("cx"),
          this.ball.getAttribute("cy"),
          element.secondNode.ball.getAttribute("cx"),
          element.secondNode.ball.getAttribute("cy"),
          this.ball.getAttribute("r")
        );
        element.changeEdge = false;
      });
      this.edgesIn.forEach(element=>{
        element.triangle.setAttributeNS(null, "fill", "#F2F5A9");
      });
    });
    var rightButton = false;
    var mouseDown = false;
    var mouseUp = false;
    var mouseMove = false;
    this.ball.oncontextmenu = (e)=>  { 
        rightButton = true;
        this.edgesIn.forEach(element=>{
            element.line.remove();
            element.triangle.remove();
            edges.splice(edges.indexOf(element),edges.indexOf(element));
            delete element;
        });
        this.edgesOut.forEach(element=>{
            element.line.remove();
            element.triangle.remove();
            edges.splice(edges.indexOf(element), edges.indexOf(element));
            delete element;
        });
        this.ball.remove();
        nodes.splice(nodes.indexOf(this), nodes.indexOf(this));
        delete this;
        return false;
    };
    this.ball.addEventListener("mousedown", (e)=>{
      if(!rightButton){
        mouseDown = true;
      }
    });
    draw.addEventListener("mousemove", (e)=>{
      if(mouseDown && !rightButton){
        mouseMove = true;
        this.ball.setAttributeNS(null, 'cx', e.clientX -50);
        this.ball.setAttributeNS(null, 'cy', e.clientY -1);
        this.ball.setAttributeNS(null, 'r', 20);
        this.edgesIn.forEach(element => {
          element.changeEdge = true;
          element.setPosition(
            element.firstNode.ball.getAttribute("cx"),
            element.firstNode.ball.getAttribute("cy"),
            this.ball.getAttribute("cx"),
            this.ball.getAttribute("cy"),
            element.firstNode.ball.getAttribute("r")
          );
          element.changeEdge = false;
        });
        this.edgesOut.forEach(element => {
          element.changeEdge = true;
          element.setPosition(
            this.ball.getAttribute("cx"),
            this.ball.getAttribute("cy"),
            element.secondNode.ball.getAttribute("cx"),
            element.secondNode.ball.getAttribute("cy"),
            this.ball.getAttribute("r")
          );
          element.changeEdge = false;
        });
      }
    });
    this.ball.addEventListener("mouseup", (e)=>{
        if(!rightButton){
      mouseUp = true;
      if(!mouseMove){
        if(isCreatingEdges){  
          isCreatingEdges = false;
          var edge = new Edge(this);
          this.edgesOut.push(edge);
          edges.push(edge);
        }else{
          isCreatingEdges = true;
          this.edgesIn.push(edges[edges.length - 1]);
          edges[edges.length - 1].setPosition(edges[edges.length - 1].firstNode.ball.getAttribute("cx"),
                                              edges[edges.length - 1].firstNode.ball.getAttribute("cy"),
                                              this.ball.getAttribute("cx"),
                                              this.ball.getAttribute("cy"),
                                              10);
          edges[edges.length - 1].secondNode = this;
          edges[edges.length - 1].changeEdge = false;
          mouseMove = true;
        }
      }else{
        this.ball.setAttributeNS(null, 'cx', e.clientX-50);
        this.ball.setAttributeNS(null, 'cy', e.clientY-1);
        mouseMove = false;
      }
    }
      rightButton = false;
      mouseDown = false;
      mouseUp = false;
      mouseMove = false;
    });
  }


  function Edge(node){
    this.firstNode = node;
    this.secondNode;
    this.triangle = document.createElementNS(ns ,"polygon");
    this.triangle.setAttributeNS(null, 'fill', '#F2F5A9');
    this.triangle.setAttributeNS(null, "stroke", "#F79F81");
    this.line = document.createElementNS(ns ,"line");
    this.line.setAttributeNS(null, "stroke", "#F79F81");
    draw.prepend(this.line);
    draw.prepend(this.triangle);
    this.changeEdge = true;
    this.triangle.addEventListener("mouseover", (e)=>{
      this.triangle.setAttributeNS(null, "fill", "#CEECF5");
    });
    this.triangle.addEventListener("mouseout", (e)=>{
      this.triangle.setAttributeNS(null, 'fill', '#F2F5A9');
    });
    draw.addEventListener("mousemove", (e) => {
      this.setPosition(this.firstNode.ball.getAttribute("cx"),
                       this.firstNode.ball.getAttribute("cy"),
                       e.clientX-50,
                       e.clientY-1,
                       this.firstNode.ball.getAttribute("r"));
    }); 
    this.triangle.oncontextmenu = (e)=>  { 
        this.triangle.remove();
        this.line.remove();
        edges.splice(edges.indexOf(this),edges.indexOf(this));
        delete this;
        return false;
    };
    this.setPosition = function(beginX, beginY, endX, endY, r){
      if(this.changeEdge){
        this.line.setAttributeNS(null, "x1", Number(beginX));
        this.line.setAttributeNS(null, "y1", Number(beginY));
        this.line.setAttributeNS(null, "x2", Number(endX));
        this.line.setAttributeNS(null, "y2", Number(endY));
        var coords =  endX + "," + endY + " ";
        var tgOfNearAngle = (beginY - endY) / 
        (beginX - endX);
        var tgOfAngle = Math.tan(Math.PI/2 - Math.atan(tgOfNearAngle));
        var xDelta = (r-5) / Math.sqrt(tgOfAngle*tgOfAngle + 1);
        var yDelta = xDelta*tgOfAngle;
        coords += (Number(beginX) + xDelta) + "," +
        (Number(beginY) - yDelta) +  " " +
        (Number(beginX) - xDelta) + "," +
        (Number(beginY) + yDelta);
        this.triangle.setAttributeNS(null, 'points', coords);
      }
    };
  }


  draw.addEventListener("dblclick", (e)=>{
    var node = new Node(e.clientX -50, e.clientY-1);
    nodes.push(node);
  });
}