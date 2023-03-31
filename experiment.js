var jsPsych = initJsPsych({
    show_progress_bar:true,
    auto_update_progress_bar: false,
    message_progress_bar:'',
    on_finish: function() {
        jsPsych.data.displayData('csv');
    }
})
var timeline = [];
var practice_timeline = [];
var story1_timeline = [];
var story2_timeline = [];
var story3_timeline = [];


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
//timeline.push(enter_fullscreen);
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
    <p>If the measurements were done correctly, the square below should be 10 cm x 10 cm.</p>
    <div style="background-color: black; width: 500px; height: 500px; margin: 20px auto;"></div>
  `,
  choices: ['Continue']
};
timeline.push(resized_stimulus);



//CALCULATE amount of characters to display on screen
//INSTRUCTIONS
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
//timeline.push(instructions);



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
      on_start: function() {
        jsPsych.show_progress_bar= true,
        document.getElementById('jspsych-progressbar-container').innerHTML = '<span>First Story</span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div>';
        jsPsych.setProgressBar(page_index/ttl_page);
        page_index++;
      }
    
  }


//4. display story one
////var screen_width = window.innerWidth;
//var p_tag = document.getElementsByTagName("p");
//var p_em_pixels = getEmPixels(p_tag);
//var p_em_pixels = 20;

//var num_chars = .8*screen_width * 10 / p_em_pixels ;


//===== Practice Phase

var num_chars = 500;
var practice1_split = split_function(num_chars,practice1_story2);

var p1 = []
for (let i = 0; i < practice1_split.length; i++){
    p1.push({id: 'practice1',
                    part: practice1_split[i]});
};
// These should be initialized before each practice and reading phase
var page_index = 1;
var ttl_page = practice1_split.length;


var reading_phase = {
    timeline:   [fixcross,
                present_text],
    timeline_variables: p1}

timeline.push(reading_phase);


/* Create practice */

var quiz_phase= {
    timeline: [{type: jsPsychHtmlButtonResponse,
                choices: [jsPsych.timelineVariable("a0"), 
                         jsPsych.timelineVariable("a1")],
                stimulus: jsPsych.timelineVariable("q"),
                data: {correct_response: jsPsych.timelineVariable("cr")},
                on_start:function(){
                  jsPsych.setProgressBar(0);
                  document.getElementById('jspsych-progressbar-container').innerHTML = '<span> </span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div>';
                },
                on_finish: function(data){
                            if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
                              data.correct = true;
                            } else {
                              data.correct = false;
                            }
                           }}],
    timeline_variables: practice1_questions
}

timeline.push(quiz_phase);




//timeline.push(story1_phase);
//timeline.push(story2_phase);
//timeline.push(story3_phase);





var feedback_phase = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
      // The feedback stimulus is a dynamic parameter because we can't know in advance whether
      // the stimulus should be 'correct' or 'incorrect'.
      // Instead, this function will check the accuracy of the last response and use that information to set
      // the stimulus value on each trial.
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if(last_trial_correct){
        return "<p>Correct!</p>"; // the parameter value has to be returned from the function
      } else {
        return "<p>Wrong.</p>"; // the parameter value has to be returned from the function
      }
    }
  }

timeline.push(feedback_phase);
//timeline.push(practice_timeline);
//===== Story 1 Phase

//story1_timeline.push(reading_phase);
//story1_timeline.push(quiz_phase);
//story1_timeline.push(feedback_phase);
//timeline.push(story1_timeline);

//===== Story 2 Phase

//story2_timeline.push(reading_phase);
//story2_timeline.push(quiz_phase);
//story2_timeline.push(feedback_phase);
//timeline.push(story2_timeline);

//===== Story 3 Phase

//story3_timeline.push(reading_phase);
//story3_timeline.push(quiz_phase);
//story3_timeline.push(feedback_phase);
//timeline.push(story3_timeline);



var end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'The trial has ended. ',
    on_load: function() {
            uil.saveData();
        }
}

timeline.push(end);

jsPsych.run(timeline);
