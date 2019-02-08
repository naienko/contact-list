/*
    Author: Panya
    Name: contactCollection.js
    Purpose: loads existing contacts from a json-server API, and saves new ones.
*/

const getContacts = () => {
    return fetch("http://127.0.0.1:8088/contacts")
        .then(res => res.json());
};

const createContacts = (contactObject) => {
    return fetch("http://127.0.0.1:8088/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactObject)
    })
        .then(res => res.json());
};

export { getContacts, createContacts };