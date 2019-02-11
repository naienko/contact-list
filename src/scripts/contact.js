/*
    Author: Panya
    Name: contact.js
    Purpose: displays a person's name, phone number, and address
*/

const createContactCard = contactElement => {
    return `<section id="contactCard"><h3>${contactElement.name}</h3>
    <div>${contactElement.address}</div>
    <div>${contactElement.phone}</div>
    <button id="deletebutton--${contactElement.id}">delete</button>
    </section>`;
};

export default createContactCard;