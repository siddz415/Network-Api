const { Thought, User } = require('../models');

const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find()
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createNewThought(req, res) {
    Thought.create(req.body)
      .then((dbUserData) => {
        return User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: dbUserData._id} },{new: true})
      }).then(dbUserData => {
        if(!dbUserData) {
          return res.status(404).json({message: 'No user with this id'})
        }
        res.json({message: 'Thought succesfully created'})
      }) 
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  editThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {

        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json({ message: 'Thought deleted.' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

 
  addReaction({params, body}, res){
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$addToSet: {reactions: body}},
        { new: true, runValidators: true }
    )
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'Incorrect reaction data!' });
            return;
        }
        res.json(dbThoughtData);
    }).catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
},
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
       
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;