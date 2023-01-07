function apiMock(div, data) {
  if (!data) return 0;

  data.forEach((obj) => {
    const { username, date_start: startDate, date_end: endDate } = obj;
    const node = document.createElement('p');
    div.appendChild(node);
    node.classList.add('reservation');
    node.innerText = `${startDate} - ${endDate} by ${username}`;
  });

  return 0;
}

export default apiMock;