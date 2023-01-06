/* eslint-disable no-unused-vars */
import close from '../images/close.jpg';

const Modal = document.querySelector('.modal-container');
const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

window.CloseModal = () => {
  Modal.style.display = 'none';
  document.querySelector('main').style.display = 'block';
  document.querySelector('header').style.display = 'flex';
};

window.saveReservation = (id) => {
  fetch(`${BASE_URL}/apps/abc234/reservations?1`).then((resp) => resp.json()).then((data) => console.log('resrvedata', data));
//   console.log('reserveid', id);
};

const openPopMoal = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()).then((data) => {
    Modal.innerHTML = `
  <div class="modalbox">
    <div class="pop-top">
      <div class="top-title">
      <img class="popup-image" src='${data.sprites.front_default}' alt="Project Popup Image">
        <img onclick="CloseModal()" class="close-modal" src="${close}" alt="closebutton">
    </div>
  </div>
  <h1 class="modaltitle">${data.name}</h1>
    <div class="below-box">
    <ul>
    <li><b>Height :</b> ${data.height}</li>
    <li><b>Weight :</b> ${data.weight}</li>
    </ul>
    <ul>
    <li><b>Experience :</b> ${data.base_experience}</li>
    <li><b>Order :</b> ${data.order}</li>
    </ul>
    </div>
    <div>
    <h1>Reservations</h1>
    
    </div>
    <form>
    <h1>Add a reservation</h1>
    <input type='text' placeholder='Your name' required/>
    <input type='date' placeholder='Start date' required/>
    <input type='date' placeholder='End date' required/>
    <button type='button' onClick='saveReservation(${id})'>Reseve</button>
    </form>
    </div>
  `;
    Modal.style.display = 'block';
  });
};

export default openPopMoal;