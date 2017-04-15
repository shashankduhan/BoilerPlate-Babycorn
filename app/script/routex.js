//Shashank Duhan 2017 | MIT Licensce
//You gonna need reflex.js for this :
// https://gist.github.com/shashankduhan/673a4e1223afe550ca69958bcb73181c


window.router = (()=>{
  "use strict"
    return {
      state: 0,
      init: function(user){
        router.routes = router.state;
        window.addEventListener("hashchange", router.router);
        window.reflexes.subscribe(window.router.reflexes, "router_reflexes");
        router.router();
      },
      router: function(){
        router.state = router.routes;
        router.url = location.hash.slice(1) || '/';
        if(router.url != "/"){
          router.routes = router.url.split("/");
        }else{
          router.routes = [];
        }

        window.reflexes.dispatcher({id: "hashchanged"});
      },
      reflexes: function(e){
        if(e.id == "hashchanged"){
          log(router.routes);

          var level_of_request = window.router.routes.length;
          var base_route = router.routes[0];
          var found = false;
          var mappings = router.route_mappings;
          for(var i = 0; i < mappings.length; i++)
          {
            if( (mappings[i].level == level_of_request && mappings[i].route == base_route)
                || (
                    mappings[i].level == level_of_request
                    && (level_of_request == 0 && mappings[i].route == "/")
                  )
              )
              {
                  reflexes.dispatch(mappings[i].reflex);
                  //Support for other reflex methods: to add method use router.addReflexMethod()
                  //[START POLLYFILL]
                  for(var v = 0; v < router.reflexMethods.length; v++){
                    router.reflexMethods[v]({id: mappings[i].reflex});
                  }
                  //[END POLLYFILL]
                  found = true;
                  break;
              }
          }

          if(found == false){
            //Not Found Handler
            if(typeof router.redirects["404"] != "undefined") router.routeTo(router.redirects["404"]);
            else reflexes.dispatch("404");

          }

          //Google Analytics Support
          if(ga)
          {
            ga('set', 'page', location.hash);
            ga('send', 'pageview');
          }
        }
      },
      routeTo: x =>{
        window.location.hash = x;
      },
      route_mappings: [],
      active_routes:[],
      addRoute: (route, reflex, level)=>{
        if(router.active_routes.indexOf(route) > -1){
          // It means we have similar mapping already
        }else{
          // We don't have such mapping, so add it.
          if(route == "/") level = 0;

          level = typeof level == "undefined" ? 1 : level ;

          router.route_mappings.push({level:level, route:route, reflex:reflex});
          router.active_routes.push(route);
        }
      },
      redirects:{},
      redirect: (e, to)=>{
        if(typeof router.redirects[e] == "undefined"){
          router.redirects[e] = to;
        }
      },
      addReflexMethod: f => {//support for other reflex methods e.g. behave of skyis.blue
        if(router.reflexMethods.indexOf(f) <= -1){
          router.reflexMethods.push(f);
        }
      },
      reflexMethods:[]
    }
  })();
