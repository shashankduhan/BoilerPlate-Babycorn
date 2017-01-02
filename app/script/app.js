(()=>{
  //Load basic library.
  load.init();

  window.addEventListener("load", function(){
    //Our onload callbacks and app setup.
    //Any pollyfils if you want.....

      // //Webcomponentsjs Polyfills
      // var webCompSupported = ('registerElement' in document
      // && 'import' in document.createElement('link')
      // && 'content' in document.createElement('template'));
      //
      // if(!webCompSupported){
      //   load.script({src: "bower_components/webcomponentsjs/webcomponents-lite.js"})
      //     .then(() => {
      //     })
      //     .catch((err) => {
      //       log('Cant load WebComponent');
      //     });
      // }

    //Load our Transitioner.
    //window.datasingh.init();
    window.views.init();
    window.reflexes.init();
    window.router.init();


  });
})();
