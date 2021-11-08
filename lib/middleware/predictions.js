const toxicity = require('@tensorflow-models/toxicity');
// const { model } = require('@tensorflow/tfjs');
const threshold = 0.9;

module.exports = (req, res, next) => {
  toxicity.load(threshold).then(model => {
    const sentences = [req.body.sentence];
    model.classify(sentences).then(predictions => {
      if (sentences === false){
        res.send(predictions);
        next();
      } else if (sentences === true){
        const err = new Error('Guideline Violation');
        err.status = 66;
      }
    //could change to ? :
    //would a map work better for this?
    //sentences.map(sentence => if (sentence === false){
      //   res.send(predictions);
      //     next();
      //   } else {   const err = new Error('Guideline Violation');
      // err.status = 66; }
    }); 
  });
};

//this is an array. It is getting back an array of objects that are in a string. We use res.send so that the predictions show up on Thunder Client. 
//build out routes that have different comment text and username. If the comment text triggers it or not will depend on the save. 
