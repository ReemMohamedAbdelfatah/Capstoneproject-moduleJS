import PopUp from "../src/modules/PopUp";

function appendCommentsMock(div, comments) {
    if (!comments) return 0
    
  comments.forEach((commentObj) => {
    const { creation_date: date, username, comment } = commentObj;
    const node = PopUp.createElements('p', div);
    node.classList.add('comment');
    node.innerText = `${date}  ${username}: ${comment}`;
  });  
}

export default appendCommentsMock