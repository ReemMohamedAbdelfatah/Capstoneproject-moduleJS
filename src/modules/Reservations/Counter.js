function counter(div) {
  const comments = div.querySelectorAll('.reservation');

  let count = 0;
  comments.forEach(() => {
    count += 1;
  });

  return count;
}

export default counter;