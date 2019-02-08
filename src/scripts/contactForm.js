/*
    Author: Panya
    Name: contactForm.js
    Purpose: listens for when the submit button is pressed. When it is triggered, a new contact should be POSTed to the API. It should import the ContactCollection component.
*/

import createContacts from "./contactCollection.js";

const createContactObject = () => {
    document.querySelector("#addNewContact").addEventListener("click", () => {
        const name = document.querySelector("#contactName").value;
        const address = document.querySelector("#contactAddress").value;
        const phone = document.querySelector("#contactPhone").value;
        const contactObject = Object.create(null);
        contactObject.name = name;
        contactObject.address = address;
        contactObject.phone = phone;
        console.log(contactObject);
        createContacts(contactObject);
    });
};

export default createContactObject;