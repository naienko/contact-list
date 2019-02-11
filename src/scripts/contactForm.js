/*
Author: Panya
Name: contactForm.js
Purpose: listens for when the submit button is pressed. When it is triggered, a new contact should be POSTed to the API. It should import the ContactCollection component.
*/

import API from "./contactCollection";
import createContactList from "./contactList";

const createContactObject = () => {
    const contactObject = Object.create(null);
    contactObject.name = document.querySelector("#contactName").value;
    contactObject.address = document.querySelector("#contactAddress").value;
    contactObject.phone = document.querySelector("#contactPhone").value;
    API.createContacts(contactObject)
        .then(createContactList);
};

export default createContactObject;