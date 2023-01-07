const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DoParOktO7RAA0Mhxygs/likes/';

const fetchLikes = async () => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export default fetchLikes;
