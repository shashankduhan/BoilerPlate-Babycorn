//Our Firebase Backend helper script.
"use strict"
window.datasingh = (()=>{

  return {
    init: ()=>{
      //INIT OUR FIREBASE AAP
        var backendconfig = {
          apiKey: "---API KEY-----",
          authDomain: "project-id.firebaseapp.com",
          databaseURL: "https://project-id.firebaseio.com/",
          storageBucket: "project-id.appspot.com",
          messagingSenderId: "get this in firebase project settings"
        };
        firebase.initializeApp(backendconfig);
        datasingh.db = firebase.database();
    },
    fetchsomething: function(){
      var ref = window.datasingh.db.ref("something");
      ref.on('child_added', (snap)=>{
        log(snap.val());
      });

    }
  }
})();
