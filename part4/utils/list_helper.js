const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favouriteBlog = (blogs) => {
  if (blogs.length > 0) {
    let maxValue = blogs[0].likes;
    let maxIndex = 0;
    blogs.map((blog, index) => {
      if (blog.likes > maxValue) {
        maxValue = blog.likes;
        maxIndex = index;
      }
    });
    return blogs[maxIndex];
  }
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
