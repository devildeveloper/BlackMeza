require.config({
  "baseUrl":'js/vendor',
  "paths":{
    "app":"../app",
    "analitics":"../app/analitics"
  },
  "shim":{
    "slick":["jquery"]
  }
});

requirejs(["app/main"])
