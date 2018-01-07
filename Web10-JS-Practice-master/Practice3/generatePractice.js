'use strict'

function generate(numberOfTestcases, filePath = "./test-data.json"){
  var testCases = [];
  function randomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
  }

  function emptyCase(){
    normalCases(1);
    testCases[testCases.length - 1].input = [];
    testCases[testCases.length - 1].output = -1;
  }

  function notfoundCase(){
    normalCases(1);
    var list = testCases[testCases.length -1].input;
    var number = randomInt(-10000, 10000);
    while (list.indexOf(number)!= -1){
        number = randomInt(-10000, 10000);
    }
    testCases[testCases.length - 1].target = number;
    testCases[testCases.length - 1].output = -1;
  }

  function firstIndex(){
    normalCases(1);
    while (testCases[testCases.length -1].input.length == 0){
      testCases.splice(-1, 1);
      normalCases(1);
    }
    testCases[testCases.length -1].target = testCases[testCases.length -1].input[0];
    testCases[testCases.length -1].output = 0;
  }
  function lastIndex(){
    normalCases(1);
    while (testCases[testCases.length -1].input.length == 0){
      testCases.splice(-1, 1);
      normalCases(1);
    }
    var list = testCases[testCases.length -1].input;
    testCases[testCases.length -1].target = list[list.length -1];
    testCases[testCases.length -1].output = list.length -1;
  }

  function mathFloor(){
    normalCases(1);
    while (testCases[testCases.length -1].input.length == 0){
      testCases.splice(-1, 1);
      normalCases(1);
    }
    var list = testCases[testCases.length -1].input;
    testCases[testCases.length -1].target = list[Math.floor(list.length/2)];
    testCases[testCases.length -1].output = Math.floor(list.length/2);
  }
  

  function normalCases(numb){
    for (var x = 0; x < numb; x++){
      var arr_length = randomInt(0,500);
      var input = [];
      var output = -1;
      var target = randomInt(-10000,10000);
      for(var y = 0; y < arr_length; y++){
        var ele = randomInt(-10000,10000);
        input.push(ele);
      }
      if (input.length > 0) {
        for(var i = 0; i < input.length; i++){
          if (target == input[i]) output = i;
        }
      }
    var testCase = { input, target, output};
    testCases.push(testCase);
    }
  }
  if (numberOfTestcases < 5) {
    normalCases(numberOfTestcases);
  }
  if (numberOfTestcases >= 5){
    emptyCase();
    notfoundCase();
    firstIndex();
    lastIndex();
    mathFloor();
    normalCases(numberOfTestcases - 5);
  }
  return testCases;
  require('fs').writeFileSync(filePath, JSON.stringify(testCases));
}

module.exports = generate