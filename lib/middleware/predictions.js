const toxicity = require('@tensorflow-models/toxicity');
// const { model } = require('@tensorflow/tfjs');
const threshold = 0.9;

module.exports = (req, res, next) => {
  toxicity.load(threshold).then(model => {
    const sentences = [req.body.sentence];
    model.classify(sentences).then(predictions => {
      const violations = predictions.map(prediction => prediction.results.map(result => result.match)).reduce((acc, item) => {
        acc.push(item[0]);
        return acc;
      }, []);
      if (!violations.includes(true)){
        res.send(violations);
        next();
      } else if (violations.includes(true)){
        const err = new Error('Blaze It');
        err.status = 420;
        next(err);
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
