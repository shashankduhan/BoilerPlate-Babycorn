window.load = (function(){
  "use strict";
  //This is sample module for loading a module using require() function in webpack.
  //Simply put load.init(); in window.onload callback.

    return {
            init: function(){
              //*************************************
              //Initialize some global functions..
              //If you want to load a library, write codes in here.
              //*************************************
              window.ajax = new Object();
              ajax.request = function (x, y) {
              var param = y.parameters;
              if(y.method != 'undefined'){if(y.method == 'post'){var method = 'POST';}else if(y.method == 'get'){var method = 'GET';}else{var method = y.method;}}else{var method ='GET';}
              if(method == 'GET'){x = x + "?" + param;}

              if(y.sync != 'undefined'){var sync=y.sync;}else{var sync="true";}
              var c;
              if (window.XMLHttpRequest){c=new XMLHttpRequest();}
              else{c=new ActiveXObject("Microsoft.XMLHTTP");}
              c.open(method, x , "true");
              if(typeof y.contentType == 'undefined'){c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              }else{if(y.contentType == false){}else if(y.contentType==true){c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");}else{c.setRequestHeader("Content-Type", y.contentType);}
              }
              c.send(param);

              c.onreadystatechange=function(){
                if (c.readyState==4 && (c.status==200 || c.status==404)){
                    if(y.onSuccess=='undefined' || y.onSuccess==null){}else{new y.onSuccess(c.responseText);}}
                  else if(c.readyState==2 && (c.status==200 || c.status==404)){try{new y.onCreate;}catch(e){}}}};

              ajax.pulseFx=function(i,u,a){var Fx=new ajax.request(u,{method:a.method,parameters:a.parameters,onSuccess:function(r){new a.onSuccess(r);new ajax.updater(i,r,a.insertion);}});window['ex'+i]= setInterval(Fx,a.frequency*1000);}
              ajax.updater=function(i,r,type){
                  if(type==='top'){x(i).insertBefore(document.createTextNode(r),x(i).firstChild);}
                  else if(type==='bottom'){x(i).appendChild(document.createTextNode(r));}
                  else{x(i).innerHTML=r;}
              }
              ajax.stopPulseFx=function(i){clearInterval(window['ex'+i]);}

              window.x = function (x){var elements = new Array();

                for (var i = 0; i < arguments.length; i++) {

                  var element = arguments[i];

                  if (typeof element == 'string')

                    element = document.querySelector(element);

                  if (arguments.length == 1)

                    return element;

                  elements.push(element);

                }

                return elements;
              }

              window.style = function(id){
                return window.x(id).style;
              }
              window.value = function(id){
                return window.x(id).value;
              }
              window.update = function(id, msg){
                if(window.x(id).value){window.x(id).value  = msg;}
                else{window.x(id).innerHTML = msg;}
              }
              window.writein = function(id, msg){
                if(window.x(id).value){window.x(id).value  = msg;}
                else{window.x(id).innerText = msg;}
              }
              window.classify = function(id, classname){ x(id).className = classname; }
              window.empty = function(id){
                window.x(id).innerHTML = "";
              }
              window.add = function(id, el){
                window.x(id).appendChild(el);
              }
              window.log = function(msg){
                if(true){console.log(msg);}
              }
              window.iconize = function(elem, icn, onclick, toltip){
                var icon = document.createElement("i");
                icon.className = "material-icons";
                icon.innerText = icn;
                elem.appendChild(icon);
                if(typeof onclick != "undefined"){
                  var touch = document.createElement("a");
                  touch.className = "touchlayer";
                  touch.addEventListener("click", onclick);
                  touch.addEventListener("touch", onclick);
                  //Add tooltip if available
                  if(typeof toltip != "undefined"){
                    var tooltip = document.createElement("span");
                    tooltip.className = "tooltiptext";
                    tooltip.innerText = toltip;
                    touch.appendChild(tooltip);
                  }

                  elem.appendChild(touch);
                }
              }
              window.make = function(type){
                return document.createElement(type);
              }
              window.make_n_add = function(type, to, id){
                var elem = document.createElement(type);
                if(typeof id != "undefined") elem.id = id;
                add(to, elem);
                return elem;
              }


              //*************
              //DEVICE and Screen Detection
              //*************
              window.sWidth = window.innerWidth;
              window.sHeight = window.innerHeight;
              window.addEventListener("resize", window.load.screenSizeSensor, false);
              load.screenSizeSensor();//For loading initialization
              //***********
              //INIT ENDS
              //***********

            },
            link: function(option){
              return new Promise((resolve, reject) => {
                var link = document.createElement('link');
                link.rel = option.rel;
                link.async = true;
                link.href = option.src;
                document.head.appendChild(link);
              });
            },
            script: function(option){
              return new Promise((resolve, reject) => {
                var script = document.createElement('script');
                script.async = true;
                script.src = option.src;
                if(option.onload){
                  script.onload = function(){ resolve("true");}
                }
                document.head.appendChild(script);
              })
            },
            screenSizeSensor : function(){
              var k;
              if(window.innerWidth <= 740){k = "mobile";}
              else if(window.innerWidth <= 1024){k = "tablet";}
              else{k = "big";}

              if(typeof window.type === "undefined"){window.type = k;}
              else{
                if(window.type != k){
                  //It means call for state change callbacks
                  //We have callback for becoming active and inactive
                  //Callback for being inactive
                  switch(window.type){
                    case "mobile" : log("I was Mobile");
                        try{window.mobileSetup();}catch(e){}
                        break;
                    case "tablet" : log("I was Tablet");
                        break;
                    case "big" :  log("I was BigScreen");
                        break;
                  }

                  //Callback on being inactive
                  switch(k){
                    case "mobile" : log("I am Mobile now.");
                        break;
                    case "tablet" : log("I am Tablet now.")
                        break;
                    case "big" : log("I am Big Screen now.")
                        break;
                  }
                }

                window.type = k;
              }

            }

          }
})();
