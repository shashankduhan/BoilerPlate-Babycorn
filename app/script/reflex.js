//Our finite state machine
  window.reflexes = (()=>{
    "use strict"
    return {
      dispatcher: e =>
      {
        //Add some suffix to our packet before dispatching
        window.router = window.router ? window.router : {state: "yo"};
        e.origin = !window.router.state ? "alien_request" : window.router.state;
        e.hash = window.router.routes;
        //^^^^^ [alien_request] means that page is opened up using a url and not from inside our app.

        //Let's dispatch our packet
        for(var i=0; i < window.reflexes.linkedlist.length; i++)
            {window.reflexes.linkedlist[i](e);}

        //Let's listener for additional callbacks.
        var surfaceIndex = reflexes.surfaceList.indexOf(e.id);
        if(surfaceIndex > -1){
          //remove it from list.
          //fetch its sticker.
          //Remove sticker from list too.
          //Dispatch Reflex
          reflexes.surfaceList.splice(surfaceIndex, 1);
          var sticker = reflexes.stickerList[surfaceIndex];
          //^v Reversed steps
          reflexes.dispatch(sticker);
          reflexes.stickerList.splice(surfaceIndex, 1);

        }

        return reflexes;

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
        //toggleNeurons initialization - Best for Non-target Hit Events
        window.addEventListener("click", window.reflexes.toggler);
        window.addEventListener("touchstart", window.reflexes.toggler);

        //Stream initialization - API for all window events
        for(let i = 0; i < window.reflexes.stream_services.length; i++){
          var event = window.reflexes.stream_services[i];
          window.addEventListener(event, window.reflexes.stream_delta[event]);
        }

      },
      dispatch: e =>{
        if(typeof e == "string") e = {id : e};
        window.reflexes.dispatcher(e);

        return reflexes;
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
      addTogglers: function(toggleNeurons, nameofpackage){
        if(reflexes.toggleNeuronsList.indexOf(nameofpackage) > -1){
          return 0;
        }else{
          //It means we can add this package to list...
          reflexes.toggleNeurons.push(toggleNeurons);
          reflexes.toggleNeuronsList.push(nameofpackage);
          return 1;
        }
      },
      linkedlistlist: [],
      toggleNeuronsList: [],
      stream_services: ["click"],
      stream_delta: {
        click : e =>{
          for(let i = 0; i < window.reflexes.stream_records["click"].sensors.length; i++){
            var response = window.reflexes.stream_records["click"].sensors[i](e.target, e);
          }
          // Response will be send to reflexes database of callback and eventually will be looked for any attached callbacks.
          if(response){ reflexes.dispatch(response); }
        }

      },
      stream_register: (sensor, event, sensor_name)=>{
        var serv_list = window.reflexes.stream_services;
        var records = window.reflexes.stream_records;
        var delta = window.reflexes.stream_delta;
        //check if this event's service is active or not
        if(serv_list.indexOf(event) <= -1){
          //If not then
          //- add it to list of services
          //- add it to stream_delta and stream_records
          //- And addListener to respective window event
          serv_list.push(event);
          delta[event] = function(e){
            for(let i = 0; i < window.reflexes.stream_records[e.type].sensors.length; i++){
              var gas = window.reflexes.stream_records[e.type].sensors[i](e.target, e);
            }
            if(gas){
              let fart = gas;
              window.reflexes.dispatch(fart);
            }
          }
          records[event] = {
            sensors: [],
            sensors_list: []
          };

          window.addEventListener(event, delta[event]);
        }

        //Check if we already have sensor with this name in stream_records of this event's sensor_list or not
        if(records[event].sensors_list.indexOf(sensor_name) <= -1){
          //If not then add it to records
          records[event].sensors.push(sensor);
          //And to the list as well.
          records[event].sensors_list.push(sensor_name);
        }
        else{return false;}

      },
      stream_records: {
        click: {
          sensors: [],
          sensors_list: []
        }

      },
      attachCallback: (surface, sticker)=>{
        //surface signifines initial reflex to whom we have to attach a listener
        //whereas sticker is representing the reflex which needs to be callbacked after surface being called.

        //Add surface & sticker to list.
        reflexes.surfaceList.push(surface);
        reflexes.stickerList.push(sticker);
      },
      surfaceList: [],
      stickerList: [],
      sleep: function(time){
        //Sleep it if we have to....
        time = typeof time == "undefined" ? "1000" : time;

          var start = new Date().getTime();
          while(true)
          {
            if ((new Date().getTime() - start) > time)
            {
              break;
            }
          }
          return reflexes;
      }
    }
  })();
