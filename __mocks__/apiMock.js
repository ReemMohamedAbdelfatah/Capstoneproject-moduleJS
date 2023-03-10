import PopUp from '../src/modules/PopUp.js';

function appendCommentsMock(div, comments) {
  if (comments) {
    comments.forEach((commentObj) => {
      const { creation_date: date, username, comment } = commentObj;
      const node = PopUp.createElements('p', div);
      node.classList.add('comment');
      node.innerText = `${date}  ${username}: ${comment}`;
    });
  }

  return null;
}

export default appendCommentsMock;