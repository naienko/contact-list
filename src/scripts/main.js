/*
{
    name: name
    address: address with street city state zip
    phone: phone number
}
*/

import createContactList from "./contactList.js";
import createContactObject from "./contactForm.js";
import deleteMe from "./deleteContact";
import editContactObject from "./contactEdit";

document.querySelector("#addNewContact").addEventListener("click", createContactObject);
createContactList();
deleteMe();
editContactObject();