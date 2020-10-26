//Getting all required elements
const start_button = document.querySelector('.start_button button')
const information_box = document.querySelector('.information_box')

const quit_button = information_box.querySelector('.buttons .quit_button')
const continue_button = information_box.querySelector('.buttons .continue_button')

const quiz_box = document.querySelector('.quiz_box')
const next_button = quiz_box.querySelector('.next_button');
const question_counter = quiz_box.querySelector('.total_questions');

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
    showQuestions(0);
    question_page_number(1);
}

//If Return button is clicked
return_button.onclick = () => {
    highscore_box.classList.remove('active_highscore_box');//Hide highscore box
}

let question_count = 0; //Starts at question 0 which is question 1 because we are using arrays
let question_number = 1;//Page count starts at 1

//If Next button is clicked
next_button.onclick = () => {
    if (question_count < questions.length -1) {
        question_count++;//This will increase by 1 to cycle through our questions
        question_number++;//This will increase by 1 to cycle through the page numbers
        showQuestions(question_count);
        question_page_number(question_number);
    } else {
        console.log('Questions Completed');
    }
}



//Getting questions and options from the questions.js file
//The 2 JavaScript files are linked via the index.html file
let showQuestions = (index) => {
    const question_text = document.querySelector('.question_text');//Referencing question_text in the index.html file
    const question_option_list = document.querySelector('.question_option_list')
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
    let user_answer = answer.textContent;
    let correct_answer = questions[question_count].answer;//Setting the answer equal to the answers located in questions.js file
    if (user_answer == correct_answer) {
        answer.classList.add('correct')//If the answer is correct the option text will be green
        answer.insertAdjacentHTML("beforeend", tick_icon);
        console.log('That is correct');
    } else {
        answer.classList.add('incorrect');//If the answer is incorrect the option text will be red
        answer.insertAdjacentHTML("beforeend", cross_icon);
        console.log('That is wrong');
    }
}


//Creating a function that will show you what question you are on out of 5
let question_page_number = (index) => {
    const question_counter = quiz_box.querySelector('.total_questions');
    let question_counter_tag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>'
    question_counter.innerHTML = question_counter_tag;
}