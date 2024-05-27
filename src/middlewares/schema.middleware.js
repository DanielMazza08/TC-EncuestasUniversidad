const schemaMiddleware = (schema) => {
  return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
          // Formatear los mensajes de error
          const errorMessages = error.details.map(detail => detail.message);
          return res.status(400).json({ errors: errorMessages });
      }
  
      // Data is valid, proceed to the next middleware
      next();
  };
};

module.exports = schemaMiddleware;
