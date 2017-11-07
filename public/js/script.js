'use strict';

var socket = io();

var outputYou = document.querySelector('.output-you');
var outputBot = document.querySelector('.output-bot');

// var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// var recognition = new SpeechRecognition();

// recognition.lang = 'en-US';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

$("#question").on("keyup", function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        var text = $('#question').val();
        var date = formatAMPM(new Date());
        var avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";
        var control = '<li style="width:70%">' +
                              '<div class="msj macro">' +
                              '<div class="avatar"><img class="img-circle" style="width:48px;" src="'+ avatar +'" /></div>' +
                                  '<div class="text text-l">' +
                                      '<p>'+ text +'</p>' +
                                      '<p><small>'+date+'</small></p>' +
                                  '</div>' +
                              '</div>' +
                          '</li>';
        $('#dialogue').append(control);
        socket.emit('chat message', text);
        $("#dialogue").animate({ scrollTop: $(".frame")[0].scrollHeight}, 1000);
        $('#question').val('');
    }
});

$('#ask').on('click', function(event){
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        var text = $('#question').val();
        var date = formatAMPM(new Date());
        var avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";
        var control = '<li style="width:70%">' +
                              '<div class="msj macro">' +
                              '<div class="avatar"><img class="img-circle" style="width:48px;" src="'+ avatar +'" /></div>' +
                                  '<div class="text text-l">' +
                                      '<p>'+ text +'</p>' +
                                      '<p><small>'+date+'</small></p>' +
                                  '</div>' +
                              '</div>' +
                          '</li>';
        $('#dialogue').append(control);
        socket.emit('chat message', text);
        $("#dialogue").animate({ scrollTop: $(".frame")[0].scrollHeight}, 1000);
        $('#question').val('');
    }
});

// document.getElementById('mic').addEventListener('click', function() {
//   recognition.start();
// });

// recognition.addEventListener('speechstart', function() {
//   console.log('Speech has been detected.');
// });

// recognition.addEventListener('result', (e) => {
//   console.log('Result has been detected.');

//   var last = e.results.length - 1;
//   var text = e.results[last][0].transcript;

//   outputYou.textContent = text;
//   console.log('Confidence: ' + e.results[0][0].confidence);

//   socket.emit('chat message', text);
// });

// recognition.addEventListener('speechend', function() {
//   recognition.stop();
// });

// recognition.addEventListener('error', (e) => {
//   outputBot.textContent = 'Error: ' + e.error;
// });

// function synthVoice(text) {
//   var synth = window.speechSynthesis;
//   var utterance = new SpeechSynthesisUtterance();
//   utterance.text = text;
//   synth.speak(utterance);
// }

socket.on('bot reply', function(replyText) {
  // synthVoice(replyText);

  var avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";
  var date = formatAMPM(new Date());
  if(replyText == '') replyText = '(No answer...)';
  var control = '<li style="width:70%">' +
                        '<div class="msj-rta macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:48px;" src="'+ avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ replyText +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
  //outputBot.textContent = replyText;
  $('#dialogue').append(control);

});

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
