
var jsPsych = initJsPsych({
    show_progress_bar:true,
    auto_update_progress_bar: true,
    on_finish: function() {
        //jsPsych.data.displayData('csv');
    }
})


timeline = []
/* init connection with pavlovia.org 
var pavlovia_init = {
	type: jsPsychPavlovia,
	command: "init"
};
timeline.push(pavlovia_init);*/


//INTRODUCTION AND FULLSCREEN
/*
const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Welcome to the experiment! Press any key to begin.'
}
timeline.push(welcome);
*/

const KEY_CODE_SPACE = ' ';
const G_QUESTION_CHOICES = [FALSE_BUTTON_TEXT, TRUE_BUTTON_TEXT];

const welcome = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p>Welcome to the experiment! Please submit your ID. </p>',
  html: '<p><input type="text" id="test-resp-box" name="response" size="20" /></p>',
  autofocus: 'test-resp-box'
}
timeline.push(welcome);



let welcome_screen = {
    type : jsPsychHtmlKeyboardResponse,
    stimulus : WELCOME_INSTRUCTION,
    choices : [KEY_CODE_SPACE],
    response_ends_trial : true
    //on_finish: function (data) {
    //    data.rt = Math.round(data.rt);
    //}
  };

timeline.push(welcome_screen);


var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
  }
timeline.push(enter_fullscreen);
//VIRTUAL CHINREST: RESIZE DATA TO PARTICIPANT SCREEN SIZES AND DISTANCES


const get_size = {
    type: jsPsychVirtualChinrest,
    blindspot_reps: 3,
    resize_units: "deg",
    pixels_per_unit: 50,
};

timeline.push(get_size);


var resized_stimulus = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p style = 'font-size: 20x;'>If the measurements were done correctly, the square below should be 4" x 4".</p>
    <div style="background-color: black; width: 500px; height: 500px; margin: 20px auto;"></div>
    `,
  choices: ['Continue']
};
timeline.push(resized_stimulus);


//CALCULATE amount of characters to display on screen
//INSTRUCTIONS
/*
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>This experiment requires three-time visits. </p>
    <p>On each visit, you will read four stories, each of which is followed by 12 comprehension questions.</p>
    <p>Completion of comprehension questions with at least 75% accuracy will result in a reward of $3.</p><br>
    <p>This will be a self-paced reading task. You will see each set of sentences on the screen filled with dashes. Press SPACE to advance to the next word.</p>
    <p> Press any key to begin</p>
    `
}
timeline.push(instructions);
*/
/*
const instructions = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : INSTRUCT,
  choices : [KEY_CODE_SPACE],
  response_ends_trial : true
};
timeline.push(instructions);
*/


let fixcross = {
    type : sprMovingWindow,
    stimulus : '+',
    choices : FIX_CHOICES,
    font_family : "Times New Roman",
    font_size : 36,
    width : MIN_WIDTH,
    height : MIN_HEIGHT,
    trial_duration : FIX_DUR,
    data : {
    //    id : jsPsych.timelineVariable('id'),
    //    item_type : 'FIX_CROSS',
        uil_save : false
    },
    on_finish: function(){
        reactiontimes = [];
    }

};

function append_and_return_ros (splits, total_string, num_chars) {
    var substr = total_string.substring(0, num_chars);
    var cut_index;
    if (substr.length < num_chars || substr.lastIndexOf(" ") == -1){
        cut_index = substr.length;
    } else {
        cut_index = substr.lastIndexOf(" ") + 1;
    }
    var substr_worded = substr.slice(0, cut_index);
    splits.push(substr_worded);
    return total_string.slice(substr_worded.length);
}


function split_function (char_space, story) {
    var story_splits = [];
    var remaining_bit = [story];
    while (!(remaining_bit[0] === "")) {
        remaining_bit.push(append_and_return_ros(story_splits, remaining_bit.pop(), char_space));
    }
	return story_splits;
}

