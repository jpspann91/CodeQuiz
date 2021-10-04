// Array of question objects. Each object has a string for the question, an array of strings for the choices and the answer
var questionObjectArray = [
    {
        question: "How do you call a user created function named randomFunction ?",
        choices: ["randomFunction call()" , "randomFunction;" , "randomFunction()" , "Math.floor(Math.random())"],
        answer: "randomFunction()"
    },
    {
        question: "How would you declare an array named numberArray and fill it 3 different choices in Javascript",
        choices: ["array NumberArray(3);","var[] numberArray = {1,2,3};","var[3] numberArray = []","var numberArray = [1,2,3]"],
        answer: "var numberArray = [1,2,3]"
    },  
    {
        question: "Which is the correct way to write an IF statement ?",
        choices: ["if (i = 0){code};","if(i == 0){code};","if(i == 0)code;","if i = 0{code};"],
        answer: "if(i == 0){code};"
    },
    {
        question: "What is the correct HTML for referring to an external style sheet?",
        choices: ["<link rel=\"stylesheet\" href=\"./assets.css.style.css\"/>","<src = \"./assets.css\">","<src =\"./assets.css.style.css\"/>","<link = \"./assets.css.style.css\"/>"],
        answer: "<link rel=\"stylesheet\" href=\"./assets.css.style.css\"/>"
    }, 
    {
        question: "What is is each HTML element surrounded with in an html file?",
        choices: ["{}","[]","<>","()"],
        answer: "<>"
    } 
];

//Create a variable to hold the div element with the currentTime ID 
var currentTimeEl = document.querySelector("#currentTime");
//Create a variable to hold the button element with the start ID
var timerEl = document.querySelector("#start");
//Create a variable to hold the button element with the questions ID
var questionsEl = document.querySelector("#questions");
//Create a variable to hold the main element with the wrapper Class
var wrapperEl = document.querySelector(".wrapper");

//Variable to hold the quiz score
var quizScore = 0;
//Variable to hold the current index for Question Object Array
var questionIndex = 0;
//Variable to hold the number of seconds remaining
var secondsLeft = 100;
//Variable to hold the value of the hold interval (0)
var holdInterval = 0;
//Variable to hold the value of the penatly (10)
var penalty = 10;

//create a variable hold an unordered list. Set this variable to a ul element
var ulCreate = document.createElement("ul")

//Add an event listener to the timerEl variable. Click action
timerEl.addEventListener("click", function(){
    
    //Check if the hold interval is set to zero
    if(holdInterval === 0){
        //Assign holdInterval with whatr is returned from a setInterval function
        holdInterval = setInterval(function(){
            //decrememnt the seconds left variable
            secondsLeft--;
            //change the text cotent for the currentTimeEl variable
            currentTimeEl.textContent = "Time: " + secondsLeft;
            
            //check if seconds LEft is equal to zero
            if(secondsLeft <= 0){
                //call clear interval method pass inholdInterval variable
                clearInterval(holdInterval);
                //call the finished method to stop clear out the questions
                finished();
                //change the text content to say the time is up
                currentTimeEl.textContent = "Time is up!";
            }   

        //Interval set to 1000 mili seconds or 1 second.
        }, 1000);
    }
    //Call the create question method and pass in the current value for questionIndex
    createQuestion(questionIndex);
});
//Create question functon with a parameter for the question index
function createQuestion(questionIndex){

    //clear out the questions div element
    questionsEl.innerHTML = "";
    //clear out the unordered list variable 
    ulCreate.innerHTML = "";

    //for loop to loop through all question objects in the question object array
    for(var i =0; i < questionObjectArray.length; i++){

        //Create a variable to hold the property named question which is a string 
        var usersQuestion = questionObjectArray[questionIndex].question;
        //Create a variable to hold the property named choices which is an array
        var usersChoices = questionObjectArray[questionIndex].choices;
        //set the text content for the question div element to the usersQuestion variable
        questionsEl.textContent = usersQuestion;
        //set the color and font size for the question
        questionsEl.setAttribute("style", "color: greenyellow; font-size: 18px;")
        
    }

    //For each method to loop through all array element in usersChoices array
    //add a function that takes in a new item
    usersChoices.forEach(function (newItem) {
        //Create a li element and assign to a variable named listItem
        var listItem = document.createElement("li");
        //change the textContent to be the newItem we are passing in
        listItem.textContent = newItem;
        //append the unordered list to the questions div element
        questionsEl.appendChild(ulCreate);
        //append the new listItem to the unoredered list
        ulCreate.appendChild(listItem);
        //add an event listener to call compareUserChoice method whenever clicked
        listItem.addEventListener("click", (compareUsersChoice));
    })
}
//compareUsersChoice function the takes in an event parameter
function compareUsersChoice(event){
    //create an element to the current selected element when this method is called
    var element = event.target;
    //See if the current traget element is a list item
    if(element.matches("li")){
        
        //create a variable to hold a new div element 
        var createdDivEl = document.createElement("div");
        //Call set Attribute function to set ID to createDivEl
        createdDivEl.setAttribute("id", "createDivEl");

        //If the textContent in the current chosen element is the same as the answer from the question object
        if(element.textContent == questionObjectArray[questionIndex].answer){
            //Increment the quizScore variable
            quizScore++;
            //Change the text of the created div element to say Correct and the answer
            createdDivEl.textContent = "Correct! The answer is: " + questionObjectArray[questionIndex].answer;

        }
        //If not the same as the answer
        else{
            //Add penlty point for wrong answer
            secondsLeft -= penalty;
            //Tell the user they were wrong and the correct answer
            createdDivEl.textContent = "Wrong! The correct answer is " + questionObjectArray[questionIndex].answer  
        }
    }
    //Incremement question Index to move to the next question
    questionIndex++;

    //If questionIndex is the same as the length of the object array (5)
    if(questionIndex >= questionObjectArray.length){
        //then call the finished method
        finished();
        //Change the text content for thje created div element to show end of the quiz and score out of 5
        createdDivEl.textContent = "End of quiz! You got " + quizScore + "/" + questionObjectArray.length + " Correct!"; 
    }
    //If not
    else{
        //Then call create question method to show the next question
        createQuestion(questionIndex);
    }
    //Append the created div element to the questions div element
    questionsEl.appendChild(createdDivEl);
}

