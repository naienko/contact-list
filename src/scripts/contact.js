/*
    Author: Panya
    Name: contact.js
    Purpose: displays a person's name, phone number, and address
*/

const createContactCard = contactElement => {
    return `<section><h3>${contactElement.name}</h3>
    <div>${contactElement.address}</div>
    <div>${contactElement.phone}</div>
    </section>`;
};

export default createContactCard;