const toxicity = require('@tensorflow-models/toxicity');
// const { model } = require('@tensorflow/tfjs');
const threshold = 0.9;

module.exports = (req, res, next) => {
  toxicity.load(threshold).then(model => {
    const thingsToCheck = [req.body.comment || req.body.username];
    model.classify(thingsToCheck).then(predictions => {
      const violations = predictions.map(prediction => {
        return {
          label: prediction.label,
          match: prediction.results[0].match
        };
      });
      //by this point, on the front-end, if we want to catch the username or anything typed through, send it as a 'comment' and 'username'
      if (!violations.find(violation => violation.match)){
        res.send(violations);
        next();
      } else if (violations.find(violation => violation.match)){
        const reasons = violations.filter(violation => violation.match).reduce((acc, item) => {
          const and = acc.length === 0 ? '' : ' & ';
          return  acc = acc + and + item.label; 
        }, '');
        const err = new Error(`Blaze It Dont Hate It, rejected for ${reasons}`);
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
