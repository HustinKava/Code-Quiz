//Getting all required elements
const start_button = document.querySelector('.start_button button');

const information_box = document.querySelector('.information_box');
const quit_button = information_box.querySelector('.buttons .quit_button');
const continue_button = information_box.querySelector('.buttons .continue_button');

const quiz_box = document.querySelector('.quiz_box');
const next_button = quiz_box.querySelector('.next_button');
const question_counter = quiz_box.querySelector('.total_questions');
const time_counter = quiz_box.querySelector('.timer .timer_seconds');

const result_box = document.querySelector('.result_box');
const score_text = document.querySelector('.score_text');
const input_text = document.querySelector('.input_text');
const submit_button = document.querySelector('.buttons .submit_button');


const highscore_box = document.querySelector('.highscore_box');
const highscore_button = document.querySelector('.highscore_button button');
const return_button = highscore_box.querySelector('.buttons .return_button');
const clear_button = highscore_box.querySelector('.buttons .clear_button');
const name_score = document.querySelector('.name_score');
const hs_name = document.querySelector('.hs_name');
const hs_score = document.querySelector('.hs_score');

//Global variables
let question_count = 0; //Starts at question 0 which is question 1 because we are using arrays
let question_number = 1;//Page count starts at 1
let counter;//Holds the timer count
let time = 100;//Hard coded the time to start from 100 seconds
let score;//Holds the final score 
let username;//Holds the username



//If Start Quiz is clicked
//classList.add() behaves like a toggle for css
start_button.onclick = () => {
    information_box.classList.add('active_information_box');//Show the information box
}

//If High Score is clicked
highscore_button.onclick = () => {
    highscore_box.classList.add('active_highscore_box');//classList.add() behaves like a toggle for css
}

//If Exit Quiz is clicked
quit_button.onclick = () => {
    information_box.classList.remove('active_information_box');//Hide the information box
}

//If Continue button is clicked
continue_button.onclick = () => {
    information_box.classList.remove('active_information_box');//Hide the information box
    quiz_box.classList.add('active_quiz_box');//Show quiz box
    showQuestions(0);//showQuestions function executes
    questionPageNumber(1);//question_page_number function executes
    startTimer();//start_timer function executes
}

//If Return button is clicked
return_button.onclick = () => {
    highscore_box.classList.remove('active_highscore_box');//Hide highscore box
}

//If Next button is clicked
next_button.onclick = () => {
    if (question_count < questions.length -1) {
        question_count++;//This will increase by 1 to cycle through our questions
        question_number++;//This will increase by 1 to cycle through the page numbers
        showQuestions(question_count);
        questionPageNumber(question_number);
        next_button.style.display = 'none';//This will hide the next button until the correct answer is chosen
    } else {
        //console.log('Questions Completed');
        showResultBox();
        clearInterval(counter);
        complete = true;
        score = time;
        next_button.style.display = 'none';//This will hide the next button until the correct answer is chosen
        //console.log(score);
    }
}

//Getting questions and options from the questions.js file
//The 2 JavaScript files are linked via the index.html file
let showQuestions = (index) => {
    const question_text = document.querySelector('.question_text');//Referencing question_text in the index.html file
    const question_option_list = document.querySelector('.question_option_list')//Referencing the question options list
    let question_tag = '<span>'+ questions[index].question +'</span>';//Created a variable that will store the question in a html span tag
    //Adding the 4 options from the questions.js file that will have the CSS styling .option and will be housed in span tags
    let question_option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' 
                            + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                            + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                            + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question_text.innerHTML = question_tag;//Changing the question_text in the html document to equal the question_tag which stores the actual question
    question_option_list.innerHTML = question_option_tag;//Changing the option_list in the html document to equal the option_tag which stores the options

    const question_option = question_option_list.querySelectorAll('.option');
    for (let i = 0; i < question_option.length; i++) {
        question_option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

//Tick and Cross icons
let tick_icon = '<div class="icon_tick"><i class="fas fa-check"></i></div>';//Storing the tick icon in a variable
let cross_icon = '<div class="icon_cross"><i class="fas fa-times"></i></div>';//Storing the cross icon in a variable

//Creating a function to see if the option selected is equal to the answer or not
let optionSelected = (answer) => {
    user_answer = answer.textContent;
    let correct_answer = questions[question_count].answer;//Setting the answer equal to the answers located in questions.js file
    if (user_answer == correct_answer) {
        next_button.style.display = 'block';//Once the user selects the correct answer the next button will show
        answer.classList.add('correct')//If the answer is correct the option text will be green
        answer.insertAdjacentHTML("beforeend", tick_icon);
    } else {
        answer.classList.add('incorrect');//If the answer is incorrect the option text will be red
        answer.insertAdjacentHTML("beforeend", cross_icon);
        time -= 10;
        //console.log(typeof time);//Show if it is a number, bolean or string ect..
    }
}

//Function to show the result box once the quiz has been completed
let showResultBox = () => {
    information_box.classList.remove('active_information_box');//Hide the information box
    quiz_box.classList.remove('active_quiz_box');//Hide quiz box
    result_box.classList.add('active_result_box');//Show result box
    score_text.innerText = 'Your final score is:' + time;
}

//Function to start the timer from 100 seconds
function startTimer() {
    counter = setInterval(timer, 1000);
    function timer() {
        time_counter.textContent = time;//Timer will display in the HTML element .timer_seconds
        time--;//Timer counts backwards
        
        
        if (time < 0) {//If time reaches zero, it will hold the value of 0
            clearInterval(counter);
            time_counter.textContent = 0;//Timer would show 0 once reached
            quiz_box.classList.remove('active_quiz_box');//Hide quiz box
            result_box.classList.add('active_result_box');//Show result box
        }
    }   
}


//Creating a function that will show you what question you are on out of 5
let questionPageNumber = (index) => {
    const question_counter = quiz_box.querySelector('.total_questions');
    let question_counter_tag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>'
    question_counter.innerHTML = question_counter_tag;
}

//Created an event listener that checks to see if the input field has been filled
//If it has not, stop the function until there is an input
//Else set the username and score to localStorage
submit_button.addEventListener('click', function (e) {
    username = input_text.value;
    //console.log(username);
    if (!username) {
    return;
} else {  
    localStorage.setItem("username", username);
    localStorage.setItem("totalScore", score);
    result_box.classList.remove('active_result_box');//Hide result box
    highscore_box.classList.add('active_highscore_box');//Show highscore box
    hs_name.innerHTML = localStorage.getItem("username", username);
    //console.log(hs_name);
    hs_score.innerHTML = localStorage.getItem("totalScore", score);
    //console.log(hs_score);
    time = 100;//Resets the timer
    question_count = 0;//Resets the question count 
    question_number = 1;//Resets the question
    next_button.style.display = 'none';//This will hide the next button until the correct answer is chosen
  }
});

clear_button.onclick = () => {
    localStorage.clear();//Clears all keys and values from local storage
    location.reload();//Resets high score display back to default
};

//