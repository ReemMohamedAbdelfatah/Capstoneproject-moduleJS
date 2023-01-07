const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DoParOktO7RAA0Mhxygs/likes/';

const postLikes = async (item) => {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      item_id: item,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const text = await result.text();
  return text;
};

export default postLikes;