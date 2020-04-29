window.onload = function(){
  ns = 'http://www.w3.org/2000/svg';
  var nodes = [];
  var edges = [];
  var draw = document.getElementById("draw");
  var names = document.getElementById("names");
  var isCreatingEdges = true;

  function Node(coordX, coordY){
    this.edgesIn = [];
    this.edgesOut = [];

    this.ball = document.createElementNS(ns, 'circle');
    this.ball.setAttributeNS(null, 'cx', coordX);
    this.ball.setAttributeNS(null, 'cy', coordY);
    this.ball.setAttributeNS(null, 'r', 10);
    this.ball.setAttributeNS(null, 'fill', "#F5A9A9");

    this.degreeOfNode = document.createElement("p");
    this.degreeOfNode.innerHTML = 0;
    names.append(this.degreeOfNode);

    this.information = document.createElement('p');
    this.text = document.createElement('p');
    this.name = "vertex" + nodes.length;
    this.text.innerHTML = this.name;
    this.text.setAttributeNS(null, "contenteditable", "true");
    this.text.setAttributeNS(null, "style",
    "position: fixed; top:"
    + (coordY + 10) + "; left: "
    + (coordX + 25) + "; color: #FA5858;"
    );
    names.append(this.text);

    draw.append(this.ball);

    var rightButton = false;
    var mouseDown = false;
    var mouseUp = false;
    var mouseMove = false;

    this.showDegreeOfNode = function(coordXOfNode, coordYOfNode, radius){
      console.log(radius);
      this.degreeOfNode.innerHTML = this.edgesIn.length + this.edgesOut.length;
      this.degreeOfNode.setAttributeNS(
        null,
        "style",
        ("position: fixed; " +
        "top: " + (Number(coordYOfNode) - (15 + Number(radius))) + ";" +
        "left: " + (Number(coordXOfNode) + 30) + ";" +
        "color: #00FA9A;" +
        "font-size: small;"+
        "background-color: #2F4F4F;")
        );
      }
      this.showDegreeOfNode(coordX, coordY, this.ball.getAttribute("r"));

      this.showInformation = function(){
        this.information.innerHTML = "in: " + this.edgesIn.length + "<br/>"
        + "out: " + this.edgesOut.length;
      this.information.setAttributeNS(
       null,
       "style",
       ("position: fixed; " +
       "top: " + (Number(this.ball.getAttribute('cy')) - 60) + ";" +
       "left: " + (Number(this.ball.getAttribute('cx')) + 70) + ";" +
       "color: #EEF7A4;" +
       "wigth: 100; " +
       "height: 50" +
       "font-size: xx-small;" +
       "border: 1px solid #F5A9A9;" +
       "background-color: #35414A;")
       );
       names.append(this.information);
      }

    this.makeNameBigger = function(){
      this.text.setAttributeNS(
        null,
        "style",
        "position: fixed; top:" + (Number(this.ball.getAttribute('cy')) + 10) +
        "; left: " + (Number(this.ball.getAttribute('cx')) + 15) +
        "; color: #EEF7A4; font-size:x-large;" +
        "border: 1px solid rgb(255, 203, 203);" +
        "background-color: #424242;"
      );
    }

    this.ball.addEventListener("mouseover", (e)=>{
      if(!mouseMove){
        this.showInformation();
      }
      this.makeNameBigger();
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
      this.showDegreeOfNode(
        this.ball.getAttribute("cx"),
        this.ball.getAttribute("cy"),
        this.ball.getAttribute("r")
      );
    });

    this.ball.addEventListener("mouseout", (e) => {
      this.information.remove();
      this.ball.setAttributeNS(null, "fill", "#F5A9A9");
      this.ball.setAttributeNS(null, "r", 10);
      this.text.setAttributeNS(null, "style",
        "position: fixed; top:" + (Number(this.ball.getAttribute('cy')) + 10) +
        "; left: " + (Number(this.ball.getAttribute('cx')) + 25) +
        "; color: #FA5858;"
      );
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
      this.showDegreeOfNode(
        this.ball.getAttribute("cx"),
        this.ball.getAttribute("cy"),
        this.ball.getAttribute("r")
      );
    });
    this.ball.oncontextmenu = (e)=>  {
        rightButton = true;
        this.edgesIn.forEach(element=>{
            element.triangle.remove();
            edges.splice(edges.indexOf(element),edges.indexOf(element));
            delete element;
        });
        this.edgesOut.forEach(element=>{
            element.triangle.remove();
            edges.splice(edges.indexOf(element), edges.indexOf(element));
            delete element;
        });
        this.degreeOfNode.remove();
        this.text.remove();
        this.information.remove();
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
        this.makeNameBigger();
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
      this.showDegreeOfNode(
        this.ball.getAttribute("cx"),
        this.ball.getAttribute("cy"),
        this.ball.getAttribute("r")
      );
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
          edges[edges.length - 1].setPosition(
            edges[edges.length - 1].firstNode.ball.getAttribute("cx"),
            edges[edges.length - 1].firstNode.ball.getAttribute("cy"),
            this.ball.getAttribute("cx"),
            this.ball.getAttribute("cy"),
            10
          );
          edges[edges.length - 1].secondNode = this;
          edges[edges.length - 1].changeEdge = false;
          mouseMove = true;
        }
      }else{
        this.ball.setAttributeNS(null, 'cx', e.clientX-50);
        this.ball.setAttributeNS(null, 'cy', e.clientY-1);
        this.makeNameBigger();
        mouseMove = false;
      }
    }
      rightButton = false;
      mouseDown = false;
      mouseUp = false;
      mouseMove = false;
      this.showDegreeOfNode(
        this.ball.getAttribute("cx"),
        this.ball.getAttribute("cy"),
        this.ball.getAttribute("r")
      );
    });
  }


  function Edge(node){
    this.firstNode = node;
    this.isArc = false;
    this.secondNode;
    this.bisieX = 0;
    this.bisieY = 0;
    this.triangle = document.createElementNS(ns ,"path");
    this.triangle.setAttributeNS(null, 'fill', '#F2F5A9');
    this.triangle.setAttributeNS(null, "stroke", "#F79F81");
    draw.prepend(this.triangle);
    this.changeEdge = true;
    this.triangle.setAttributeNS(null, "stroke-width", "2");
    this.triangle.addEventListener("mouseover", (e)=>{
      this.triangle.setAttributeNS(null, "fill", "#CEECF5");
    });
    this.triangle.addEventListener("mouseout", (e)=>{
      this.triangle.setAttributeNS(null, 'fill', '#F2F5A9');
    });

    var mouseDown = false;

    this.triangle.addEventListener("mousedown", (e)=>{
      this.isArc = true;
      mouseDown = true;
      this.changeEdge = true;
    });

    draw.addEventListener("mouseup", (e)=>{
      mouseDown = false;
      this.changeEdge = false;
    });

    draw.addEventListener("mousemove", (e) => {
      if(mouseDown){
        this.bisieX = e.clientX;
        this.bisieY = e.clientY;
        this.setPosition(
          this.firstNode.ball.getAttribute("cx"),
          this.firstNode.ball.getAttribute("cy"),
          this.secondNode.ball.getAttribute("cx"),
          this.secondNode.ball.getAttribute("cy"),
          this.firstNode.ball.getAttribute("r"));
      } else {
        this.setPosition(
          this.firstNode.ball.getAttribute("cx"),
          this.firstNode.ball.getAttribute("cy"),
          e.clientX-50,
          e.clientY-1,
          this.firstNode.ball.getAttribute("r")
          );
      }
    });
    this.triangle.oncontextmenu = (e)=>  {
        this.triangle.remove();
        edges.splice(edges.indexOf(this),edges.indexOf(this));
        delete this;
        return false;
    };
    this.setPosition = function(beginX, beginY, endX, endY, r){
      if(this.changeEdge){
        var tgOfNearAngle = (beginY - endY) /
        (beginX - endX);
        var tgOfAngle = Math.tan(Math.PI/2 - Math.atan(tgOfNearAngle));
        var xDelta = (r-5) / Math.sqrt(tgOfAngle*tgOfAngle + 1);
        var yDelta = xDelta*tgOfAngle;
        if(!this.isArc){
          var coords = ("M" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          "Q" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          endX + " " +
          endY + " " +
          "Q" + " " +
          (Number(endX)) + " " +
          (Number(endY)) + " " +
          (Number(beginX) - xDelta) + " " +
          (Number(beginY) + yDelta) + " " +
          "Z");
          this.triangle.setAttributeNS(null, "d", coords);
        }else{
          var tgOfNearAngle = (beginY - this.bisieY) /
            (beginX - this.bisieX);
          var tgOfAngle = Math.tan(Math.PI/2 - Math.atan(tgOfNearAngle));
          var xDelta = (r-5) / Math.sqrt(tgOfAngle*tgOfAngle + 1);
          var yDelta = xDelta*tgOfAngle;
          var coords = ("M" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          "Q" + " " +
          this.bisieX + " " +
          this.bisieY + " " +
          endX + " " +
          endY + " " +
          "Q" + " " +
          this.bisieX + " " +
          this.bisieY + " " +
          (Number(beginX) - xDelta) + " " +
          (Number(beginY) + yDelta) + " " +
          "Z");
          this.triangle.setAttributeNS(null, "d", coords);
        }
      }
    };
  }

  function Arc(node){
    this.firstNode = node;
    this.isArc = false;
    this.secondNode;
    this.bisieX = 0;
    this.bisieY = 0;
    this.triangle = document.createElementNS(ns ,"path");
    this.triangle.setAttributeNS(null, 'fill', '#F2F5A9');
    this.triangle.setAttributeNS(null, "stroke", "#F79F81");
    draw.prepend(this.triangle);
    this.changeEdge = true;
    this.triangle.setAttributeNS(null, "stroke-width", "2");
    this.triangle.addEventListener("mouseover", (e)=>{
      this.triangle.setAttributeNS(null, "fill", "#CEECF5");
    });
    this.triangle.addEventListener("mouseout", (e)=>{
      this.triangle.setAttributeNS(null, 'fill', '#F2F5A9');
    });

    var mouseDown = false;

    this.triangle.addEventListener("mousedown", (e)=>{
      this.isArc = true;
      mouseDown = true;
      this.changeEdge = true;
    });

    draw.addEventListener("mouseup", (e)=>{
      mouseDown = false;
      this.changeEdge = false;
    });

    draw.addEventListener("mousemove", (e) => {
      if(mouseDown){
        this.bisieX = e.clientX;
        this.bisieY = e.clientY;
        this.setPosition(
          this.firstNode.ball.getAttribute("cx"),
          this.firstNode.ball.getAttribute("cy"),
          this.secondNode.ball.getAttribute("cx"),
          this.secondNode.ball.getAttribute("cy"),
          this.firstNode.ball.getAttribute("r"));
      } else {
        this.setPosition(
          this.firstNode.ball.getAttribute("cx"),
          this.firstNode.ball.getAttribute("cy"),
          e.clientX-50,
          e.clientY-1,
          this.firstNode.ball.getAttribute("r")
          );
      }
    });
    this.triangle.oncontextmenu = (e)=>  {
        this.triangle.remove();
        edges.splice(edges.indexOf(this),edges.indexOf(this));
        delete this;
        return false;
    };
    this.setPosition = function(beginX, beginY, endX, endY, r){
      if(this.changeEdge){
        var tgOfNearAngle = (beginY - endY) /
        (beginX - endX);
        var tgOfAngle = Math.tan(Math.PI/2 - Math.atan(tgOfNearAngle));
        var xDelta = (r-5) / Math.sqrt(tgOfAngle*tgOfAngle + 1);
        var yDelta = xDelta*tgOfAngle;
        if(!this.isArc){
          var coords = ("M" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          "Q" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          endX + " " +
          endY + " " +
          "Q" + " " +
          (Number(endX)) + " " +
          (Number(endY)) + " " +
          (Number(beginX) - xDelta) + " " +
          (Number(beginY) + yDelta) + " " +
          "Z");
          this.triangle.setAttributeNS(null, "d", coords);
        }else{
          var tgOfNearAngle = (beginY - this.bisieY) /
            (beginX - this.bisieX);
          var tgOfAngle = Math.tan(Math.PI/2 - Math.atan(tgOfNearAngle));
          var xDelta = (r-5) / Math.sqrt(tgOfAngle*tgOfAngle + 1);
          var yDelta = xDelta*tgOfAngle;
          var coords = ("M" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          "Q" + " " +
          this.bisieX + " " +
          this.bisieY + " " +
          endX + " " +
          endY + " " +
          "Q" + " " +
          this.bisieX + " " +
          this.bisieY + " " +
          (Number(beginX) - xDelta) + " " +
          (Number(beginY) + yDelta) + " " +
          "Z");
          this.triangle.setAttributeNS(null, "d", coords);
        }
      }
    };
  }



  draw.addEventListener("dblclick", (e)=>{
    var node = new Node(e.clientX -50, e.clientY-1);
    nodes.push(node);
  });
}
