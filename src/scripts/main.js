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


document.querySelector("#addNewContact").addEventListener("click", createContactObject);
createContactList();
deleteMe();