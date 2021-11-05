const toxicity = require('@tensorflow-models/toxicity');
const { model } = require('@tensorflow/tfjs');


model.classify(sentences).then(predictions => {
  const err = new Error('Guideline Violation');
  err.status =

    console.log(predictions);
}); 

