var jsPsych = initJsPsych({
    show_progress_bar:false,
    auto_update_progress_bar: true,
    on_finish: function() {
    }
})
//console.error(jsPsych.display_element)

timeline = []

const KEY_CODE_SPACE = ' ';

const welcome = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p>Welcome to the experiment! Please submit your ID. </p>',
  html: '<p><input type="text" id="test-resp-box" name="response" size="20" /></p>',
  autofocus: 'test-resp-box'
}
timeline.push(welcome);

var welcome_screen = {
    type : jsPsychHtmlButtonResponse,
     stimulus : WELCOME_INSTRUCTION,
    choices : ['Continue']
  };
timeline.push(welcome_screen);

const consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: CONSENT,
  //html: '<p><input type="text" id="test-resp-box" name="response" size="20" /></p>',
  choices : ['Continue']
}
timeline.push(consent);

var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    on_finish:function(){
      }
  }
timeline.push(enter_fullscreen);
//VIRTUAL CHINREST: RESIZE DATA TO PARTICIPANT SCREEN SIZES AND DISTANCES


const resize_intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: RESIZE_INTRO,
  choices : ['Continue']
}
timeline.push(resize_intro)


let get_size = {
    type: jsPsychVirtualChinrest,
    blindspot_reps: 3,
    resize_units: "deg",
    pixels_per_unit: 50,
};
//timeline.push(get_size);

var continue_page = {
  type : jsPsychHtmlButtonResponse,
   stimulus : "Click the button when you are ready to adjust your screen.",
  choices : ['Continue']
};

resize_chance = 2;
var repeat_resize_stimuli = {
  timeline: [
    get_size,
    {type: jsPsychHtmlButtonResponse,
    stimulus:  `<div class="row">
    <p style = 'font-size: 20x;'>If the measurements were done correctly, your card must be bigger than the yellow rectangle and smaller than the green rectangle.</p>
    <div class="column1"; style="background-color: #FFE333; width: 299.6px; height: 188.93px; margin: 50px auto;"></div> 
    <div class="column2"; style="background-color: #58D68D; width: 556.4px; height: 350.87px; margin: 20px auto;"></div>
    </div>`,
    choices: ['Try again','Continue'],
    on_finish: function(data) {
      if (data.response=='0' && resize_chance==1){
        document.querySelector("#jspsych-content").setAttribute('style', 'transform: scale(1.0);')
        jsPsych.endExperiment('Sorry, you cannot continue this experiment because we cannot adjust your screen correctly.\n Please press ESC key to discontinue your experiment.');
      }
    }}
  ],    
  loop_function: function(data){
    if(data['trials'][1].response == 0){
        resize_chance-=1;
        document.querySelector("#jspsych-content").setAttribute('style', 'transform: scale(1.0);')
        return true; // loop again!
    } else {
        return false; // continue
    }

  }
}

timeline.push(repeat_resize_stimuli);

var list_intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: LIST_INTRO,
  choices : ['Continue']
}

timeline.push(list_intro)

var list_screen = {
  type : jsPsychImageButtonResponse,
  stimulus: 'img/words.png',
  stimulus_height:820,
  stimulus_width:1680,
  prompt : function(){
    var stim = '<p style="font-size:25px;font-weight:bold;">Click the button when you feel familiar with the words and their cateogries</p>';
       return stim;},
       //jsPsych.timelineVariable("w1"),
  choices : ['Continue']
};

timeline.push(list_screen);


//timeline.push(repeat_resize_stimuli);
practice_acc = 0
wm_accuracy = 0
stimuli_duration = 1000 
var practice_intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: PRACTICE_INTRO,
  choices : ['Continue'],
  on_start: function(){
    practice_acc = 0
  }
}
//timeline.push(practice_intro)

var wm_practice_phase = {timeline: [
  //Memory Phase
          {type: jsPsychHtmlKeyboardResponse,
          stimulus: "",
          choices: "NO_KEYS",
          trial_duration: stimuli_duration},
          {type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
                        var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w1')+'</p>';
                           return stim;},
          choices: "NO_KEYS",
          trial_duration: stimuli_duration},
         {type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
            var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w2')+'</p>';
               return stim;},
          choices: "NO_KEYS",
          trial_duration: stimuli_duration},
         {type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
            var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w3')+'</p>';
               return stim;},
          choices: "NO_KEYS",
          trial_duration: stimuli_duration},
         {type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
            var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w4')+'</p>';
               return stim;},
          choices: "NO_KEYS",
          trial_duration: stimuli_duration,},
         {type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
            var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w5')+'</p>';
               return stim;},
          choices: "NO_KEYS",
          trial_duration: stimuli_duration},

          {type: jsPsychHtmlKeyboardResponse,
            stimulus: " ",
            choices: "NO_KEYS",
            trial_duration: 2000},

