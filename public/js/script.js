'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

$("#question").on("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        let text = $('#question').val();
        let date = formatAMPM(new Date());
        let avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";
        let control = '<li style="width:70%">' +
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
        $('#question').val('');
    }
});

$('#ask').on('click', function(e){
  let text = $('#question').val();
  $('#dialogue').append("<p>You said: <em class=\"output-you\">...</em>"+text+"</p>");
  socket.emit('chat message', text);
  $('#question').val('');
});

// document.getElementById('mic').addEventListener('click', () => {
//   recognition.start();
// });

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);

  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {
  // synthVoice(replyText);

  let avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";
  let date = formatAMPM(new Date());
  if(replyText == '') replyText = '(No answer...)';
  let control = '<li style="width:70%">' +
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
