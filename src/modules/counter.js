const counter = (tag) => {
  const cards = tag.querySelectorAll('.card');
  return cards.length;
};

export default counter;