//Finished function calls at the end of the quiz
function finished(){
    //clear out the innerHTML for the questions div element
    questionsEl.innerHTML = "";
    //clear out the currentTime div element
    currentTimeEl.innerHTML = "";

    //create an h1 element and assign it to a variable
    var h1El = document.createElement("h1");
    //call the set attribute method to set the id attribute
    h1El.setAttribute("id","h1El");
    //set the text content to say all done
    h1El.textContent = "All Done!";

    //append the h1 element to the questions div element
    questionsEl.appendChild(h1El);

    //create a paragraph element and assign to a variable
    var createParagraphEl = document.createElement("p");
    //Call the setAttribute method to set the ID attribute
    createParagraphEl.setAttribute("id", "createdP");

    //Append the paragraph element to the questions div element
    questionsEl.appendChild(createParagraphEl);

    //if the seconds left is more than zero
    if(secondsLeft >= 0){
        //Create a new variable set to the seconds left variable
        var timeRemaining = secondsLeft;
        //Create another paragraph element and set to variable
        var createParagraphEl2 = document.createElement("p");
        //Call the clearInterval method and pass in holdInterval value (0)
        clearInterval(holdInterval);
        //change the text content for the paragraph element to show the time remaining which is the score
        createParagraphEl.textContent = "Your final score is: " + timeRemaining;
        //Append the second paragraph element to the questions div element
        questionsEl.appendChild(createParagraphEl2);
    }

    //Create a label element and set to a variable
    var createLabelEl = document.createElement("label");
    //Call set Attribute method to set the type
    createLabelEl.setAttribute("type", "text");
    //set text content to prompt user to enter their initials
    createLabelEl.textContent = "Enter your initials: ";

    //append the created label element to the questions div element
    questionsEl.appendChild(createLabelEl);

    //create an input element and assign to a variable
    var createInputEl = document.createElement("input")
    //Call set attribute function to set type and id
    createInputEl.setAttribute("type", "text");
    createInputEl.setAttribute("id", "initials");
    //Set text context to a blank string
    createInputEl.textContent = "";
    
    //Append the created input element to the questions div element
    questionsEl.appendChild(createInputEl);

    //create a button element and assign to a variable
    var createSubmitEl = document.createElement("button");
    //Call set attribute function to assin type and id
    createSubmitEl.setAttribute("type", "submit");
    createSubmitEl.setAttribute("id", "Submit");
    //Change text content to say Submit
    createSubmitEl.textContent = "Submit";

    //Append the created submit button to the questions div element
    questionsEl.appendChild(createSubmitEl);

    //Add an event listener for click event
    createSubmitEl.addEventListener("click", function(){
        //Create an intials variable set to the value in the created Input element
        var initials = createInputEl.value;

        //If the initials are null
        if (initials === null){
            //Adv that they need to enter a value
           alert("No value entered!");
        }
        else{
            //Create a finalScore object with 2 properties
            var finalScore = {
                //set initial property to the initials variable created earlier
                initials: initials,
                //Set score property to the timeRemaining value
                score: timeRemaining
            }
            //Call console.log function and pass in finalScore object
            console.log(finalScore);
            //call getItem function to grab allScoresKey and set to a variable
            var allScoresKey = localStorage.getItem("allScoresKey");
            
            //If thew allScoresKey is null
            if(allScoresKey === null){
                //Set allScoresKey variable to an empty array
                allScoresKey = [];
            }
            else{
                //If not then parseAllScoresKey to an object and assign to allScoresKey variable
                allScoresKey = JSON.parse(allScoresKey);
            }
            
            //Push finalScore object to the allScoresKey array created earlier
            allScoresKey.push(finalScore);

            //create a variable to hold the allScoresKey object turned into a String
            var newestScore = JSON.stringify(allScoresKey);

            //Call setItem function and set to Local Storage for allScoresKey to the newestScore variable
            localStorage.setItem("allScoresKey", newestScore);

            //Call window.location.replace method and pass in the index.html file created within this directory
            window.location.replace("./highScorePage.html");
        }

    });
}