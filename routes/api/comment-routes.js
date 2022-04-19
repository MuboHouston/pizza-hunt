const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

//the callback function of a route method has 'reg and 'res' as parameters, so we don't have to explicitly pass any arguments
router
    .route('/:pizzaId')
    .post(addComment)

router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment)

router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply)

module.exports = router