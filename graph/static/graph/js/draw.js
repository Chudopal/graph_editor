$(document).ready(function(){
  ns = 'http://www.w3.org/2000/svg';
  var draw = document.getElementById("draw");
  var names = document.getElementById("names");
  var unorientedButton = document.getElementById("unoriented");
  var orientedButton = document.getElementById("oriented");
  var colorPanel = new ColorPanel();
  var isCreatinedges = true;
  var isCreating = true;
  var showNumbOfVertexes = document.getElementById("vertexes");
  var showNumbOfedges = document.getElementById("edges");
  var showIsTree = document.getElementById("isTree");
  var choseCircle = new ChoseCircle();
  var graphsInformation = document.getElementById("layer");
  var graph = new Graph();

  $("#here").on("click", function(){
    makeRequest("localhost:8989/edit-graph/graph")
  })


  function makeRequest(url) {
    var httpRequest = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
            // Читайте ниже об этой строке
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!httpRequest) {
        alert('Не вышло :( Невозможно создать экземпляр класса XMLHTTP ');
        return false;
    }
    httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
    httpRequest.open('GET', url, true);
    httpRequest.send(null);
  }



  function alertContents(httpRequest) {

     if (httpRequest.readyState == 4) {
         if (httpRequest.status == 200) {
             alert(httpRequest.responseText);
         } else {
             alert('С запросом возникла проблема.');
         }
      }

  }



  function Graph(){
    this.nodes = [];
    this.edges = [];
    this.oriented = false;
    this.name = new NameOfGraph();
  }

  function Node(coordX, coordY){
    this.coordX = coordX;
    this.coordY = coordY;
    this.name;
    this.radius = 10;
    this.edgesIn = [];
    this.edgesOut = [];
    this.color = "#F5A9A9";
    this.biggerColor = "#FA5858";
    
    this.isfigure = true;
    this.isCircle = false;
    this.isRectangle = false;
    this.isPolygon = false;

    this.initialyse = ()=>{
      this.figure = document.createElementNS(ns, 'circle');
      this.figure.setAttributeNS(null, 'cx', this.coordX);
      this.figure.setAttributeNS(null, 'cy', this.coordY);
      this.figure.setAttributeNS(null, 'r', this.radius);
      this.figure.setAttributeNS(null, 'fill', this.color);
      this.degreeOfNode = document.createElement("p");
      this.degreeOfNode.innerHTML = 0;
      
      this.information = document.createElement('p');
      this.text = document.createElement('p');
      this.name = "vertex" + graph.nodes.length;
      this.text.innerHTML = this.name;
      this.text.setAttributeNS(null, "contenteditable", "true");
      this.text.setAttributeNS(null, "style",
      "position: fixed; top:"
      + (this.coordY + 10) + "; left: "
      + (this.coordX + 25) + "; color: #FA5858;"
      );
      names.append(this.text);
      names.append(this.degreeOfNode);
      draw.append(this.figure);
    
    }

    this.initialyse();


    var colorPanelIsOpen = false;
    var rightButton = false;
    var mouseDown = false;
    var mouseUp = false;
    var mouseMove = false;

    this.setListeners = ()=>{
      this.figure.addEventListener("dblclick", (e)=>{
        isCreating = false;
        colorPanel.currentObject = this;
        colorPanelIsOpen = true;
        this.makeBigger();
        this.edgesIn.pop();
        this.edgesOut.pop();
        graph.edges.pop(); 
        this.information.remove();
        showNumbOfVertexes.innerHTML = graph.edges.length;
        this.degreeOfNode.remove();
        this.text.remove();
        choseCircle.currentObject = this;
        draw.append(choseCircle.choseCircle);
        draw.append(choseCircle.ball);
        draw.append(choseCircle.circle);
        draw.append(choseCircle.rectangle);
        draw.append(choseCircle.polygon);
        draw.append(this.figure);
        choseCircle.setListeners();
        animateColorPanel(
          -140, -40, false,
          this.coordX,
          this.coordY,
          0, 80
        );
      });    

      draw.addEventListener("mouseup", (e)=>{
        if(colorPanelIsOpen){
          animateColorPanel(
            -40, -140, false,
            this.coordX,
            this.coordY,
            80, 0
          );
          colorPanelIsOpen = false;
          this.makeSmaller();
          this.degreeOfNode.innerHTML = this.edgesIn.length + this.edgesOut.length;
          names.append(this.text);
          names.append(this.degreeOfNode);
          
        }
      });

      this.figure.addEventListener("mouseover", (e)=>{
        if(!colorPanelIsOpen){
          if(!mouseMove && graph.oriented){
            this.showInformation();
          }
          this.makeNameBigger();
          this.makeBigger();
  
          if (graph.oriented){
            this.edgesOut.forEach(element=>{
              element.changeEdge = true;
              element.triangle.setAttributeNS(null, "fill", "#2EFEC8");
              element.setPosition(
                this.coordX,
                this.coordY,
                element.secondNode.coordX,
                element.secondNode.coordY,
                this.radius
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
            this.coordX,
            this.coordY,
            this.radius
            );
          }
        });
        
      this.figure.addEventListener("mouseout", (e) => {
        if(!colorPanelIsOpen){
          this.makeSmaller();
        }
          this.text.setAttributeNS(null, "style",
          "position: fixed; top:" + (Number(this.coordY) + 15) +
          "; left: " + (Number(this.coordX) + 25) +
          "; color: #FA5858; font-size: 0.9em;"
          );  
          this.information.remove();
          this.makeSmaller();
         
          this.edgesOut.forEach(element=>{
            element.changeEdge = true;
            element.triangle.setAttributeNS(null, "fill", element.color);
            element.setPosition(
              this.coordX,
              this.coordY,
              element.secondNode.coordX,
              element.secondNode.coordY,
              10
            );
            element.changeEdge = false;
          });
          this.edgesIn.forEach(element=>{
            element.triangle.setAttributeNS(null, "fill", element.color);
          });
          this.showDegreeOfNode(
            this.coordX,
            this.coordY,
            this.radius
          );
        
      });
      this.figure.oncontextmenu = (e)=>  {
          rightButton = true;
          this.edgesIn.forEach(element=>{
              element.triangle.remove();
              graph.edges.splice(graph.edges.indexOf(element),graph.edges.indexOf(element));
              delete element;
          });
          this.edgesOut.forEach(element=>{
              element.triangle.remove();
              graph.edges.splice(graph.edges.indexOf(element), graph.edges.indexOf(element));
              delete element;
          });
          this.degreeOfNode.remove();
          this.text.remove();
          this.information.remove();
          this.figure.remove();
          graph.nodes.splice(graph.nodes.indexOf(this), graph.nodes.indexOf(this));
          delete this;
          return false;
      };
      this.figure.addEventListener("mousedown", (e)=>{
        if(!rightButton){
          mouseDown = true;
        }
      });
      draw.addEventListener("mousemove", (e)=>{
        if(mouseDown && !rightButton){
          this.coordX = e.clientX - 50;
          this.coordY = e.clientY - 1;
          mouseMove = true;
          this.setPosition();
          this.makeNameBigger();
          if(graph.oriented){
            this.edgesIn.forEach(element => {
              element.changeEdge = true;
              element.setPosition(
                element.firstNode.coordX,
                element.firstNode.coordY,
                this.coordX,
                this.coordY,
                element.firstNode.radius
              );
              element.changeEdge = false;
            });
            this.edgesOut.forEach(element => {
              element.changeEdge = true;
              element.setPosition(
                this.coordX,
                this.coordY,
                element.secondNode.coordX,
                element.secondNode.coordY,
                this.radius
              );
              element.changeEdge = false;
            });
          }else{
            this.edgesOut.forEach(element=>{
              element.changeEdge = true;
              element.setPosition(
                this.coordX,
                this.coordY,
                element.secondNode.coordX,
                element.secondNode.coordY,
                this.radius
              );
              element.changeEdge = false;
            });
            this.edgesIn.forEach(element=>{
              element.changeEdge = true;
              element.setPosition(
                element.firstNode.coordX,
                element.firstNode.coordY,
                this.coordX,
                this.coordY,
                element.firstNode.radius
              );
              element.changeEdge = false;
            });
            this.showDegreeOfNode(
              this.coordX,
              this.coordY,
              this.radius
          );
        }
        this.showDegreeOfNode(
          this.coordX,
          this.coordY,
          this.radius
        );
        }
      });
  
  
      this.figure.addEventListener("mouseup", (e)=>{
        if(!rightButton){
        mouseUp = true;
        if(!mouseMove){
          if(isCreatinedges){
            if (graph.oriented){
              isCreatinedges = false;
              var edge = new Edge(this);
              this.edgesOut.push(edge);
              graph.edges.push(edge);
            }else{
              isCreatinedges = false;
              var edge = new Arc(this);
              this.edgesOut.push(edge);
              graph.edges.push(edge);
            }
          }else{
            isCreatinedges = true;
            this.edgesIn.push(graph.edges[graph.edges.length - 1]);
            graph.edges[graph.edges.length - 1].setPosition(
              graph.edges[graph.edges.length - 1].firstNode.coordX,
              graph.edges[graph.edges.length - 1].firstNode.coordY,
              this.coordX,
              this.coordY,
              10
            );
            graph.edges[graph.edges.length - 1].secondNode = this;
            graph.edges[graph.edges.length - 1].changeEdge = false;
            mouseMove = true;
            showNumbOfedges.innerHTML = graph.edges.length;
          }
        }else{
          this.coordX = e.clientX - 50;
          this.coordY = e.clientY -1;
          this.setPosition();
          this.makeNameBigger();
          mouseMove = false;
        }
      }
        rightButton = false;
        mouseDown = false;
        mouseUp = false;
        mouseMove = false;
        this.showDegreeOfNode(
          this.coordX,
          this.coordY,
          this.radius
        );
      });
      
    }

    this.setListeners();

    this.setFigure = ()=>{
      this.radius = 20
      if(this.isfigure){
        this.figure.remove();
        this.figure = document.createElementNS(ns, 'circle');
        this.figure.setAttributeNS(null, 'cx', this.coordX);
        this.figure.setAttributeNS(null, 'cy', this.coordY);
        this.figure.setAttributeNS(null, 'r', this.radius);
        this.figure.setAttributeNS(null, 'fill', this.color);
        draw.append(this.figure);
        this.setListeners();
      }
      if(this.isCircle){
        this.figure.remove();
        this.figure = document.createElementNS(ns, 'circle');
        this.figure.setAttributeNS(null, 'cx', this.coordX);
        this.figure.setAttributeNS(null, 'cy', this.coordY);
        this.figure.setAttributeNS(null, 'r', this.radius);
        this.figure.setAttributeNS(null, "stroke-width", 4);
        this.figure.setAttributeNS(null, "stroke", this.color);
        this.figure.setAttributeNS(null, 'fill', "#212f35");
        draw.append(this.figure);
        this.setListeners();
      }
      if(this.isRectangle){
        this.figure.remove();
        this.figure = document.createElementNS(ns, 'rect');
        this.figure.setAttributeNS(null, 'fill', this.color);
        this.figure.setAttributeNS(null, 'x', Number(this.coordX) - this.radius);
        this.figure.setAttributeNS(null, 'y', Number(this.coordY) - this.radius);
        this.figure.setAttributeNS(null, 'width', 2*this.radius);
        this.figure.setAttributeNS(null, 'height', 2*this.radius);
        draw.append(this.figure);
        this.setListeners();
      }
      if(this.isPolygon){ 
        this.figure.remove();
        this.figure = document.createElementNS(ns, 'polygon');
        this.figure.setAttributeNS(
          null,
          "points",
          this.coordX + "," +
          (Number(this.coordY) - 40/3 - 7 ) + " " +
          (Number(this.coordX) + 10 + 7) + "," +
          (Number(this.coordY) + 20/3 + 7) + " " + 
          (Number(this.coordX) - 10 - 7) + "," +
          (Number(this.coordY) + 20/3 + 7)
        )
        this.figure.setAttributeNS(null, "stroke-width", 4);
        this.figure.setAttributeNS(null, 'fill', "#212f35");
        this.figure.setAttributeNS(null, 'stroke', this.color);
        draw.append(this.figure);
        this.setListeners();
      }
    }

    this.setPosition = function(){
      if(this.isfigure){
        console.log("here");
        this.figure.setAttributeNS(null, "cx", this.coordX);
        this.figure.setAttributeNS(null, "cy", this.coordY);
      } 
      if(this.isCircle){
        this.figure.setAttributeNS(null, "cx", this.coordX);
        this.figure.setAttributeNS(null, "cy", this.coordY);
      }
      if(this.isRectangle){
        this.figure.setAttributeNS(null, 'x', Number(this.coordX) - 10);
        this.figure.setAttributeNS(null, 'y', Number(this.coordY) - 10);
        this.figure.setAttributeNS(null, 'width', 20);
        this.figure.setAttributeNS(null, 'height', 20);
      }
      console.log("here");
      if(this.isPolygon){
        this.figure.setAttributeNS(
          null,
          "points",
          this.coordX + "," +
          (Number(this.coordY) - 40/3 - 7 ) + " " +
          (Number(this.coordX) + 10 + 7) + "," +
          (Number(this.coordY) + 20/3 + 7) + " " + 
          (Number(this.coordX) - 10 - 7) + "," +
          (Number(this.coordY) + 20/3 + 7)
        )
      }
    }

    
    this.changeColor = function(color){
      if(this.isfigure){
        console.log("here");
        this.figure.setAttributeNS(null, "fill", this.color);
      }
      if(this.isCircle){
        this.figure.setAttributeNS(null, "stroke", this.color);
        this.figure.setAttributeNS(null, "fill", "#212f35");
      }
      if(this.isRectangle){
        this.figure.setAttributeNS(null, "fill", this.color);
      }
      if(this.isPolygon){
        this.figure.setAttributeNS(null, "stroke", this.color);
        this.figure.setAttributeNS(null, "fill", "#212f35");
      }
    }
    
    this.setColor = (color, biggerColor)=>{
      this.color = color;
      this.biggerColor = biggerColor;
      this.changeColor();
    }


    this.makeBigger = function(){
      this.radius = 20;
      if(this.isfigure){
        this.figure.setAttributeNS(null, "r", 20);
        this.figure.setAttributeNS(null, "fill", this.biggerColor);
      }
      if(this.isCircle){
        this.figure.setAttributeNS(null, "stroke-width", "8");
        this.figure.setAttributeNS(null, "stroke", this.biggerColor);
      }
      if(this.isRectangle){
        this.figure.setAttributeNS(null, 'x', Number(this.coordX) - 20);
        this.figure.setAttributeNS(null, 'y', Number(this.coordY) - 20);
        this.figure.setAttributeNS(null, 'width', 40);
        this.figure.setAttributeNS(null, 'height', 40);
        this.figure.setAttributeNS(null, "fill", this.biggerColor);
      }
      if(this.isPolygon){
        this.figure.setAttributeNS(null, "stroke-width", "8");
        this.figure.setAttributeNS(null, "stroke", this.biggerColor);
      }
    }

    this.makeSmaller = function(){
      this.radius = 10
      if(this.isfigure){
        this.figure.setAttributeNS(null, "r", 10);
        this.figure.setAttributeNS(null, "fill", this.color);
      }
      if(this.isCircle){
        this.figure.setAttributeNS(null, "stroke-width", "4");
        this.figure.setAttributeNS(null, "stroke", this.color);
      }
      if(this.isRectangle){
        this.figure.setAttributeNS(null, 'x', Number(this.coordX) - 10);
        this.figure.setAttributeNS(null, 'y', Number(this.coordY) - 10);
        this.figure.setAttributeNS(null, 'width', 20);
        this.figure.setAttributeNS(null, 'height', 20);
        this.figure.setAttributeNS(null, "fill", this.color);
      }
      if(this.isPolygon){
        this.figure.setAttributeNS(null, "stroke-width", "4");
        this.figure.setAttributeNS(null, "stroke", this.color);
      }
    }
    
    this.getColor = ()=>{
      return this.color;
    }

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

    this.showDegreeOfNode(coordX, coordY, this.radius);
      
    this.showInformation = function(){
      this.information.innerHTML = "in: " + this.edgesIn.length + "<br/>"
        + "out: " + this.edgesOut.length;
      this.information.setAttributeNS(
       null,
       "style",
       ("position: fixed; " +
       "top: " + (Number(this.coordY) - 60) + ";" +
       "left: " + (Number(this.coordX) + 70) + ";" +
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
          "position: fixed; top:" + (Number(this.coordY) + 10) +
          "; left: " + (Number(this.coordX) ) +
          "; color: #EEF7A4; font-size:x-large;" +
          "border: 1px solid rgb(255, 203, 203);" +
        "background-color: #424242;"
      );  
    }
  }

  function Edge(node){
    var colorPanelIsOpen = false;
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
      colorPanelIsOpen = true;
      animateColorPanel(-140, -40, true);
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
      if(colorPanelIsOpen){
        animateColorPanel(-40, -140);
        colorPanelIsOpen = false;
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
          this.firstNode.coordX,
          this.firstNode.coordY,
          this.secondNode.coordX,
          this.secondNode.coordY,
          this.firstNode.radius);
      } else {
        this.setPosition(
          this.firstNode.coordX,
          this.firstNode.coordY,
          e.clientX-50,
          e.clientY-1,
          this.firstNode.radius
          );
      }
    });
    this.triangle.oncontextmenu = (e)=>  {
        this.triangle.remove();
        graph.edges.splice(graph.edges.indexOf(this),graph.edges.indexOf(this));
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
    colorPanelIsOpen = false;
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
      colorPanelIsOpen = true;
      animateColorPanel(-140, -40, true);
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
        if(colorPanelIsOpen){
          animateColorPanel(-40, -140);
          colorPanelIsOpen = false;
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
          this.firstNode.coordX,
          this.firstNode.coordY,
          this.secondNode.coordX,
          this.secondNode.coordY,
          this.firstNode.radius);
      } else {
        this.setPosition(
          this.firstNode.coordX,
          this.firstNode.coordY,
          e.clientX-50,
          e.clientY-1,
          this.firstNode.radius
          );
      }
    });

    this.triangle.oncontextmenu = (e)=>  {
        this.triangle.remove();
        graph.edges.splice(graph.edges.indexOf(this),graph.edges.indexOf(this));
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
        this.currentObject.setColor(
          obj.getAttribute("fill")
        ); 
      });
      obj.addEventListener("mouseout", (e)=>{
        if(!isClick){
          this.currentObject.setColor(
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

  function ChoseCircle(){

    this.currentObject;

    this.setListeners = ()=>{
      this.ball.addEventListener("mouseover", (e)=>{
        this.currentObject.isfigure     = true;
        this.currentObject.isCircle     = false;
        this.currentObject.isPolygon    = false;
        this.currentObject.isRectangle  = false;
        this.currentObject.setFigure();
      });
      this.ball.addEventListener("click", (e)=>{
        this.currentObject.isfigure     = true;
        this.currentObject.isCircle     = false;
        this.currentObject.isPolygon    = false;
        this.currentObject.isRectangle  = false;
        this.currentObject.setFigure();
      });
      this.circle.addEventListener("mouseover", (e)=>{
        this.currentObject.isfigure     = false;
        this.currentObject.isCircle     = true;
        this.currentObject.isPolygon    = false;
        this.currentObject.isRectangle  = false;
        this.currentObject.setFigure();
      });
      this.circle.addEventListener("click", (e)=>{
        this.currentObject.isfigure     = false;
        this.currentObject.isCircle     = true;
        this.currentObject.isPolygon    = false;
        this.currentObject.isRectangle  = false;
        this.currentObject.setFigure();
      });

      this.rectangle.addEventListener("mouseover", (e)=>{
        
        this.currentObject.isfigure     = false;
        this.currentObject.isCircle     = false;
        this.currentObject.isPolygon    = false;
        this.currentObject.isRectangle  = true;
        this.currentObject.setFigure();
      });
      this.rectangle.addEventListener("click", (e)=>{
        this.currentObject.isfigure     = false;
        this.currentObject.isCircle     = false;
        this.currentObject.isPolygon    = false;
        this.currentObject.isRectangle  = true;
        this.currentObject.setFigure();
      });

      this.polygon.addEventListener("mouseover", (e)=>{
        this.currentObject.isfigure       = false;
        this.currentObject.isCircle     = false;
        this.currentObject.isPolygon    = true;
        this.currentObject.isRectangle  = false;
        this.currentObject.setFigure();
      });
      this.polygon.addEventListener("click", (e)=>{
        this.currentObject.isfigure     = false;
        this.currentObject.isCircle     = false;
        this.currentObject.isPolygon    = true;
        this.currentObject.isRectangle  = false;
        this.currentObject.setFigure();
      });
    }

    this.choseCircle = document.createElementNS(ns, 'circle');
    
    this.ball = document.createElementNS(ns, "circle");
    this.circle = document.createElementNS(ns, "circle");
    this.rectangle = document.createElementNS(ns, 'rect');
    this.polygon = document.createElementNS(ns, 'polygon');

    this.choseCircle.setAttributeNS(null, "fill", "#2a3c46"); 
    this.choseCircle.setAttributeNS(null, "stroke", "rgb(15, 15, 15)");
    this.ball.setAttributeNS(null, "fill", "#FCB84D");
    this.circle.setAttributeNS(null, "stroke", "#FCB84D");
    this.circle.setAttributeNS(null, "fill", "none");
    this.circle.setAttributeNS(null, "r", 18);
    this.rectangle.setAttributeNS(null, "fill", "#FCB84D");
    this.polygon.setAttributeNS(null, "stroke", "#FCB84D");
    this.polygon.setAttributeNS(null, "fill", "none");

    this.makeCircle = function(xPosition, yPosition, radius){
      this.choseCircle.setAttributeNS(null, "cx", xPosition);
      this.choseCircle.setAttributeNS(null, "cy", yPosition);
      this.choseCircle.setAttributeNS(null, "r", radius);

      this.ball.setAttributeNS(null, "cx", Number(xPosition) );
      this.ball.setAttributeNS(null, "cy", Number(yPosition) - 50);
      this.ball.setAttributeNS(null, "r", radius*0.22);

      this.circle.setAttributeNS(null, "cx",  Number(xPosition) + 50);
      this.circle.setAttributeNS(null, "cy", yPosition);
      this.circle.setAttributeNS(null, "stroke-width", radius*0.05);

      this.rectangle.setAttributeNS(null, "x",  Number(xPosition) - 17);
      this.rectangle.setAttributeNS(null, "y",  Number(yPosition) + 30);
      this.rectangle.setAttributeNS(null, "width", radius * 0.40);
      this.rectangle.setAttributeNS(null, "height", radius * 0.40);

      this.polygon.setAttributeNS(
        null,
        "points",
        ( Number(xPosition) - 35) + "," +
        ( Number(yPosition) + 15) + " " +
        ( Number(xPosition) - 65) + "," +
        ( Number(yPosition) + 15) + " " +
        ( Number(xPosition) - 50) + "," +
        ( Number(yPosition) - 15)
      );
      this.polygon.setAttributeNS(null, "stroke-width", radius*0.05);
      
    }
  }

  
  function animateColorPanel(beginPosition, finalPosition, isEdge, xPosition, yPosition, beginRadius, endRadius){
    var start = Date.now();
    var move = finalPosition - beginPosition;
    var position = beginPosition;
    var currentRadius = beginRadius;
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
      if (timePassed >= 320) {
        clearInterval(timer);
        return;
      }
      drawColorPanel(timePassed);
      if(!isEdge){
        drawCircle();
      }
    }, 20);

    function drawColorPanel() {
      position += move/15;
      colorPanel.setPosition(position);
    }

    function drawCircle(){
      currentRadius += (endRadius - beginRadius)/14;
      if(currentRadius < 0){
        currentRadius = 0;
      }
      choseCircle.makeCircle(xPosition, yPosition, currentRadius);
    }
  }

  function showGraph(graph){

  }

  function clear(){
    showNumbOfedges.innerHTML = 0;
    showNumbOfVertexes.innerHTML = 0;
    graph.nodes.forEach(node =>{
      node.figure.remove();
      delete node.figure;
      node.degreeOfNode.remove();
      delete node.degreeOfNode;
      node.information.remove();
      delete node.information;
      node.text.remove();
      delete node.text;
    });
    graph.nodes = [];
    graph.edges.forEach(edge=>{
      edge.triangle.remove();
      delete edge.triangle;
    });
    graph.edges = [];
  }

  function NameOfGraph(){
    this.text = document.createElement('div');
    graphsInformation.append(this.text);



    this.text.setAttributeNS(null, "class", "record");
    this.text.innerHTML = "HHHH";


    this.text.addEventListener("click", (e)=>{
      console.log("kkk");
    });

    this.text.addEventListener("mouseover", (e)=>{
      this.text.setAttributeNS(null, "class", "active_record");
    });
    this.text.addEventListener("mouseout", (e)=>{
      this.text.setAttributeNS(null, "class", "record");
    });
  }



  unorientedButton.addEventListener("click", clear);
  unorientedButton.addEventListener("click", (e)=>{

    graph = new Graph();
    graph.oriented = false;
  });

  orientedButton.addEventListener("click", clear);
  orientedButton.addEventListener("click", (e)=>{

    graph = new Graph();
    graph.oriented = true;
  });

  draw.addEventListener("dblclick", (e)=>{
    console.log("GGG");
    if(isCreating){
      var node = new Node(e.clientX -50, e.clientY-1);
      graph.nodes.push(node);
      showNumbOfVertexes.innerHTML = graph.nodes.length;
    }
    isCreating = true;
  });
})