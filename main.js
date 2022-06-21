Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Qorn6llzx/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}


function gotResult(error, results) {
if (error) {
  console.error(error);
} else {
  console.log(results);
  document.getElementById("result_gesture_name").innerHTML = results[0].label;
  gesture = results[0].label;
  toSpeak="";
  speak();
  if(gesture == "Amazing")
  {
      toSpeak = "This is looking amazing "
      document.getElementById("update_emoji").innerHTML = "&#128076;";
  }
  else if(gesture == "Best")
  {
      toSpeak = "All the best"
      document.getElementById("update_emoji").innerHTML = "&#128077;";
  }
  else if(gesture == "Victory")
  {
      toSpeak = "That was a marvelous victory"
      document.getElementById("update_emoji").innerHTML = "&#9996;";
  }

 
}
}