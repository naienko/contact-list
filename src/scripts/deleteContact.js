import API from "./contactCollection";
import createContactList from "./contactList";

const deleteMe = () => {
    document.querySelector("#contactDisplay").addEventListener("click", event => {
         if(event.target.id.split("--")[0] === "deletebutton") {
            API.deleteContact(event.target.id.split("--")[1])
            // NOTE TO SELF when calling a function reference in a .then don't use the ()?
            .then(createContactList);
        }
    });
};

export default deleteMe;