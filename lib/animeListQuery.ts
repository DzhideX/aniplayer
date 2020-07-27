const animeListQuery = async (): Promise<object> => {
  const query = `
    {
      topScore: Page(page: 1, perPage: 30) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          title {
            english
            romaji
            native
          }
          genres
          meanScore
          popularity
          format
          episodes
          season
          seasonYear
          status
        }
      }
      mostPopular: Page(page: 1, perPage: 30) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          title {
            english
            romaji
            native
          }
          genres
          meanScore
          popularity
          format
          episodes
          season
          seasonYear
          status
        }
      }
    }
      `;

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => data);
};

export default animeListQuery;
