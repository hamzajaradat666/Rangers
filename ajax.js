export  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       return this.responseText;
      }
    };
    xhttp.open("GET", "Cards.json", true);
    xhttp.send();
  } 