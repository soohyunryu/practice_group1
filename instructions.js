
const WELCOME_INSTRUCTION =                               
    `<p style="text-align:left;">In this experiment, you will be presented with lists of words on the screen one after another.
    Your job is to determine if a probe word belongs to the same category as one of the words in the list. Your response needs to be made in three seconds. 
    <br>
    <br>For example, if you saw [grape, coffee, jacket, purple] in the list of words and "orange" appears on the screen as a probe word, then your answer should be YES because the probe word ‘orange’ shares the same category with  ‘grape’
    <br>
    <br>
    <br>The experiment includes a practice trial and a test trial, and should take around 7 minutes to complete. The base payment for participating is $0.5, and you can earn an additional $0.5 if you achieve 75% accuracy on the test trial.
    <br> If your response is made after three seconds, then it is considered to be incorrect.
    <br>
    <br>If you want to participate, please press the "Continue" button to provide your consent.
    <p>
    `

const CONSENT = 
`<p style="text-align:left;">We guarantee that all the information you provide will be kept confidential and won't be linked to your name. If you ever feel uncomfortable during the study, you're free to leave the laboratory and still receive credit for the time you participated. Moreover, any information you've shared with us will be discarded. If you have any further questions or concerns about this study, you can reach us by email: Soo Ryu at soohyunr@umich.edu. Please sign below to indicate that you understand your rights and agree to participate. Keep in mind that your participation is entirely voluntary, and you're free to withdraw at any time. Additionally, we'll ensure that all the information remains anonymous and won't be linked to any research findings.
<br>
<br>  If you would like to give your consent, please proceed by clicking the "Continue" button.
<p>
`

const RESIZE_INTRO = 
`<p style="text-align:left;">Welcome to the experiment! 
Before we start, let's adjust your screen settings.
<p>
`

const LIST_INTRO = 
`<p style="text-align:left;">
On the following page, you will see a list of words and their categories that will be used in the experiment. 
<br>Please review them carefully and ensure that you are familiar with both the words and their categories.
<\p>
`
const PRACTICE_INTRO =
`<p style="text-align:left;">
Now, let’s do some practice before moving on to the real experiment.
This will include three sessions, and each session will include a list of words followed by a probe word. 
Your task is to determine whether the probe word shares the category with any word you saw in the list. Again, your response needs to be made in three seconds. 
<br>
<br>For example, if you saw [grape, coffee, jacket, purple] in the list of words and "orange" appears on the screen as a probe word, then your answer should be YES because the probe word ‘orange’ shares the same category with  ‘grape’
<br>
<br> Please press the button when you are ready to begin the practice sessions.
<\p>
`
const PRACTICE_INTRO2 =
`<p style="text-align:left;">
Your accuracy in the practice phase is not enough.
<br>Let's try the practice again so that you can get prepared!
<\p>
`

const TEST_INTRO = 
`<p style="text-align:left;">
Congratulations, you are now ready to begin the experiment! 
<br>
<br>In the experiment, you will be presented with 24 sessions whose procedure is the same as ones you saw durring the practice. 
Please keep in mind that there won't be any feedback during this phase. Also, you will receive an additional $0.5 as a bonus if you achieve a minimum of 75% accuracy.
<br>
<br>Press the button when you are ready to begin. 
<\p>
`


const PRE_PRACTICE_INSTRUCTION =
    "<h1>"                                                              +
        "Task instructions"                                            +
    "</h1>"                                                             +
    "<p>"                                                               +
        "You are now going to see sentences on the screen, one after "  +
        "the other. Each sentence is broken up into words. You can "    +
        "reveal the sentence word-by-word by repeatedly hitting "       +
        "the spacebar. "                                                +
        "This way you will go through each sentence. Your task is to "  +
        "<i>silently</i> read each sentence as quickly as possible."    +
    "</p>"                                                              +
    "<p>"                                                               +
        "Sometimes a statement about a sentence will come up. You then "+
        "will have to indicate whether the statement is correct or "    +
        "not. Therefore it is important that you really <i>read</i> "   +
        "each sentence."                                                +
    "<p>"                                                               +
        "First you will read some practice sentences. These are not "   +
        "part of the actual experiment."                                +
    "</p>"                                                              +
    "<p>"                                                               +
        "<i>Hit the spacebar when ready to start.</i>"                  +
    "</p>";

const FIRST_STORY_BEGINS =
    "<h1>"                                                              +
    "Hit the spacebar when ready to start reading the first story."      +                                
    "</h1>"                                                           	+
    "<p>"																	+
    "Each sentence is broken up into words."	 						+
    "You can reveal the sentence word-by-word by repeatedly hitting the spacebar. </p>"  

const SECOND_STORY_BEGINS =
    "<h1>"                                                              +
    "Hit the spacebar when ready to start reading the second story."      +                                
    "</h1>"                                                             

const THIRD_STORY_BEGINS =
    "<h1>"                                                              +
    "Hit the spacebar when ready to start reading the third story."      +                                
    "</h1>"                                                             

const FOURTH_STORY_BEGINS =
    "<h1>"                                                              +
    "Hit the spacebar when ready to start reading the fourth story."      +                                
    "</h1>"                                                             

const PRE_TEST_INSTRUCTION = 
    "<p>"                                                               +
        "End of the practice part."                                     +
    "</p>"                                                              +
    "<p>"                                                               +
        "<i>Press the spacebar to continue.</i>"                        + 
    "</p>";

const POST_TEST_INSTRUCTION =
    "<h1>End of the experiment.</h1>"                                   +
    "<h2>Many thanks for participating</h2>";

const FINISHED_NO_CONSENT = 
    "<h1>The experiment finished, because no consent was given</h1>"    +
    "<p>You can close this tab now.</p>";
