var exp_time, exp_compensation, web_link
var timeline = [];
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
var pointer_lock = false;


function saveData(name, data, folder_name) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    filename: name,
    filedata: data,
    folder_name: folder_name
  }));
}

var total_img_list = [];

var save_data = {
  type: 'html-keyboard-response',
  stimulus: "Saving data ... One moment please...",
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000,
  on_start: function(save_data) {
    saveData(subj_name + "_summary", jsPsych.data.get().filter({
      data_summary: true
    }).csv(), save_folder)
  },
  on_finish: function(data) {
    saveData(subj_name + "_all_data", jsPsych.data.get().csv(), save_folder);
  }
}


var shuffle = function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice();
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function redirect() {
  location.replace(redirect_html)
}
const fillRange = (start, end) => {
  return Array(end - start + 1).fill().map((item, index) => start + index);
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function myFunction() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}
// check if we are on a moble device

var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i),
  isTablet = navigator.userAgent.toLowerCase().match(/tablet/i),
  isAndroid = navigator.userAgent.toLowerCase().match(/android/i),
  isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i),
  isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);

var check_device = {
  type: 'html-button-response',
  choices: [' '],
  on_start: function(check_device) {
    if (isAndroid || isiPad || isiPhone || isMobile || isTablet) {
      check_device.stimulus =
        `Oops, it looks like you are on a tablet, phone or other mobile device.  This experiment can only be run from a computer or laptop.  Please return to Prolific and click "stop withotu completing."   If you feel like this message is in error, you can contact the study author at robert.walter@yale.edu.<br><br> Press on the 'Exit' button to exit this experiment.`;
      check_device.choices = ["Exit"];
      check_device.data.mobile = true;
    } else {
      check_device.stimulus =
        `Please note that this experiment is only designed to work from a computer or laptop.  Please <strong> do not </strong> continue if you are using a phone, tablet, or other mobile device.  If you are on a phone, tablet or other mobile device you will need to return to prolific <br>and click "stop without completing".  <br> <br> If you are currently seeing this page from a laptop or computer, please click on the 'Continue' button.<br><br>`;
      check_device.choices = ["Continue"];
      check_device.data.mobile = false;
    }

  },
  data: {
    test_part: "check_device"
  },
  on_finish(data) {
    if (data.mobile) {
      jsPsych.endExperiment()
    }
  }
}
// consent and boilerplate stuff

var consent = {
  type: 'html-keyboard-response',
  choices: ['y', 'Y'],
  stimulus: function() {
    var consent_text = "<div style = 'font-size: .9vw; line-height: 1vw;'><h1>In order to run this study, we need to include the standard consent form below. <br> <br><strong>***Please Read and press the 'Y' key to consent to this study*** </strong> </h1><h4>Consent for Participation in a Research Study</h4><div style='width: 100%; text-align: center'><div style='display: inline-block; margin: 0 auto; padding: 2vh 5vw; text-align: left'><h2>STUDY TITLE</h2><p>Perceiving Objects and Events</p><h2>RESEARCH STUDY SUMMARY, RISKS, AND BENEFITS</h2><p>Thank you for volunteering to participate in this research study. The purpose of this study is to better understand how we see and how we think. Study activities will include examining simple displays and then responding by answering questions, pressing some keys, or using a computer mouse. Because these are activities that many people already experience hundreds or thousands of times every day, there are no risks involved in this study. The study may have no benefits to you, but it may help the scientific community come to better understand how the human mind works. Taking part in this study is your choice. You can choose to take part, or you can choose not to take part in this study. You can also change your mind at any time, with no penalty.</p><h2>DURATION</h2><p>If you agree to take part, the study will last approximately <strong>" +
      exp_time + "</strong>.</p><h2>COSTS AND COMPENSATION</h2><p>There are no costs associated with participation in this study. You will receive <strong>" + exp_compensation +
      "</strong> for participating.</p><h1>CONFIDENTIALITY</h1><p>No personally identifying information will be collected, so your participation will be anonymous. Your data will be pooled with those from other participants, and may be included in scientific publications and uploaded to public data repositories.</p><h2>LEARNING MORE</h2><p>If you have questions about this study, you may contact your experimenter Robert Walter at robert.walter@yale.edu. If you have questions about your rights as a research participant, or you have complaints about this research, you can contact the Yale Institutional Review Boards at 203-785-4688 or hrpp@yale.edu.</p><h2>INFORMED CONSENT</h2><p>Your participation indicates that you have read and understood this consent form and the information presented and that you agree to be in this study.</p></div></div> </div>"
    return consent_text
  },
  prompt: "<h3>PRESS THE Y KEY TO CONSENT</h3>",
  data: {
    test_part: 'consent'
  },
  on_start: function(consent) {
    //console.log(" starting 'consent'")
  }
};

