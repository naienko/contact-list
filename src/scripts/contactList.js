/*
    Author: Panya
    Name: contactList.js
    Purpose: displays all contacts. It should import the Contact component and the ContactCollection component.
 */

import createContactCard from "./contact.js";
import API from "./contactCollection";

const createContactList = () => {
    const listEl = document.querySelector("#contactDisplay");
    listEl.innerHTML = "";
    API.getContacts()
    .then(contactArray =>
        contactArray.forEach(element => {
            listEl.innerHTML += createContactCard(element);
        })
    );
};

export default createContactList;