/*
    Author: Panya
    Name: contactCollection.js
    Purpose: loads existing contacts from a json-server API, and saves new ones.
*/

const API = {
    getContacts: () => {
        return fetch("http://127.0.0.1:8088/contacts")
            .then(res => res.json());
    },
    createContacts: contactObject => {
        return fetch("http://127.0.0.1:8088/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactObject)
        })
            .then(res => res.json());
    },
    deleteContact: contactId => {
        return fetch(`http://127.0.0.1:8088/contacts/${contactId}`, {
                method: "DELETE"
        })
    },
    editContact: (contactObject, contactId) => {
        return fetch(`http://127.0.0.1:8088/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactObject)
        })
            .then(res => res.json());
    }
};

export default API;