let present_text = {type: sprMovingWindow,
  stimulus: jsPsych.timelineVariable('part'),
  background_color : "rgb(230, 230, 230)", // light gray
  font_color : "rgb(0, 0, 0)", // black
  font_family : "Times New Roman",
  font_size : 36,
  width : MIN_WIDTH,
  height : MIN_HEIGHT,
  post_trial_gap : 0, //  ISI should be what??
  grouping_string : GROUPING_STRING,
  data : {
      id : jsPsych.timelineVariable('id'),
      string : jsPsych.timelineVariable('part'),
      uil_save: true},
  }


//===== Story Setup
practice_story = practice1_split
practice_story_questions =practice1_questions

first_story =story1_split
first_story_questions = story1_questions

second_story = story2_split
second_story_questions = story2_questions
 
third_story = story3_split
third_story_questions  = story3_questions

//===== Practice Phase


const first_story_begins = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : FIRST_STORY_BEGINS,
  choices : [KEY_CODE_SPACE],
  response_ends_trial : true
};
timeline.push(first_story_begins);



// to track average reading times per word in this phase
reactiontimes = [];
var practice_total_rt = [];
var practice_total_wc = 0; 

//var practice_split = split_function(num_chars,practice_story1);
var p = []
for (let i = 0; i < practice_story.length; i++){
    p.push({id: 'practice',
            part: practice_story[i]});
};
// These should be initialized before each practice and reading phase
var page_index = 1;
var ttl_page = practice_story.length;



var reading_phase_p = {
  timeline:   //[fixcross,
              [present_text],
  timeline_variables: p,
  on_start: function() {
      jsPsych.show_progress_bar= false
      document.getElementById('jspsych-progressbar-container').innerHTML = '<span> <div id="jspsych-progressbar-inner"></div></span>';
      //jsPsych.setProgressBar(page_index/ttl_page);
      //page_index++;
    },
  on_finish: function(){
      practice_total_rt = practice_total_rt.concat(reactiontimes);
      practice_total_wc = practice_total_wc+ reactiontimes.length;
      
      console.error(reactiontimes);
      console.error(practice_total_rt);
      //console.error(practice_total_rt);
      console.error(practice_total_wc);
      reactiontimes = [];
      document.getElementById('jspsych-progressbar-container').innerHTML = '<span>Completion Progress</span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div>';
  }}

timeline.push(reading_phase_p);


practice_total_acc = 0;
var quiz_phase_p= {
    timeline: [{type: jsPsychHtmlButtonResponse,
                choices: [jsPsych.timelineVariable("a0"), 
                         jsPsych.timelineVariable("a1")],
                stimulus: jsPsych.timelineVariable("q"),
                data: {correctResponse: jsPsych.timelineVariable("cr")},
                on_finish: function(data){
                            console.error(data)
                            if(data.response ==data.correctResponse){
                              practice_total_acc++;
                              data.correct = true;
                            } else {
                              data.correct = false;
                            }
                           }}],
    timeline_variables: practice_story_questions
}

timeline.push(quiz_phase_p);


var feedback_phase_p = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
      // The feedback stimulus is a dynamic parameter because we can't know in advance whether
      // the stimulus should be 'correct' or 'incorrect'.
      // Instead, this function will check the accuracy of the last response and use that information to set
      // the stimulus value on each trial.
      var average_rt_p = (practice_total_rt.reduce((a, b) => a + b)) / practice_total_wc;
      var accuracy_p = Math.round(practice_total_acc*100/12);
      //return "<p>The average RT and accuracy are "+ average_rt_p+accuracy_p+ "</p>"; // the parameter value has to be returned from the function
      return "<p>You achieved an accuracy of " + accuracy_p+ "% </p>"
    },
    on_finish:function(){
        console.error(reactiontimes);
        console.error('sdfsdf');
    }
  }
timeline.push(feedback_phase_p);

//===== Story 1 Phase

const second_story_begins = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : SECOND_STORY_BEGINS,
  choices : [KEY_CODE_SPACE],
  response_ends_trial : true
};
timeline.push(second_story_begins);


reactiontimes = [];
var first_story_total_rt = [];
var first_story_total_wc = 0; 

