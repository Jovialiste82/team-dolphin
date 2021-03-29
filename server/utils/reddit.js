const axios = require("axios");
const ENDPOINT = "http://www.reddit.com/r/all/search.json";

const searchRecursive = async (term, after = "", posts = []) => {
  if (posts.length >= 100) return posts;

  let url = `${ENDPOINT}?q=${term}` + (after ? `&after=${after}` : "");

  const image = (image) => {
    if (image === "default" || image === "self") {
      return "https://i.imgflip.com/1f0hdj.jpg";
    } else {
      return image;
    }
  };

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      res.data.data.children.forEach(async (post) => {
        posts.push({
          content: post.data.selftext || post.data.url,
          title: post.data.title,
          platform: "reddit",
          image: image(post.data.thumbnail),
          date: new Date(post.data.created * 1000),
          popularity: post.data.ups,
          url: post.data.url,
          company: term,
        });
      });
      if (res.data.data.after) {
        return searchRecursive(term, res.data.data.after, posts);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchRecursive };
