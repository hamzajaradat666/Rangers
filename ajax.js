export function loadDoc(cb) {
  var xhttp = new XMLHttpRequest();
  
  xhttp.open("GET", "unit.json", true);
  xhttp.send();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     cb(JSON.parse(this.responseText))
    }
  };
 }

