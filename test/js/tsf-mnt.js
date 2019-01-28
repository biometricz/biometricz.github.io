console.log("starting tensorflow JS")

// this image can be a jpg or png but that will only work if you run the example locally in localhost
const img = document.getElementById('img');
const result = document.getElementById('result');


// Load the model - you should do this only once!
// Once you have the model you can classify images
mobilenet.load().then(model => {
    model.classify(img).then(predictions => {
      log(predictions)    
  });
});

// display the result
function log(predictions) {
  result.innerHTML = ""
  for(let p of predictions){
      console.log(p);
      result.innerHTML += p.className + "   -   " + p.probability + "<br>"
  }
}

// SETTINGS
// add these libraries
// https://cdnjs.cloudflare.com/ajax/libs/tensorflow/0.12.7/tf.min.js
// https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@0.1.1
