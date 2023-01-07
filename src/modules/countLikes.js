function likesNumber(id, likes) {
  if (!likes.find((obj) => obj.item_id === id)) return 0;

  return likes[likes.findIndex((obj) => obj.item_id === id)].likes;
}

export default likesNumber;