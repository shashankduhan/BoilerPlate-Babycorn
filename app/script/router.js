//Shashank Duhan 2017 | CC.0
//You gonna need reflex.js for this :
// https://gist.github.com/shashankduhan/673a4e1223afe550ca69958bcb73181c
window.router = (()=>{
  "use strict"
    return {
      state: 0,
      init: function(user){
        router.routes = router.state;
        window.addEventListener("hashchange", router.router);
        window.reflexes.linkedlist.push(window.router.reflexes);
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

        window.reflexes.dispatch({id: "hashchanged"});
      },
      reflexes: function(e){
        if(e.id == "hashchanged"){
          log(router.routes);

          if(window.router.routes.length == 0){

            reflexes.dispatch({id:"welcome_screen_please"});

          }else if(window.router.routes.length == 1){

            if(router.routes[0] == "events" || router.routes[0] == "dates")
            {
              reflexes.dispatch({id:"events_page_please"});
            }else
            {
              //You can add more redirects else you can see 404 msg.
              window.reflexes.dispatch({id:"404"});
            }
          }
        }
      },
      routeTo: x =>{
        window.location.hash = x;
      }
    }
  })();
