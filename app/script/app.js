(()=>{
  //Load basic library.
  load.init();
    //Load our Transitioner.
    //window.datasingh.init();
    window.views.init();
    window.reflexes.init();

  window.addEventListener("load", function(){
    
    
      
    router.addRoute("/", "welcome_screen_please");
    router.addRoute("event", "events_page_please");
    router.addRoute("dates", "events_page_please");
    router.addRoute("events", "events_page_please");

    router.redirect(404, "welcome_screen_please");

    router.init();


  });
})();
