export const createPost = async (request, response) => {
  try {
   
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).json({
      message: 'Failed to register!',
    });
  }
};
