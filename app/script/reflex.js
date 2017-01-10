//Our finite state machine
  window.reflexes = (()=>{
    "use strict"
    return {
      dispatcher: e =>
      {
        //Add some suffix to our packet before dispatching
        e.origin = !window.router.state ? "firsttime" : window.router.state;
        e.hash = window.router.routes;

        //Let's dispatch our packet
        for(var i=0; i < window.reflexes.linkedlist.length; i++)
            window.reflexes.linkedlist[i](e);

      },
      linkedlist :[],
      toggler : e =>
      {
        //UI reflexes to toggle UI elements state
        if (e == null)
      		    e = window.event;

        var target = e.target != null ? e.target : e.srcElement;

        //Our Toogle Neurons.
        //Simple callbacks for state toggling
        for(var i=0; i<window.reflexes.toggleNeurons.length; i++)
            window.reflexes.toggleNeurons[i](target);
      },
      toggleNeurons:[],
      init : () =>{
        //this.linkedlist = new Array();
        //this.toggleNeurons = new Array();
        window.addEventListener("click", window.reflexes.toggler);
        window.addEventListener("touch", window.reflexes.toggler);
      },
      dispatch: e =>{
        if(typeof e == "string") e = {id : e};
        window.reflexes.dispatcher(e);
      },
      subscribe: function(linkedlist, nameoflist){
        if(reflexes.linkedlistlist.indexOf(nameoflist) > -1){
          //It means we already have list of similar name
          return 0;
        }else{
          //It means we don't have any list of similar name.
          //So add it to linkedlistlist & linkedlist
          reflexes.linkedlist.push(linkedlist);
          reflexes.linkedlistlist.push(nameoflist);
          return 1;
        }
      },
      linkedlistlist: []
    }
  })();
