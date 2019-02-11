import API from "./contactCollection";

const editContactObject = () => {
    document.querySelector("#contactDisplay").addEventListener("click", event => {
        if(event.target.id.split("--")[0] === "editbutton") {
            const contactID = parseInt(event.target.id.split("--")[1]);
            API.getContacts().then(
                contactArray => {
                    const editThis = contactArray.find(item => item.id === contactID);
                    document.querySelector("#contactName").value = editThis.name;
                    document.querySelector("#contactAddress").value = editThis.address;
                    document.querySelector("#contactPhone").value = editThis.phone;
                    document.querySelector("#contactID").value = editThis.id;
                    document.querySelector("#addNewContact").textContent = "Save Changes";
                })
            }
        });
    };

export default editContactObject;