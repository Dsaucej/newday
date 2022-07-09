const axios = require("axios");
const countries = require("./countries.json");
require("dotenv").config();

async function getNews(country) {
  try {
    const response = await axios.get(
      `https://api.newscatcherapi.com/v2/search?q=Tesla?country=${country}&apiKey=${process.env.NEWS_API_KEY}&pageSize=8`
    );
    return {
      country: country,
      articles: response.data.articles,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = async function () {
  let newsPromises = countries.map(getNews);
  return Promise.all(newsPromises).then((newsObjects) => {
    //console.log('newsObjects:', newsObjects);
    return [].concat.apply([], newsObjects);
  });
};