//Test Phase
        {type: jsPsychHtmlButtonResponse,
          stimulus: function(){
            var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('probe')+'</p>';
               return stim;},
          data: {correctResponse: jsPsych.timelineVariable("cr")},
          choices: ["Yes", "No"],
          trial_duration:5000,
          on_start:function(){
            jsPsych.pluginAPI.setTimeout(()=>{
              console.log(document.getElementById('jspsych-content').style);
              document.getElementById('jspsych-content').style.fontSize = '55px';
              document.getElementById('jspsych-content').innerHTML = 'Time out.';
            }, 3000);
          },
          on_finish: function(data){
                                  console.log(data.response)
                                  if(data.response == null){
                                    data.correct = null;
                                  }
                                  if(data.response == data.correctResponse){
                                    practice_acc++;
                                    data.correct = true;
                                      } 
                                  if((data.response != null) && (data.response != data.correctResponse)){
                                    data.correct = false;
                                        }
                                  document.getElementById('jspsych-content').style.fontSize ="";
                                  }
        },

//Feedback
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
          var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
          if(last_trial_correct){
            console.log(last_trial_correct)
            return '<p style="font-size:55px;font-weight:bold; color:  #5cd65c">Correct!</p>'; // the parameter value has to be returned from the function
          }
          if (last_trial_correct==false) {
            console.log(last_trial_correct)
            return '<p style="font-size:55px; font-weight:bold; color:  #ff3333">Wrong.</p>'; // the parameter value has to be returned from the function
          }
          if (last_trial_correct==null) {
            console.log(last_trial_correct)
            return '<p style="font-size:55px;font-weight:bold;">\n Please respond a bit faster.</p>'; // the parameter value has to be returned from the function
          }
        },
        trial_duration: 2000,
        choices:"NO_KEYS"
        }
      ],
    timeline_variables: working_memory_practice_list_5,
}


var test_intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function(){
    if (practice_acc > 1){
      return TEST_INTRO
    }
    else{
      return PRACTICE_INTRO2
    }
  },
  choices : ['Continue']
}
//timeline.push(test_intro)


var wm_practice_phase_repeat = {timeline: [practice_intro, wm_practice_phase, test_intro],
  loop_function: function(){
    if(practice_acc <2){
        return true; // loop again!
    } else {
        return false; // continue
    }},
  on_finish: function(){
    console.error(practice_acc)
  }
}

timeline.push(wm_practice_phase_repeat)



var wm_test_phase = {
    timeline: [
      //Memory Phase
              {type: jsPsychHtmlKeyboardResponse,
              stimulus: "",
              choices: "NO_KEYS",
              trial_duration: stimuli_duration},
              {type: jsPsychHtmlKeyboardResponse,
              stimulus: function(){
                            var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w1')+'</p>';
                               return stim;},
                               //jsPsych.timelineVariable("w1"),
              choices: "NO_KEYS",
              trial_duration: stimuli_duration},
             {type: jsPsychHtmlKeyboardResponse,
              stimulus: function(){
                var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w2')+'</p>';
                   return stim;},
              choices: "NO_KEYS",
              trial_duration: stimuli_duration},
             {type: jsPsychHtmlKeyboardResponse,
              stimulus: function(){
                var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w3')+'</p>';
                   return stim;},
              choices: "NO_KEYS",
              trial_duration: stimuli_duration},
             {type: jsPsychHtmlKeyboardResponse,
              stimulus: function(){
                var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w4')+'</p>';
                   return stim;},
              choices: "NO_KEYS",
              trial_duration: stimuli_duration,},
             {type: jsPsychHtmlKeyboardResponse,
              stimulus: function(){
                var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('w5')+'</p>';
                   return stim;},
              choices: "NO_KEYS",
              trial_duration: stimuli_duration},
              {type: jsPsychHtmlKeyboardResponse,
                stimulus: " ",
                choices: "NO_KEYS",
                trial_duration: 2000},

    //Test Phase
            {type: jsPsychHtmlButtonResponse,
              stimulus: function(){
                var stim = '<p style="font-size:55px;font-weight:bold;">'+jsPsych.timelineVariable('probe')+'</p>';
                   return stim;},
            data: {correctResponse: jsPsych.timelineVariable("cr")},
            choices: ["Yes", "No"],
            on_start:function(){
              jsPsych.pluginAPI.setTimeout(()=>{
                console.log(document.getElementById('jspsych-content').style.fontSize);
                document.getElementById('jspsych-content').style.fontSize = '55px';
                document.getElementById('jspsych-content').innerHTML = 'Time out.';
              }, 3000);
            },
            trial_duration: 5000,
            on_finish: function(data){
                                    console.log(data.response)
                                    if(data.response == null){
                                      data.correct = null;
                                    }
                                    if(data.response == data.correctResponse){
                                      wm_accuracy++;
                                      data.correct = true;
                                        } 
                                    if((data.response != null) && (data.response != data.correctResponse)){
                                      data.correct = false;
                                          }
                                    document.getElementById('jspsych-content').style.fontSize ="";
                                    }
            }],
  timeline_variables: working_memory_task_list_5,
  on_finish: function(){
    
  }
}

timeline.push(wm_test_phase)

var test_ending = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function(){
    // The feedback stimulus is a dynamic parameter because we can't know in advance whether
    // the stimulus should be 'correct' or 'incorrect'.
    // Instead, this function will check the accuracy of the last response and use that information to set
    // the stimulus value on each trial.
    var accuracy_p = Math.round(wm_accuracy*100/24);
    //return "<p>The average RT and accuracy are "+ average_rt_p+accuracy_p+ "</p>"; // the parameter value has to be returned from the function
    if (accuracy_p>=75){
    return `<p style="text-align:left;">
    The experiment has ended. 
    Since your accuracy is ` + accuracy_p+` %, your will get $1 as a reward. 
    <br>
    Thank you so much for participating in the experiment.
    <\p>`}
    else{
      return `<p style="text-align:left;">
      The experiment has ended.
      Since your accuracy is` + accuracy_p+` %, your will get $0.5 as a reward. 
      <br>
      Thank you so much for participating in the experiment.
      <\p>`
    }
  },
  choices:["End the experiment"]
}
timeline.push(test_ending)



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
        uil_save : false
    },
    on_finish: function(){
        reactiontimes = [];
    }

};


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
//practice_story = practice1_split
//practice_story_questions =practice1_questions

//first_story =story1_split
//first_story_questions = story1_questions

///second_story = story2_split
// = story2_questions
 
//third_story = story3_split
//third_story_questions  = story3_questions

//===== Practice Phase


const first_story_begins = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : FIRST_STORY_BEGINS,
  choices : [KEY_CODE_SPACE],
  response_ends_trial : true
};
//timeline.push(first_story_begins);


/*
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


/*
var reading_phase_p = {
  timeline:   //[fixcross,
              [present_text],
  timeline_variables: p,
  on_start: function() {
      document.getElementById('jspsych-content').innerHTML = '<p style = "text-align: right; font-size: 24px"> Reading progress: ' +page_index+'/'+ttl_page +'</p>';
      document.getElementById('jspsych-progressbar-container').innerHTML = '<span style = "text-align: center;" > <div id="jspsych-progressbar-inner" style = "text-align: center;"> </div></span>';
      page_index++;
    },
  on_finish: function(){
      document.getElementById('jspsych-progressbar-container').innerHTML = '<span>Completion Progress </span> <div id="jspsych-progressbar-outer"> <div id="jspsych-progressbar-inner"></div></div>';
      practice_total_rt = practice_total_rt.concat(reactiontimes);
      practice_total_wc = practice_total_wc+ reactiontimes.length;
      console.error(reactiontimes);
      console.error(practice_total_rt);
      //console.error(practice_total_rt);
      console.error(practice_total_wc);
      reactiontimes = [];
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
timeline.push(pavlovia_init);


var end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'The trial has ended. ',
    on_load: function() {
        uil.saveData();
        }
}
timeline.push(end);

*/
jsPsych.run(timeline);