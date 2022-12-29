import PostModel from '../models/Post.js';

export const createPost = async (request, response) => {
  try {
    const doc = new PostModel({
      title: request.body.title,
      text: request.body.text,
      tags: request.body.tags,
      imageUrl: request.body.imageUrl,
      author: request.userId,
    });

    const post = await doc.save();

    response.json(post)
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to create article!',
    });
  }
};