//var practice_split = split_function(num_chars,practice_story1);
var p = []
for (let i = 0; i < first_story.length; i++){
    p.push({id: 'story1',
              part: first_story[i]});
};
// These should be initialized before each practice and reading phase
var page_index = 1;
var ttl_page = first_story.length;

var reading_phase_s1 = {
    timeline:   //[fixcross,
                [present_text],
    timeline_variables: p,
    on_start: function() {
        jsPsych.show_progress_bar= false
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span> <div id="jspsych-progressbar-inner"></div></span>';
        //jsPsych.setProgressBar(page_index/ttl_page);
        //page_index++;
      },
    on_finish: function(){
        first_story_total_rt = first_story_total_rt.concat(reactiontimes);
        first_story_total_wc = first_story_total_wc+ reactiontimes.length;
        reactiontimes = [];
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span>Completion Progress</span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div>';
    }}
timeline.push(reading_phase_s1);


first_story_total_acc = 0;
var quiz_phase_s1= {
    timeline: [{type: jsPsychHtmlButtonResponse,
                choices: [jsPsych.timelineVariable("a0"), 
                         jsPsych.timelineVariable("a1")],
                stimulus: jsPsych.timelineVariable("q"),
                data: {correctResponse: jsPsych.timelineVariable("cr")},
                on_finish: function(data){
                            console.error(data)
                            if(data.response ==data.correctResponse){
                              first_story_total_acc++;
                              data.correct = true;
                            } else {
                              data.correct = false;
                            }
                           }}],
    timeline_variables: first_story_questions
}

timeline.push(quiz_phase_s1);


var feedback_phase_s1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
      // The feedback stimulus is a dynamic parameter because we can't know in advance whether
      // the stimulus should be 'correct' or 'incorrect'.
      // Instead, this function will check the accuracy of the last response and use that information to set
      // the stimulus value on each trial.
      var average_rt_s1 = (first_story_total_rt.reduce((a, b) => a + b)) / first_story_total_wc;
      var accuracy_s1 = Math.round(first_story_total_acc*100/12);
      //return "<p>The average RT and accuracy are "+ average_rt_p+accuracy_p+ "</p>"; // the parameter value has to be returned from the function
      return "<p>You achieved an accuracy of " + accuracy_s1+ "% </p>"
    },
    on_finish:function(){
        console.error(reactiontimes);
        console.error('sdfsdf');
    }
  }
timeline.push(feedback_phase_s1);

//===== Story 2 Phase

const third_story_begins = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : THIRD_STORY_BEGINS,
  choices : [KEY_CODE_SPACE],
  response_ends_trial : true
};
timeline.push(third_story_begins);




reactiontimes = [];
var second_story_total_rt = [];
var second_story_total_wc = 0; 

//var practice_split = split_function(num_chars,practice_story1);
var p = []
for (let i = 0; i < second_story.length; i++){
    p.push({id: 'story2',
              part: second_story[i]});
};
// These should be initialized before each practice and reading phase
var page_index = 1;
var ttl_page = second_story.length;

var reading_phase_s2 = {
    timeline:  //\[fixcross,
                [present_text],
    timeline_variables: p,
    on_start: function() {
        jsPsych.show_progress_bar= false
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span> <div id="jspsych-progressbar-inner"></div></span>';
        //jsPsych.setProgressBar(page_index/ttl_page);
        //page_index++;
      },
    on_finish: function(){
      second_story_total_rt = second_story_total_rt.concat(reactiontimes);
      second_story_total_wc = second_story_total_wc + reactiontimes.length;
        reactiontimes = [];
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span>Completion Progress</span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div>';
    }}
timeline.push(reading_phase_s2);


second_story_total_acc = 0;
var quiz_phase_s2= {
    timeline: [{type: jsPsychHtmlButtonResponse,
                choices: [jsPsych.timelineVariable("a0"), 
                         jsPsych.timelineVariable("a1")],
                stimulus: jsPsych.timelineVariable("q"),
                data: {correctResponse: jsPsych.timelineVariable("cr")},
                on_finish: function(data){
                            if(data.response ==data.correctResponse){
                              second_story_total_acc++;
                              data.correct = true;
                            } else {
                              data.correct = false;
                            }
                           }}],
    timeline_variables: second_story_questions
}

