// Import necessary modules
const router = require('express').Router();
const { Animal, Rating, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for getting all animals
router.get("/", withAuth,(req, res) => {
  Animal.findAll()
    .then((userData) => {
      res.status(200).json(userData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route for getting a single animal by ID
router.get("/:id",withAuth, (req, res) => {
  Animal.findByPk(req.params.id, 
    {include: [Rating],}
  )
    .then((userData) => {
      res.status(200).json(userData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route for creating a new animal
router.post("/",withAuth, (req, res) => {
  Animal.create(req.body)
    .then((newAnimal) => {
      res.status(200).json(newAnimal);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route for updating an animal by ID
router.put("/:id",withAuth, (req, res) => {
  Animal.update(req.body, {
    where: {
      id: req.params.id
    }}
  )
    .then((newAnimal) => {
      res.status(200).json(newAnimal);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Export router for use in other modules
module.exports = router;
