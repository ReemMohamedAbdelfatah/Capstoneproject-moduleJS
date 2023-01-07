async function postAPI(data, url) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  });

  const text = await response.text();
  return text;
}

export default postAPI;