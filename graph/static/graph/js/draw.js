window.onload = function(){
  ns = 'http://www.w3.org/2000/svg';
  var nodes = [];
  var edges = [];
  var draw = document.getElementById("draw");
  var names = document.getElementById("names");
  var unorientedButton = document.getElementById("unoriented");
  var orientedButton = document.getElementById("oriented");
  var colorPanel = new ColorPanel();
  var isCreatingEdges = true;
  var isOriented = true;
  var isCreating = true;
  var showNumbOfVertexes = document.getElementById("vertexes");
  var showNumbOfEdges = document.getElementById("edges");
  var showIsTree = document.getElementById("isTree");
  var choseCycle = new ChoseCycle();


  function Node(coordX, coordY){
    this.edgesIn = [];
    this.edgesOut = [];
    this.colorPanelIsOpen = false;
    this.ball = document.createElementNS(ns, 'circle');
    this.ball.setAttributeNS(null, 'cx', coordX);
    this.ball.setAttributeNS(null, 'cy', coordY);
    this.ball.setAttributeNS(null, 'r', 10);
    this.color = "#F5A9A9";
    this.biggerColor = "#FA5858";
    this.ball.setAttributeNS(null, 'fill', this.color);

    this.degreeOfNode = document.createElement("p");
    this.degreeOfNode.innerHTML = 0;
    
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
    names.append(this.degreeOfNode);
    draw.append(this.ball);

    var rightButton = false;
    var mouseDown = false;
    var mouseUp = false;
    var mouseMove = false;

    this.setColor = (color, biggerColor)=>{
      this.ball.setAttributeNS(
        null, "fill", color
      );
      this.color = color;
      this.biggerColor = biggerColor;
    }
    
    this.setOlnyMainColor = (color)=>{
      this.ball.setAttributeNS(null, "fill", color);
    }
    
    this.getColor = ()=>{
      return this.color;
    }
    
    this.ball.addEventListener("dblclick", (e)=>{
      isCreating = false;
      colorPanel.currentObject = this;
      this.colorPanelIsOpen = true;
      animateColorPanel(-140, -40);
      this.ball.setAttributeNS(null, "r", 20);
      this.edgesIn.pop();
      this.edgesOut.pop();
      edges.pop(); 
      this.information.remove();
      showNumbOfVertexes.innerHTML = edges.length;
      this.degreeOfNode.remove();
      this.text.remove();
    });    
    
    draw.addEventListener("mouseup", (e)=>{
      if(this.colorPanelIsOpen){
        console.log("In if" + this);
        animateColorPanel(-40, -140);
        this.colorPanelIsOpen = false;
        this.ball.setAttributeNS(null, "r", 10);
        this.ball.setAttributeNS(null, "fill", this.color);
        this.degreeOfNode.innerHTML = this.edgesIn.length + this.edgesOut.length;
        names.append(this.text);
        names.append(this.degreeOfNode);
      }
      else{
        console.log("out if" + this);
      }
    });

    this.showDegreeOfNode = function(coordXOfNode, coordYOfNode, radius){
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
          "; left: " + (Number(this.ball.getAttribute('cx')) ) +
          "; color: #EEF7A4; font-size:x-large;" +
          "border: 1px solid rgb(255, 203, 203);" +
        "background-color: #424242;"
      );  
    }

    this.ball.addEventListener("mouseover", (e)=>{
      if(!this.colorPanelIsOpen){
        if(!mouseMove && isOriented){
          this.showInformation();
        }
        this.makeNameBigger();
        this.ball.setAttributeNS(null, "fill", this.biggerColor);
        this.ball.setAttributeNS(null, "r", 20);

        if (isOriented){
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
        }else{
          this.edgesOut.forEach(element=>{
            element.triangle.setAttributeNS(null, "fill", "#AC58FA");
          });
          this.edgesIn.forEach(element=>{
            element.triangle.setAttributeNS(null, "fill", "#AC58FA");
          });
        }
        this.showDegreeOfNode(
          this.ball.getAttribute("cx"),
          this.ball.getAttribute("cy"),
          this.ball.getAttribute("r")
          );
        }
      });
      
    this.ball.addEventListener("mouseout", (e) => {
      if(!this.colorPanelIsOpen){
        this.ball.setAttributeNS(null, "r", 10);
      }
        this.text.setAttributeNS(null, "style",
        "position: fixed; top:" + (Number(this.ball.getAttribute('cy')) + 15) +
        "; left: " + (Number(this.ball.getAttribute('cx')) + 25) +
        "; color: #FA5858; font-size: 0.9em;"
        );  
        this.information.remove();
        this.ball.setAttributeNS(null, "fill", this.color);
       
        this.edgesOut.forEach(element=>{
          element.changeEdge = true;
          element.triangle.setAttributeNS(null, "fill", element.color);
          element.setPosition(
            this.ball.getAttribute("cx"),
            this.ball.getAttribute("cy"),
            element.secondNode.ball.getAttribute("cx"),
            element.secondNode.ball.getAttribute("cy"),
            10
          );
          element.changeEdge = false;
        });
        this.edgesIn.forEach(element=>{
          element.triangle.setAttributeNS(null, "fill", element.color);
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
        if(isOriented){
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
        }else{
          this.edgesOut.forEach(element=>{
            element.changeEdge = true;
            element.setPosition(
              this.ball.getAttribute("cx"),
              this.ball.getAttribute("cy"),
              element.secondNode.ball.getAttribute("cx"),
              element.secondNode.ball.getAttribute("cy"),
              this.ball.getAttribute(10)
            );
            element.changeEdge = false;
          });
          this.edgesIn.forEach(element=>{
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
          this.showDegreeOfNode(
            this.ball.getAttribute("cx"),
            this.ball.getAttribute("cy"),
            this.ball.getAttribute("r")
        );
      }
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
          if (isOriented){
            isCreatingEdges = false;
            var edge = new Edge(this);
            this.edgesOut.push(edge);
            edges.push(edge);
          }else{
            isCreatingEdges = false;
            var edge = new Arc(this);
            this.edgesOut.push(edge);
            edges.push(edge);
          }
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
          showNumbOfEdges.innerHTML = edges.length;
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
    this.colorPanelIsOpen = false;
    this.firstNode = node;
    this.isArc = false;
    this.secondNode;
    this.bisieX = 0;
    this.bisieY = 0;
    this.triangle = document.createElementNS(ns ,"path");
    this.color = "#F2F5A9";
    this.triangle.setAttributeNS(null, 'fill', this.color);
    this.triangle.setAttributeNS(null, "stroke", "#F79F81");
    draw.prepend(this.triangle);
    this.changeEdge = true;
    this.triangle.setAttributeNS(null, "stroke-width", "2");

    this.setColor = (color, biggerColor)=>{
      this.triangle.setAttributeNS(
        null, "fill", color
      );
      this.color = color;
    }

    this.setOlnyMainColor = (color)=>{
      this.triangle.setAttributeNS(null, "fill", color);
    }

    this.getColor = ()=>{
      return this.color;
    }

    this.triangle.addEventListener("dblclick", (e)=>{
      isCreating = false;
      colorPanel.currentObject = this;
      this.colorPanelIsOpen = true;
      animateColorPanel(-140, -40);
    }); 
    
    this.triangle.addEventListener("mouseover", (e)=>{
      this.triangle.setAttributeNS(null, "fill", "#CEECF5");
    });
    this.triangle.addEventListener("mouseout", (e)=>{
      this.triangle.setAttributeNS(null, 'fill', this.color);
    });

    var mouseDown = false;

    this.triangle.addEventListener("mousedown", (e)=>{
      mouseDown = true;
    });

    draw.addEventListener("mouseup", (e)=>{
      mouseDown = false;
      this.changeEdge = false;
      if(this.colorPanelIsOpen){
        animateColorPanel(-40, -140);
        this.colorPanelIsOpen = false;
        this.triangle.setAttributeNS(null, "fill", this.color);
      }
    });

    draw.addEventListener("mousemove", (e) => {
      if(mouseDown){
        this.changeEdge = true;
        this.isArc = true;
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
    this.colorPanelIsOpen = false;
    this.firstNode = node;
    this.isArc = false;
    this.secondNode;
    this.bisieX = 0;
    this.bisieY = 0;
    this.color = "#F2F5A9"
    this.triangle = document.createElementNS(ns ,"path");
    this.triangle.setAttributeNS(null, 'fill', this.color);
    this.triangle.setAttributeNS(null, "stroke", "#F79F81");
    draw.prepend(this.triangle);
    this.changeEdge = true;
    this.triangle.setAttributeNS(null, "stroke-width", "2");
    
    
    this.setColor = (color, biggerColor)=>{
      this.triangle.setAttributeNS(
        null, "fill", color
      );
      this.color = color;
    }

    this.setOlnyMainColor = (color)=>{
      this.triangle.setAttributeNS(null, "fill", color);
    }

    this.getColor = ()=>{
      return this.color;
    }

    this.triangle.addEventListener("dblclick", (e)=>{
      isCreating = false;
      colorPanel.currentObject = this;
      this.colorPanelIsOpen = true;
      animateColorPanel(-140, -40);
    }); 
    

    this.triangle.addEventListener("mouseover", (e)=>{
      this.triangle.setAttributeNS(null, "fill", "#CEECF5");
    });
    this.triangle.addEventListener("mouseout", (e)=>{
      this.triangle.setAttributeNS(null, 'fill', this.color);
    });

    var mouseDown = false;

    this.triangle.addEventListener("mousedown", (e)=>{
      mouseDown = true;
    });
    
    draw.addEventListener("mouseup", (e)=>{
      mouseDown = false;
      this.changeEdge = false;
      draw.addEventListener("mouseup", (e)=>{
        mouseDown = false;
        this.changeEdge = false;
        if(this.colorPanelIsOpen){
          animateColorPanel(-40, -140);
          this.colorPanelIsOpen = false;
          this.triangle.setAttributeNS(null, "fill", this.color);
        }
      });
    });
    
    draw.addEventListener("mousemove", (e) => {
      if(mouseDown){
        this.changeEdge = true;
        this.isArc = true;
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
        console.log("here");
        if(!this.isArc){
          var coords = ("M" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          "Q" + " " +
          (Number(beginX) + xDelta) + " " +
          (Number(beginY) - yDelta) + " " +
          (Number(endX) + xDelta) + " " +
          (Number(endY) - yDelta) + " " +
          "L" + " " +
          (Number(endX) - xDelta) + " " +
          (Number(endY) + yDelta) + " " +
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
          (Number(endX) + 5) + " " +
          (Number(endY) - 5) + " " +
          "L" + " " +
          (Number(endX) - 5) + " " +
          (Number(endY) + 5) + " " +
          "Q" + " " +
          (this.bisieX) + " " +
          (this.bisieY) + " " +
          (Number(beginX) - xDelta) + " " +
          (Number(beginY) + yDelta) + " " +
          "Z");
          this.triangle.setAttributeNS(null, "d", coords);
        }
      }
    };
  }

  function ColorPanel(){
    var isClick = false;
    this.addListener = (obj)=>{
      var prevColor;
      obj.addEventListener("mouseover", (e)=>{
        prevColor = this.currentObject.getColor();
        obj.setAttributeNS(null, "stroke-width", "3");
        this.currentObject.setOlnyMainColor(
          obj.getAttribute("fill")
        ); 
      });
      obj.addEventListener("mouseout", (e)=>{
        if(!isClick){
          this.currentObject.setOlnyMainColor(
            prevColor
          );
        }
        obj.setAttributeNS(null, "stroke-width", "0");
        isClick = false;
      });
      obj.addEventListener("click", (e)=>{
        isClick = true;
        switch(obj.getAttribute("fill")){
          case "#F5A9A9":
            this.currentObject.setColor(obj.getAttribute("fill"), "#FA5858");
            break;
          case "#F6CEF5":
            this.currentObject.setColor(obj.getAttribute("fill"), "#ff9dfd");
            break;
          case "#FAFAFA":
            this.currentObject.setColor(obj.getAttribute("fill"), "#c5eeff");
            break;
          case "#96ffe5":
            this.currentObject.setColor(obj.getAttribute("fill"), "#31ffcc");
            break;
          case "#F2F5A9":
            this.currentObject.setColor(obj.getAttribute("fill"), "#ffca5b");
            break;
          }
      });
    }

    this.colors = document.getElementById("colors");
    this.currentObject;
    this.pink = document.getElementById("pink");
    this.addListener(this.pink);
    this.purple = document.getElementById("purple");
    this.addListener(this.purple);
    this.white = document.getElementById("white");
    this.addListener(this.white);
    this.sky = document.getElementById("sky");
    this.addListener(this.sky);
    this.orange = document.getElementById("orange");
    this.addListener(this.orange);


    this.setPosition = (xPosition)=>{
      this.colors.setAttributeNS(null, "x", xPosition);
      this.pink.setAttributeNS(null, "cx", xPosition+70);
      this.purple.setAttributeNS(null, "cx", xPosition+70);
      this.white.setAttributeNS(null, "cx", xPosition+70);
      this.sky.setAttributeNS(null, "cx", xPosition+70);
      this.orange.setAttributeNS(null, "cx", xPosition+70);
    };
  }

  function ChoseCycle(){

    this.choseCycle = document.createElementNS(ns, 'circle');
    draw.append(this.choseCycle);

    this.makeCycle = function(xPosition, yPosition, radius){
      this.choseCycle.setAttributeNS(null, "cx", xPosition);
      this.choseCycle.setAttributeNS(null, "cy", yPosition);
      this.choseCycle.setAttributeNS(null, "r", radius);
    }
  }

  function animateColorPanel(beginPosition, finalPosition){
    var start = Date.now();
    var move = finalPosition - beginPosition;
    var position = beginPosition;
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
      if (timePassed >= 320) {
        clearInterval(timer);
        return;
      }
      draw(timePassed);
    }, 20);

    function draw() {
      position += move/15;
      colorPanel.setPosition(position);
    }
  }

  function clear(){
    showNumbOfEdges.innerHTML = 0;
    showNumbOfVertexes.innerHTML = 0;
    nodes.forEach(node =>{
      node.ball.remove();
      delete node.ball;
      node.degreeOfNode.remove();
      delete node.degreeOfNode;
      node.information.remove();
      delete node.information;
      node.text.remove();
      delete node.text;
    });
    nodes = [];
    edges.forEach(edge=>{
      edge.triangle.remove();
      delete edge.triangle;
    });
    edges = [];
  }

  unorientedButton.addEventListener("click", clear);
  unorientedButton.addEventListener("click", (e)=>{
    isOriented = false;
  });

  orientedButton.addEventListener("click", clear);
  orientedButton.addEventListener("click", (e)=>{
    isOriented = true;
  });

  draw.addEventListener("dblclick", (e)=>{
    if(isCreating){
      var node = new Node(e.clientX -50, e.clientY-1);
      nodes.push(node);
      showNumbOfVertexes.innerHTML = nodes.length;
    }
    isCreating = true;
  });
}
