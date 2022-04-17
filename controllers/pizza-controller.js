const { Pizza } = require('../models');

//pizzaController is an object with CRUD methods
const pizzaController = {
    // get all pizzas. getAllPizza is an object method. getAllPizza and getPizzaById are the two ways to write object methods
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id
    getPizzaById: function({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
            // If no pizza is found, send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    //create pizza
    createPizza({ body }, res) {
        //the create method can handle either one or multiple inserts
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err))
    },

    //update pizza by id
    updatePizza({ params, body }, res) {
        //if we don't set the third parameter {new: true}, then it will return the original document.
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' })
                return;
            }
            res.json(dbPizzaData)
        })
        .catch(err => res.status(400).json(err))
    },

    //delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with that id!' })
                return;
            }
            res.json(dbPizzaData)
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = pizzaController;