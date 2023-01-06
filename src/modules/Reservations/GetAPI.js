async function getAPI(id, url) {
  const response = await fetch(`${url}?item_id=${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  });

  const json = await response.json();
  return json;
}

export default getAPI;