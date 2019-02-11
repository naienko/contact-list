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
    <button id="deletebutton--${contactElement.id}">delete</button>
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

  _contactCollection.default.createContacts(contactObject).then(_contactList.default);
};

var _default = createContactObject;
exports.default = _default;

},{"./contactCollection":2,"./contactList":4}],4:[function(require,module,exports){
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

},{"./contact.js":1,"./contactCollection":2}],5:[function(require,module,exports){
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

},{"./contactCollection":2,"./contactList":4}],6:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactForm = _interopRequireDefault(require("./contactForm.js"));

var _deleteContact = _interopRequireDefault(require("./deleteContact"));

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

},{"./contactForm.js":3,"./contactList.js":4,"./deleteContact":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2RlbGV0ZUNvbnRhY3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7O0FBTUEsTUFBTSxpQkFBaUIsR0FBRyxjQUFjLElBQUk7QUFDeEMsU0FBUSxpQ0FBZ0MsY0FBYyxDQUFDLElBQUs7V0FDckQsY0FBYyxDQUFDLE9BQVE7V0FDdkIsY0FBYyxDQUFDLEtBQU07Z0NBQ0EsY0FBYyxDQUFDLEVBQUc7ZUFIOUM7QUFLSCxDQU5EOztlQVFlLGlCOzs7Ozs7Ozs7OztBQ2RmOzs7OztBQU1BLE1BQU0sR0FBRyxHQUFHO0FBQ1IsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNmLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFKLEVBRFYsQ0FBUDtBQUVILEdBSk87QUFLUixFQUFBLGNBQWMsRUFBRSxhQUFhLElBQUk7QUFDN0IsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDM0MsTUFBQSxNQUFNLEVBQUUsTUFEbUM7QUFFM0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZrQztBQUszQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGFBQWY7QUFMcUMsS0FBbkMsQ0FBTCxDQU9GLElBUEUsQ0FPRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFQVixDQUFQO0FBUUgsR0FkTztBQWVSLEVBQUEsYUFBYSxFQUFHLFNBQUQsSUFBZTtBQUMxQixXQUFPLEtBQUssQ0FBRSxrQ0FBaUMsU0FBVSxFQUE3QyxFQUFnRDtBQUNwRCxNQUFBLE1BQU0sRUFBRTtBQUQ0QyxLQUFoRCxDQUFaO0FBR0g7QUFuQk8sQ0FBWjtlQXNCZSxHOzs7Ozs7Ozs7OztBQ3RCZjs7QUFDQTs7OztBQVBBOzs7OztBQVNBLE1BQU0sbUJBQW1CLEdBQUcsTUFBTTtBQUM5QixRQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQsQ0FBdEI7QUFDQSxFQUFBLGFBQWEsQ0FBQyxJQUFkLEdBQXFCLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLEtBQTVEO0FBQ0EsRUFBQSxhQUFhLENBQUMsT0FBZCxHQUF3QixRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsS0FBbEU7QUFDQSxFQUFBLGFBQWEsQ0FBQyxLQUFkLEdBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLEtBQTlEOztBQUNBLDZCQUFJLGNBQUosQ0FBbUIsYUFBbkIsRUFDSyxJQURMLENBQ1Usb0JBRFY7QUFFSCxDQVBEOztlQVNlLG1COzs7Ozs7Ozs7OztBQ1pmOztBQUNBOzs7O0FBUEE7Ozs7O0FBU0EsTUFBTSxpQkFBaUIsR0FBRyxNQUFNO0FBQzVCLFFBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixDQUFmO0FBQ0EsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixFQUFuQjs7QUFDQSw2QkFBSSxXQUFKLEdBQ0MsSUFERCxDQUNNLFlBQVksSUFDZCxZQUFZLENBQUMsT0FBYixDQUFxQixPQUFPLElBQUk7QUFDNUIsSUFBQSxNQUFNLENBQUMsU0FBUCxJQUFvQixzQkFBa0IsT0FBbEIsQ0FBcEI7QUFDSCxHQUZELENBRko7QUFNSCxDQVREOztlQVdlLGlCOzs7Ozs7Ozs7OztBQ3BCZjs7QUFDQTs7OztBQUVBLE1BQU0sUUFBUSxHQUFHLE1BQU07QUFDbkIsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsZ0JBQTFDLENBQTJELE9BQTNELEVBQW9FLEtBQUssSUFBSTtBQUN4RSxRQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixNQUFtQyxjQUF0QyxFQUFzRDtBQUNuRCxpQ0FBSSxhQUFKLENBQWtCLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFsQixFQUNBO0FBREEsT0FFQyxJQUZELENBRU0sb0JBRk47QUFHSDtBQUNKLEdBTkQ7QUFPSCxDQVJEOztlQVVlLFE7Ozs7OztBQ0xmOztBQUNBOztBQUNBOzs7O0FBVkE7Ozs7Ozs7QUFhQSxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLG9CQUFuRTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICAgIEF1dGhvcjogUGFueWFcbiAgICBOYW1lOiBjb250YWN0LmpzXG4gICAgUHVycG9zZTogZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzXG4qL1xuXG5jb25zdCBjcmVhdGVDb250YWN0Q2FyZCA9IGNvbnRhY3RFbGVtZW50ID0+IHtcbiAgICByZXR1cm4gYDxzZWN0aW9uIGlkPVwiY29udGFjdENhcmRcIj48aDM+JHtjb250YWN0RWxlbWVudC5uYW1lfTwvaDM+XG4gICAgPGRpdj4ke2NvbnRhY3RFbGVtZW50LmFkZHJlc3N9PC9kaXY+XG4gICAgPGRpdj4ke2NvbnRhY3RFbGVtZW50LnBob25lfTwvZGl2PlxuICAgIDxidXR0b24gaWQ9XCJkZWxldGVidXR0b24tLSR7Y29udGFjdEVsZW1lbnQuaWR9XCI+ZGVsZXRlPC9idXR0b24+XG4gICAgPC9zZWN0aW9uPmA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250YWN0Q2FyZDsiLCIvKlxuICAgIEF1dGhvcjogUGFueWFcbiAgICBOYW1lOiBjb250YWN0Q29sbGVjdGlvbi5qc1xuICAgIFB1cnBvc2U6IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gYSBqc29uLXNlcnZlciBBUEksIGFuZCBzYXZlcyBuZXcgb25lcy5cbiovXG5cbmNvbnN0IEFQSSA9IHtcbiAgICBnZXRDb250YWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvY29udGFjdHNcIilcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcbiAgICB9LFxuICAgIGNyZWF0ZUNvbnRhY3RzOiBjb250YWN0T2JqZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L2NvbnRhY3RzXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0T2JqZWN0KVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuICAgIH0sXG4gICAgZGVsZXRlQ29udGFjdDogKGNvbnRhY3RJZCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9jb250YWN0cy8ke2NvbnRhY3RJZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgIH0pXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJOyIsIi8qXG5BdXRob3I6IFBhbnlhXG5OYW1lOiBjb250YWN0Rm9ybS5qc1xuUHVycG9zZTogbGlzdGVucyBmb3Igd2hlbiB0aGUgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLiBXaGVuIGl0IGlzIHRyaWdnZXJlZCwgYSBuZXcgY29udGFjdCBzaG91bGQgYmUgUE9TVGVkIHRvIHRoZSBBUEkuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cbiovXG5cbmltcG9ydCBBUEkgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIjtcbmltcG9ydCBjcmVhdGVDb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiO1xuXG5jb25zdCBjcmVhdGVDb250YWN0T2JqZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGNvbnRhY3RPYmplY3QubmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdE5hbWVcIikudmFsdWU7XG4gICAgY29udGFjdE9iamVjdC5hZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0QWRkcmVzc1wiKS52YWx1ZTtcbiAgICBjb250YWN0T2JqZWN0LnBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0UGhvbmVcIikudmFsdWU7XG4gICAgQVBJLmNyZWF0ZUNvbnRhY3RzKGNvbnRhY3RPYmplY3QpXG4gICAgICAgIC50aGVuKGNyZWF0ZUNvbnRhY3RMaXN0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbnRhY3RPYmplY3Q7IiwiLypcbiAgICBBdXRob3I6IFBhbnlhXG4gICAgTmFtZTogY29udGFjdExpc3QuanNcbiAgICBQdXJwb3NlOiBkaXNwbGF5cyBhbGwgY29udGFjdHMuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuICovXG5cbmltcG9ydCBjcmVhdGVDb250YWN0Q2FyZCBmcm9tIFwiLi9jb250YWN0LmpzXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCI7XG5cbmNvbnN0IGNyZWF0ZUNvbnRhY3RMaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdERpc3BsYXlcIik7XG4gICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgQVBJLmdldENvbnRhY3RzKClcbiAgICAudGhlbihjb250YWN0QXJyYXkgPT5cbiAgICAgICAgY29udGFjdEFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBsaXN0RWwuaW5uZXJIVE1MICs9IGNyZWF0ZUNvbnRhY3RDYXJkKGVsZW1lbnQpO1xuICAgICAgICB9KVxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250YWN0TGlzdDsiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCI7XG5pbXBvcnQgY3JlYXRlQ29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIjtcblxuY29uc3QgZGVsZXRlTWUgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0RGlzcGxheVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMF0gPT09IFwiZGVsZXRlYnV0dG9uXCIpIHtcbiAgICAgICAgICAgIEFQSS5kZWxldGVDb250YWN0KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKVxuICAgICAgICAgICAgLy8gTk9URSBUTyBTRUxGIHdoZW4gY2FsbGluZyBhIGZ1bmN0aW9uIHJlZmVyZW5jZSBpbiBhIC50aGVuIGRvbid0IHVzZSB0aGUgKCk/XG4gICAgICAgICAgICAudGhlbihjcmVhdGVDb250YWN0TGlzdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZU1lOyIsIi8qXG57XG4gICAgbmFtZTogbmFtZVxuICAgIGFkZHJlc3M6IGFkZHJlc3Mgd2l0aCBzdHJlZXQgY2l0eSBzdGF0ZSB6aXBcbiAgICBwaG9uZTogcGhvbmUgbnVtYmVyXG59XG4qL1xuXG5pbXBvcnQgY3JlYXRlQ29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3QuanNcIjtcbmltcG9ydCBjcmVhdGVDb250YWN0T2JqZWN0IGZyb20gXCIuL2NvbnRhY3RGb3JtLmpzXCI7XG5pbXBvcnQgZGVsZXRlTWUgZnJvbSBcIi4vZGVsZXRlQ29udGFjdFwiO1xuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkTmV3Q29udGFjdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlQ29udGFjdE9iamVjdCk7XG5jcmVhdGVDb250YWN0TGlzdCgpO1xuZGVsZXRlTWUoKTsiXX0=
