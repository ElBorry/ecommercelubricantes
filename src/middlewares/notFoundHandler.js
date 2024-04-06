// Ubicación: src/middlewares/notFoundHandler.js

function notFoundHandler(req, res, next) {
    res.status(404).send("Lo siento, no podemos encontrar eso!");
  }
  
  export default notFoundHandler;
  