var enter_fullscreen = {
  type: 'fullscreen',
  pointer_lock: false,
  message: `<p>This experiment needs to be completed in full-screen mode. <br><br> Clicking on the "continue" button should bring the experiment to full-screen mode.<br> (Don't worry, we'll take you out of full-screen mode when the experiment is over.)<br><br>Once you are in full-screen mode, please do not exit full-screen mode or minimize this screen until the experiment is completed.<br>(Additionally, do not press your browser's "back" button as this will end the experiment without giving you credit.)<br><br>`,
  on_finish: function(data) {
    [w, h] = [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight]
    if (debug) {
      console.log(w + ',' + h)
    }
  }
}

var exit_fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: false,
  message: '<p>The experiment will switch out of full-screen mode when you press the button below</p>'
}

var today = new Date();
var subj_name = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var prolific_PID = getUrlParameter('PROLIFIC_PID')
var prolific_study_id = getUrlParameter('STUDY_ID')
var prolific_session_id = getUrlParameter('SESSION_ID')
if (prolific_PID != null && prolific_PID != "") {
  subj_name = (prolific_PID)
}
//console.log(subj_name)
jsPsych.data.addProperties({
  subject: subj_name,
  prolific_study_id: prolific_study_id,
  prolific_session_id: prolific_session_id
});

var exit_exp = {
  type: 'html-keyboard-response',
  stimulus: function() {
    return exit_expeirment_text
  },
  choices: ['q'],
  data: {
    trial_part: "exit_exp"
  },
  on_finish: function(data) {
    jsPsych.endExperiment()
  }
}

var thank_you = {
  type: 'html-button-response',

  choices: ['Exit Full-Screen'],
  button_html: `<button onClick = 'redirect()'> Continue </button>`,
  on_start: function(thank_you) {
    //saveData(subj_name, jsPsych.data.get().csv());
    thank_you.stimulus =
      `<h2> Thank you for completing this experiment! </h2> <p> I really appreciate your help with this experiment and making it through to the end. <h1> To get credit for this experiment, please click on continue, which will redirect you to the completion page on Prolific.`

  },
}

var final = {
  type: 'html-keyboard-response',
  choices: ['q', 'Q'],
  on_start: function(final) {
    final.stimulus = `If you see this page, the last button didn't redirect you properly.  Please copy and past this link to receive credit for your participation: ` + redirect_html
  },
  on_finish: function(data) {
    jsPsych.endExperiment()
  }
}

var instructions = function(instruct_pages, delay_times) {
  var instructions1 = {
    type: 'instructions',
    choices: [' '],
    button_delay: delay_times,
    pointer_lock: pointer_lock,
    on_start: function(instructions1) {
      if (debug) {
        instructions1.button_delay = 1000;
      }
      instructions1.window_size = [w, h]
      instructions1.cursor_size = cursor_size
      instructions1.pages = instruct_pages;
      instructions1.show_clickable_nav = true;
      instructions1.button_locs = [w / 10, h / 12];
    },
    data: {
      trial_part: 'instructions1'
    },
    allow_keys: false

  }
  return instructions1;
}

var preload_media = {
  type: "preload",
  on_start: function(preload_media){
    if (preload_audio.length > 0){
      preload_media.audio = preload_audio
    }
    if (preload_images.length > 0){
      preload_media.images = preload_images
    }
    if (preload_video.length > 0){
      preload_media.video= preload_video
    }
    preload_media.show_progress_bar = preload_progress_bar
  }
}
