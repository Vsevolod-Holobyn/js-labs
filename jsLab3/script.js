(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"]; //

  //1.2.2
  console.log("1.2.2");
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]); 
    } else {
      helloSpeaker.speak(names[i]); 
    }
  }

  //1.2.3
  console.log("\n1.2.3");
  
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    
    var lastLetter = name.charAt(name.length - 1).toLowerCase();

    if (lastLetter === 'n') {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }
})();