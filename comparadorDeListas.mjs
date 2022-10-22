import { TwoListsComparator } from "./listComparator.mjs";

var listAObj;
var listBObj;
var listResultObj;

var listA;
var listB;
var listResult;

var listComparator = new TwoListsComparator([], [], isEqual);

function getElements() {
    listAObj = document.getElementById("a-list");
    listBObj = document.getElementById("b-list");
    listResultObj = document.getElementById("result-list");
}

function parseLists() {
    listA = listAObj.value.split("\n");
    listB = listBObj.value.split("\n");
    listComparator.a = listA;
    listComparator.b = listB;
}

window.duplicate = function () {
    getElements();
    parseLists();
    listResult = listComparator.duplicated();
    listResultObj.value = listResult.join("\n");
}

window.exclusivesA = function () {
    getElements();
    parseLists();
    listResult = listComparator.exclusivesA();
    listResultObj.value = listResult.join("\n");
}

window.exclusivesB = function () {
    getElements();
    parseLists();
    listResult = listComparator.exclusivesB();
    listResultObj.value = listResult.join("\n");
}

window.union = function () {
    getElements();
    parseLists();
    listResult = listComparator.union();
    listResultObj.value = listResult.join("\n");
}

function isEqual(a, b) {
    if (a==b) return true;
    
    let sim = similarity(a,b);

    console.log(`${a} - ${b} => ${b}`)
    return sim > 0.8;
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
            costs[j] = j;
        else {
            if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
            }
        }
        }
        if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
