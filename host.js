var modal = document.getElementById("hostJoin");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

let code;
let codInput;
let checkCode;
var name1, name2;

function host() {
  if (document.getElementById("name").value != "") {
    document.getElementById("codeInput").style.display = "none";
    document.getElementById("codeLabel").style.display = "none";
    name1 = document.getElementById("name").value;
    code = Math.floor((Math.random() * 1000) + 100);
    localStorage.setItem("vOneLocalStorage", code);
    document.getElementById("code").innerHTML = "CODE: " + code;
    document.getElementById("host").style.display = "none";
    document.getElementById("join").style.display = "none";
    document.getElementById("playHost").style.display = "block";
    firebase.database().ref("turn" + code).set({
      value: true
    });
    firebase.database().ref(code).set({
      code: code
    });
    firebase.database().ref("name1" + code).set({
      player1: name1
    });
  } else {
    alert("NAME cannot be blank");
  }
}

function join() {
  if (document.getElementById("name").value != "") {
    name2 = document.getElementById("name").value;
    codeInput = document.getElementById("codeInput").value;
    localStorage.setItem("vOneLocalStorage", codeInput);
    var dbRef = firebase.database().ref(codeInput).child("code");
    dbRef.on('value', snap => checkCode = snap.val());
    document.getElementById("playJoin").style.display = "block";

  } else {
    alert("NAME cannot be blank!");
  }
}

function play() {
  if (codeInput == checkCode) {
    firebase.database().ref("name2" + codeInput).set({
      player2: name2
    });
    window.location = 'https://tahasharjeel.github.io/Tic-Tac-Toe-FireBase-Multiplayer-Main/';
  } else {
    alert("Game not found!");
  }
}
