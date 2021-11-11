const { Router } = require('express');
const SentenceService = require('../services/SentenceService');


module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const sentence = await SentenceService.createOrder(req.body.toxicity);

      res.send(sentence); 
    }
    catch(err){
      next(err);
    }
  });
