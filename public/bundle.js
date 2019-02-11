(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
Author: Panya
Name: contact.js
Purpose: displays a person's name, phone number, and address
*/
const createContactCard = contactElement => {
  return `<section id="contactCard"><h3>${contactElement.name}</h3>
    <div>${contactElement.address}</div>
    <div>${contactElement.phone}</div>
    <button id="deletebutton--${contactElement.id}">delete ${contactElement.name}</button> <button id="editbutton--${contactElement.id}">edit ${contactElement.name}</button>
    </section>`;
};

var _default = createContactCard;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
Author: Panya
Name: contactCollection.js
Purpose: loads existing contacts from a json-server API, and saves new ones.
*/
const API = {
  getContacts: () => {
    return fetch("http://127.0.0.1:8088/contacts").then(res => res.json());
  },
  createContacts: contactObject => {
    return fetch("http://127.0.0.1:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    }).then(res => res.json());
  },
  deleteContact: contactId => {
    return fetch(`http://127.0.0.1:8088/contacts/${contactId}`, {
      method: "DELETE"
    });
  },
  editContact: (contactObject, contactId) => {
    return fetch(`http://127.0.0.1:8088/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    }).then(res => res.json());
  }
};
var _default = API;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const editContactObject = () => {
  document.querySelector("#contactDisplay").addEventListener("click", event => {
    if (event.target.id.split("--")[0] === "editbutton") {
      const contactID = parseInt(event.target.id.split("--")[1]);

      _contactCollection.default.getContacts().then(contactArray => {
        const editThis = contactArray.find(item => item.id === contactID);
        document.querySelector("#contactName").value = editThis.name;
        document.querySelector("#contactAddress").value = editThis.address;
        document.querySelector("#contactPhone").value = editThis.phone;
        document.querySelector("#contactID").value = editThis.id;
        document.querySelector("#addNewContact").textContent = "Save Changes";
      });
    }
  });
};

var _default = editContactObject;
exports.default = _default;

},{"./contactCollection":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Author: Panya
Name: contactForm.js
Purpose: listens for when the submit button is pressed. When it is triggered, a new contact should be POSTed to the API. It should import the ContactCollection component.
*/
const createContactObject = () => {
  const contactObject = Object.create(null);
  contactObject.name = document.querySelector("#contactName").value;
  contactObject.address = document.querySelector("#contactAddress").value;
  contactObject.phone = document.querySelector("#contactPhone").value;
  const contactID = document.querySelector("#contactID").value;

  if (contactID !== "") {
    _contactCollection.default.editContact(contactObject, contactID).then(() => {
      (0, _contactList.default)();
      document.querySelector("#contactName").value = "";
      document.querySelector("#contactAddress").value = "";
      document.querySelector("#contactPhone").value = "";
      document.querySelector("#contactID").value = "";
      document.querySelector("#addNewContact").textContent = "Submit";
    });
  } else {
    _contactCollection.default.createContacts(contactObject).then(_contactList.default);
  }
};

var _default = createContactObject;
exports.default = _default;

},{"./contactCollection":2,"./contactList":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Author: Panya
Name: contactList.js
Purpose: displays all contacts. It should import the Contact component and the ContactCollection component.
*/
const createContactList = () => {
  const listEl = document.querySelector("#contactDisplay");
  listEl.innerHTML = "";

  _contactCollection.default.getContacts().then(contactArray => contactArray.forEach(element => {
    listEl.innerHTML += (0, _contact.default)(element);
  }));
};

var _default = createContactList;
exports.default = _default;

},{"./contact.js":1,"./contactCollection":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteMe = () => {
  document.querySelector("#contactDisplay").addEventListener("click", event => {
    if (event.target.id.split("--")[0] === "deletebutton") {
      _contactCollection.default.deleteContact(event.target.id.split("--")[1]) // NOTE TO SELF when calling a function reference in a .then don't use the ()?
      .then(_contactList.default);
    }
  });
};

var _default = deleteMe;
exports.default = _default;

},{"./contactCollection":2,"./contactList":5}],7:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactForm = _interopRequireDefault(require("./contactForm.js"));

var _deleteContact = _interopRequireDefault(require("./deleteContact"));

var _contactEdit = _interopRequireDefault(require("./contactEdit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
{
    name: name
    address: address with street city state zip
    phone: phone number
}
*/
document.querySelector("#addNewContact").addEventListener("click", _contactForm.default);
(0, _contactList.default)();
(0, _deleteContact.default)();
(0, _contactEdit.default)();

},{"./contactEdit":3,"./contactForm.js":4,"./contactList.js":5,"./deleteContact":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0RWRpdC5qcyIsIi4uL3NjcmlwdHMvY29udGFjdEZvcm0uanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RMaXN0LmpzIiwiLi4vc2NyaXB0cy9kZWxldGVDb250YWN0LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7OztBQU1BLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxJQUFJO0FBQ3hDLFNBQVEsaUNBQWdDLGNBQWMsQ0FBQyxJQUFLO1dBQ3JELGNBQWMsQ0FBQyxPQUFRO1dBQ3ZCLGNBQWMsQ0FBQyxLQUFNO2dDQUNBLGNBQWMsQ0FBQyxFQUFHLFlBQVcsY0FBYyxDQUFDLElBQUsscUNBQW9DLGNBQWMsQ0FBQyxFQUFHLFVBQVMsY0FBYyxDQUFDLElBQUs7ZUFIaEs7QUFLSCxDQU5EOztlQVFlLGlCOzs7Ozs7Ozs7OztBQ2RmOzs7OztBQU1BLE1BQU0sR0FBRyxHQUFHO0FBQ1IsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNmLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDTixJQURNLENBQ0QsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFKLEVBRE4sQ0FBUDtBQUVILEdBSk87QUFLUixFQUFBLGNBQWMsRUFBRSxhQUFhLElBQUk7QUFDN0IsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDL0MsTUFBQSxNQUFNLEVBQUUsTUFEdUM7QUFFL0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZzQztBQUsvQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGFBQWY7QUFMeUMsS0FBbkMsQ0FBTCxDQU9WLElBUFUsQ0FPTCxHQUFHLElBQUksR0FBRyxD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QUF0QyxFQUFzRDtBQUNsRCxpQ0FBSSxhQUFKLENBQWtCLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFsQixFQUNBO0FBREEsT0FFQyxJQUZELENBRU0sb0JBRk47QUFHSDtBQUNKLEdBTkQ7QUFPSCxDQVJEOztlQVVlLFE7Ozs7OztBQ0xmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBWEE7Ozs7Ozs7QUFhQSxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLG9CQUFuRTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG5BdXRob3I6IFBhbnlhXG5OYW1lOiBjb250YWN0LmpzXG5QdXJwb3NlOiBkaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3NcbiovXG5cbmNvbnN0IGNyZWF0ZUNvbnRhY3RDYXJkID0gY29udGFjdEVsZW1lbnQgPT4ge1xuICAgIHJldHVybiBgPHNlY3Rpb24gaWQ9XCJjb250YWN0Q2FyZFwiPjxoMz4ke2NvbnRhY3RFbGVtZW50Lm5hbWV9PC9oMz5cbiAgICA8ZGl2PiR7Y29udGFjdEVsZW1lbnQuYWRkcmVzc308L2Rpdj5cbiAgICA8ZGl2PiR7Y29udGFjdEVsZW1lbnQucGhvbmV9PC9kaXY+XG4gICAgPGJ1dHRvbiBpZD1cImRlbGV0ZWJ1dHRvbi0tJHtjb250YWN0RWxlbWVudC5pZH1cIj5kZWxldGUgJHtjb250YWN0RWxlbWVudC5uYW1lfTwvYnV0dG9uPiA8YnV0dG9uIGlkPVwiZWRpdGJ1dHRvbi0tJHtjb250YWN0RWxlbWVudC5pZH1cIj5lZGl0ICR7Y29udGFjdEVsZW1lbnQubmFtZX08L2J1dHRvbj5cbiAgICA8L3NlY3Rpb24+YDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbnRhY3RDYXJkOyIsIi8qXG5BdXRob3I6IFBhbnlhXG5OYW1lOiBjb250YWN0Q29sbGVjdGlvbi5qc1xuUHVycG9zZTogbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBhIGpzb24tc2VydmVyIEFQSSwgYW5kIHNhdmVzIG5ldyBvbmVzLlxuKi9cblxuY29uc3QgQVBJID0ge1xuICAgIGdldENvbnRhY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9jb250YWN0c1wiKVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSk7XG4gICAgfSxcbiAgICBjcmVhdGVDb250YWN0czogY29udGFjdE9iamVjdCA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9jb250YWN0c1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSk7XG4gICAgfSxcbiAgICBkZWxldGVDb250YWN0OiBjb250YWN0SWQgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9jb250YWN0cy8ke2NvbnRhY3RJZH1gLCB7XG4gICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxuICAgICAgICB9KVxuICAgIH0sXG4gICAgZWRpdENvbnRhY3Q6IChjb250YWN0T2JqZWN0LCBjb250YWN0SWQpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvY29udGFjdHMvJHtjb250YWN0SWR9YCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJOyIsImltcG9ydCBBUEkgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIjtcblxuY29uc3QgZWRpdENvbnRhY3RPYmplY3QgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0RGlzcGxheVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgICBpZihldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVswXSA9PT0gXCJlZGl0YnV0dG9uXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RJRCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKTtcbiAgICAgICAgICAgIEFQSS5nZXRDb250YWN0cygpLnRoZW4oXG4gICAgICAgICAgICAgICAgY29udGFjdEFycmF5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRpdFRoaXMgPSBjb250YWN0QXJyYXkuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGNvbnRhY3RJRCk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdE5hbWVcIikudmFsdWUgPSBlZGl0VGhpcy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RBZGRyZXNzXCIpLnZhbHVlID0gZWRpdFRoaXMuYWRkcmVzcztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0UGhvbmVcIikudmFsdWUgPSBlZGl0VGhpcy5waG9uZTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0SURcIikudmFsdWUgPSBlZGl0VGhpcy5pZDtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGROZXdDb250YWN0XCIpLnRleHRDb250ZW50ID0gXCJTYXZlIENoYW5nZXNcIjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5leHBvcnQgZGVmYXVsdCBlZGl0Q29udGFjdE9iamVjdDsiLCIvKlxuQXV0aG9yOiBQYW55YVxuTmFtZTogY29udGFjdEZvcm0uanNcblB1cnBvc2U6IGxpc3RlbnMgZm9yIHdoZW4gdGhlIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZC4gV2hlbiBpdCBpcyB0cmlnZ2VyZWQsIGEgbmV3IGNvbnRhY3Qgc2hvdWxkIGJlIFBPU1RlZCB0byB0aGUgQVBJLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG4qL1xuXG5pbXBvcnQgQVBJIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCI7XG5pbXBvcnQgY3JlYXRlQ29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIjtcblxuY29uc3QgY3JlYXRlQ29udGFjdE9iamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWN0T2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBjb250YWN0T2JqZWN0Lm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3ROYW1lXCIpLnZhbHVlO1xuICAgIGNvbnRhY3RPYmplY3QuYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdEFkZHJlc3NcIikudmFsdWU7XG4gICAgY29udGFjdE9iamVjdC5waG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdFBob25lXCIpLnZhbHVlO1xuICAgIGNvbnN0IGNvbnRhY3RJRCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdElEXCIpLnZhbHVlO1xuICAgIGlmIChjb250YWN0SUQgIT09IFwiXCIpIHtcbiAgICAgICAgQVBJLmVkaXRDb250YWN0KGNvbnRhY3RPYmplY3QsIGNvbnRhY3RJRClcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udGFjdExpc3QoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3ROYW1lXCIpLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RBZGRyZXNzXCIpLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RQaG9uZVwiKS52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0SURcIikudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkTmV3Q29udGFjdFwiKS50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG4gICAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgIEFQSS5jcmVhdGVDb250YWN0cyhjb250YWN0T2JqZWN0KVxuICAgIC50aGVuKGNyZWF0ZUNvbnRhY3RMaXN0KTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250YWN0T2JqZWN0OyIsIi8qXG5BdXRob3I6IFBhbnlhXG5OYW1lOiBjb250YWN0TGlzdC5qc1xuUHVycG9zZTogZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cbiovXG5cbmltcG9ydCBjcmVhdGVDb250YWN0Q2FyZCBmcm9tIFwiLi9jb250YWN0LmpzXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCI7XG5cbmNvbnN0IGNyZWF0ZUNvbnRhY3RMaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdERpc3BsYXlcIik7XG4gICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgQVBJLmdldENvbnRhY3RzKClcbiAgICAudGhlbihjb250YWN0QXJyYXkgPT5cbiAgICAgICAgY29udGFjdEFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBsaXN0RWwuaW5uZXJIVE1MICs9IGNyZWF0ZUNvbnRhY3RDYXJkKGVsZW1lbnQpO1xuICAgICAgICB9KVxuICAgICApO1xuIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbnRhY3RMaXN0OyIsImltcG9ydCBBUEkgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIjtcbmltcG9ydCBjcmVhdGVDb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiO1xuXG5jb25zdCBkZWxldGVNZSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3REaXNwbGF5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGlmKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzBdID09PSBcImRlbGV0ZWJ1dHRvblwiKSB7XG4gICAgICAgICAgICBBUEkuZGVsZXRlQ29udGFjdChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcbiAgICAgICAgICAgIC8vIE5PVEUgVE8gU0VMRiB3aGVuIGNhbGxpbmcgYSBmdW5jdGlvbiByZWZlcmVuY2UgaW4gYSAudGhlbiBkb24ndCB1c2UgdGhlICgpP1xuICAgICAgICAgICAgLnRoZW4oY3JlYXRlQ29udGFjdExpc3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWxldGVNZTsiLCIvKlxue1xuICAgIG5hbWU6IG5hbWVcbiAgICBhZGRyZXNzOiBhZGRyZXNzIHdpdGggc3RyZWV0IGNpdHkgc3RhdGUgemlwXG4gICAgcGhvbmU6IHBob25lIG51bWJlclxufVxuKi9cblxuaW1wb3J0IGNyZWF0ZUNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0LmpzXCI7XG5pbXBvcnQgY3JlYXRlQ29udGFjdE9iamVjdCBmcm9tIFwiLi9jb250YWN0Rm9ybS5qc1wiO1xuaW1wb3J0IGRlbGV0ZU1lIGZyb20gXCIuL2RlbGV0ZUNvbnRhY3RcIjtcbmltcG9ydCBlZGl0Q29udGFjdE9iamVjdCBmcm9tIFwiLi9jb250YWN0RWRpdFwiO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZE5ld0NvbnRhY3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZUNvbnRhY3RPYmplY3QpO1xuY3JlYXRlQ29udGFjdExpc3QoKTtcbmRlbGV0ZU1lKCk7XG5lZGl0Q29udGFjdE9iamVjdCgpOyJdfQ==
