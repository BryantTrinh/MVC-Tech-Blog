const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// DONE
// belongsto is used to estable a relationship between post and user model, Post belongs to specific User. We also need foreignkey to specify the field in the post model that holds the userId of the associated User. Using onDelete with cascade which when the User is deleted, all Post records belonging to user will also be deleted

Post.belongsTo(User, {
  User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});


// Comment belongs to user with fK and onDelete

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASECADE'
});

module.exports = {
  User,
  Comment,
  Post
};



