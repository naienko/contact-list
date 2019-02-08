/*
    Author: Panya
    Name: contactList.js
    Purpose: displays all contacts. It should import the Contact component and the ContactCollection component.
 */

import createContactCard from "./contact.js";
import getContacts from "./contactCollection.js";

const createContactList = () => {
    const listEl = document.querySelector("#contactDisplay");
    getContacts().then(
        contactArray.forEach(element => {
            listEl.innerHTML += createContactCard(element);
        })
    );
};

export default createContactList;