
          ns = 'http://www.w3.org/2000/svg';
          var balls = [];
          var draw = document.getElementById("draw");
          draw.addEventListener("dblclick", (e)=>{
            let ball = document.createElementNS(ns, 'circle');
            ball.setAttributeNS(null, 'cx', e.clientX);
            ball.setAttributeNS(null, 'cy', e.clientY);
            ball.setAttributeNS(null, 'r', 10);
            ball.setAttributeNS(null, 'fill', "PapayaWhip");
            balls.push(ball);
            draw.append(ball);
            
            ball.addEventListener("mouseover", (e)=>{
              ball.setAttributeNS(null, "fill", "Salmon");
            })
  
            ball.addEventListener("mouseout", (e) => {
              ball.setAttributeNS(null, "fill", "PapayaWhip");
            });
            
  
            ball.addEventListener("mousedown", (e) => {
  
  
              draw.addEventListener("mousemove", function move(e){
                ball.setAttributeNS(null, 'cx', e.clientX);
                ball.setAttributeNS(null, 'cy', e.clientY);
  
                draw.addEventListener("mouseup", function mouseup(e){
                  draw.removeEventListener("mousemove", move);
                  ball.setAttributeNS(null, 'cx', e.clientX);
                  ball.setAttributeNS(null, 'cy', e.clientY);
  
  
                  draw.addEventListener("mousedown", (e)=>{
                    draw.removeEventListener("mouseup", mouseup);
                  });
                });
              });
            });
            
            
          });