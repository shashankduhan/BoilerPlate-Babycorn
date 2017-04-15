"use strict"
//Our views and transitions.
window.views = (function(){
  return {
    init: function(){
      window.reflexes.subscribe(views.transitionLinkedList, "views_reflexes");
      reflexes.stream_register(views.event_streams.mouseover, "mouseover", "view_mouseovers");
    },
    transitionLinkedList: function(e){
      if(e.id == "events_page_please")
      {
        //One listner can dispatch other listener events
        //It works something like a linked list.
        reflexes.dispatch("step-1");//Just for demo

        views.loader.events();

        reflexes.dispatch("no_curtain_please");

      }
      else if(e.id == "welcome_screen_please")
      {

        views.loader.welcome();
        reflexes.dispatch("no_curtain_please");

      }
      else if(e.id == "step-1")
      {

        log("Step one");
      }
      else if(e.id == "step-2")
      {
        alert("Hurray");
      }
      else if(e.id == "no_curtain_please")
      {
        style("#curtain").opacity = 0;
        style("#curtain").visibility = "hidden";
      }
    },
    event_streams:{
      mouseover: function(e){
        log(e);
      }
    },
    loader: {
      welcome: function(){
        var greeting = make("div");
        greeting.className = "welcome";
        greeting.innerText = "Hello Sweetie!";
        add("#welcome_screen", greeting);
      },
      events: function(){
        make_n_add("button", "#content_screen", "ourbutton")
            .addEventListener("click",
                function(){ reflexes.dispatch('step-2'); }
            );
        writein("#ourbutton", "Press me");
        classify("#ourbutton", "simple button");

      }
    }
  }
})();
