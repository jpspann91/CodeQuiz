var highScoreEl = document.querySelector("#highScores");
var clearBtn = document.querySelector("#clearBtn");
var goBackBtn = document.querySelector("#goBackBtn");

goBackBtn.addEventListener("click", function(){
    window.location.replace("./index.html");
});

clearBtn.addEventListener("click", function(){
    localStorage.clear();
    location.reload();

});
var allScoresKey = localStorage.getItem("allScoresKey");
allScoresKey = JSON.parse(allScoresKey);

if(allScoresKey !== null){
    for(var i = 0; i < allScoresKey.length; i++){

        var createLiEl = document.createElement("li");
        createLiEl.textContent = allScoresKey[i].initials + " " + allScoresKey[i].score;
        highScoreEl.appendChild(createLiEl);
    }

}