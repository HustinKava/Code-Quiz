//Getting all required elements
const start_button = document.querySelector('.start_button button')
const information_box = document.querySelector('.information_box')

const quit_button = information_box.querySelector('.buttons .quit_button')
const continue_button = information_box.querySelector('.buttons .continue_button')

const quiz_box = document.querySelector('.quiz_box')

const highscore_button = document.querySelector('.highscore_button button')
const highscore_box = document.querySelector('.highscore_box')

const return_button = highscore_box.querySelector('.buttons .return_button')

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
    showQuestions(1);
}

//If Return button is clicked
return_button.onclick = () => {
    highscore_box.classList.remove('active_highscore_box');//Hide highscore box
}

let question_count = 0;

//Getting questions and options from the questions.js file
//The 2 JavaScript files are linked via the index.html file
let showQuestions = (index) => {
    const question_text = document.querySelector('.question_text');//Referencing question_text in the index.html file
    let question_tag = '<span>'+ questions[index].question +'</span>';//Created a variable that will store the question in a html span tag
    question_text.innerHTML = question_tag;//Changing the question_text in the html document to equal the question_tag which stores the actual question
}





