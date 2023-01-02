import PostModel from '../models/Post.js';

export const getLastTags = async (request, response) => {
  try {
    const posts = await PostModel.find().limit(5).exec(); // .get tags from 5 latest posts
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    response.json(posts);
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to retrieve tags!',
    });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    const posts = await PostModel.find().populate('author').exec(); // .populate('author').exec(); - get all info by user

    response.json(posts);
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to retrieve articles!',
    });
  }
};

export const getPost = async (request, response) => {
  try {
    const postId = request.params.id; //get id from route
    PostModel.findOneAndUpdate(
      { _id: postId },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          const status = err.status || 500;
          return response.status(status).json({
            message: 'Failed to retrieve article!',
          });
        }

        if (!doc) {
          return response.status(404).json({
            message: 'Article not found!',
          });
        }

        response.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to retrieve article!',
    });
  }
};

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

    response.json(post);
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to create article!',
    });
  }
};

export const removePost = async (request, response) => {
  try {
    const postId = request.params.id; //get id from route

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          const status = err.status || 500;
          response.status(status).json({
            message: 'Failed to delete article!',
          });
        }

        if (!doc) {
          return response.status(404).json({
            message: 'Article not found!',
          });
        }

        response.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to delete article!',
    });
  }
};

export const updatePost = async (request, response) => {
  try {
    const postId = request.params.id; //get id from route

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: request.body.title,
        text: request.body.text,
        tags: request.body.tags,
        imageUrl: request.body.imageUrl,
        author: request.userId,
      }
    );
    response.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to update article!',
    });
  }
};
