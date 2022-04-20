const { Comment, Pizza } = require('../models')

const commentController = {
    //add comment to pizza
    addComment({ params, body }, res) {
        console.log('add comment body', body)
        Comment.create(body)
        .then(({_id}) => {
            console.log("comment _id", _id)
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$push: {comments: _id}},
                {new: true}
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id!'})
                return;
            } 
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err))
    },

    //add reply. This does not recreate a new document, rather is updates an existing comment/ pushes the new data into ite respective comment
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            {_id: params.commentId},
            {$push: {replies: body}},
            {new: true, runValidators: true}
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id!'})
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err))
    },

    //remove reply
    removeReply({ params }, res) {
        console.log('params', params)
        Comment.findOneAndUpdate(
            { _id: params.commentId},
            //removing the specific reply from the replies array where the replyId matches the value of params.replyId oassed in from the route.
            { $pull: {replies: { replyId: params.replyId}}},
            {new: true}
        )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err))
    },

    removeComment({ params }, res) {
        console.log('params', params)
        Comment.findOneAndDelete({_id: params.commentId})
        .then(deletedComment => {
            if(!deletedComment) {
                return res.status(404).json({ message: 'No comment found with this id!' })
            }
            //removing comment from the pizza it is associated with
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$pull: {comments: params.commentId}},
                {new:true}
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!'})
                return;
            }
            res.json(dbPizzaData)
        }) 
        .catch(err => res.json(err))
    }
}

module.exports = commentController;