timeline.push(quiz_phase_s2);


var feedback_phase_s2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
      // The feedback stimulus is a dynamic parameter because we can't know in advance whether
      // the stimulus should be 'correct' or 'incorrect'.
      // Instead, this function will check the accuracy of the last response and use that information to set
      // the stimulus value on each trial.
      var average_rt_s2 = (second_story_total_rt.reduce((a, b) => a + b)) / second_story_total_wc;
      var accuracy_s2 = Math.round(second_story_total_acc*100/12);
      //return "<p>The average RT and accuracy are "+ average_rt_p+accuracy_p+ "</p>"; // the parameter value has to be returned from the function
      return "<p>You achieved an accuracy of " + accuracy_s2+ "% </p>"
    },
    on_finish:function(){
        console.error(reactiontimes);
        console.error('sdfsdf');
    }
  }
timeline.push(feedback_phase_s2);



//===== Story 3 Phase
const fourth_story_begins = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : FOURTH_STORY_BEGINS,
  choices : [KEY_CODE_SPACE],
  response_ends_trial : true
};
timeline.push(fourth_story_begins);



reactiontimes = [];
var third_story_total_rt = [];
var third_story_total_wc = 0; 

//var practice_split = split_function(num_chars,practice_story1);
var p = []
for (let i = 0; i < third_story.length; i++){
    p.push({id: 'story3',
              part: third_story[i]});
};
// These should be initialized before each practice and reading phase
var page_index = 1;
var ttl_page = third_story.length;

var reading_phase_s3 = {
    timeline: [present_text],
    timeline_variables: p,
    on_start: function() {
        jsPsych.show_progress_bar= false
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span> <div id="jspsych-progressbar-inner"></div></span>';
        //jsPsych.setProgressBar(page_index/ttl_page);
        //page_index++;
      },
    on_finish: function(){
      third_story_total_rt = third_story_total_rt.concat(reactiontimes);
      third_story_total_wc = third_story_total_wc+ reactiontimes.length;
        reactiontimes = [];
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span>Completion Progress</span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div>';
    }}
timeline.push(reading_phase_s3);


third_story_total_acc = 0;
var quiz_phase_s3= {
    timeline: [{type: jsPsychHtmlButtonResponse,
                choices: [jsPsych.timelineVariable("a0"), 
                         jsPsych.timelineVariable("a1")],
                stimulus: jsPsych.timelineVariable("q"),
                data: {correctResponse: jsPsych.timelineVariable("cr")},
                on_finish: function(data){
                            console.error(data)
                            if(data.response ==data.correctResponse){
                              third_story_total_acc++;
                              data.correct = true;
                            } else {
                              data.correct = false;
                            }
                           }}],
    timeline_variables: third_story_questions
}

timeline.push(quiz_phase_s3);


var feedback_phase_s3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
      // The feedback stimulus is a dynamic parameter because we can't know in advance whether
      // the stimulus should be 'correct' or 'incorrect'.
      // Instead, this function will check the accuracy of the last response and use that information to set
      // the stimulus value on each trial.
      var average_rt_s3 = (third_story_total_rt.reduce((a, b) => a + b)) / third_story_total_wc;
      var accuracy_s3 = Math.round(third_story_total_acc*100/12);
      //return "<p>The average RT and accuracy are "+ average_rt_p+accuracy_p+ "</p>"; // the parameter value has to be returned from the function
      return "<p>You achieved an accuracy of " + accuracy_s3+ "% </p>"
    },
    on_finish:function(){
    }
  }
timeline.push(feedback_phase_s3);




/* init connection with pavlovia.org 
var pavlovia_init = {
	type: jsPsychPavlovia,
	command: "init"
};
timeline.push(pavlovia_init);*/


var end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'The trial has ended. ',
    on_load: function() {
        uil.saveData();
        }
}
timeline.push(end);
jsPsych.run(timeline);