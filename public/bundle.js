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
  return `<section><h3>${contactElement.name}</h3>
    <div>${contactElement.address}</div>
    <div>${contactElement.phone}</div>
    </section>`;
};

var _default = createContactCard;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContacts = exports.getContacts = void 0;

/*
    Author: Panya
    Name: contactCollection.js
    Purpose: loads existing contacts from a json-server API, and saves new ones.
*/
const getContacts = () => {
  return fetch("http://127.0.0.1:8088/contacts").then(res => res.json());
};

exports.getContacts = getContacts;

const createContacts = contactObject => {
  return fetch("http://127.0.0.1:8088/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactObject)
  }).then(res => res.json());
};

exports.createContacts = createContacts;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Panya
    Name: contactForm.js
    Purpose: listens for when the submit button is pressed. When it is triggered, a new contact should be POSTed to the API. It should import the ContactCollection component.
*/
const createContactObject = () => {
  document.querySelector("#addNewContact").addEventListener("click", () => {
    const name = document.querySelector("#contactName").value;
    const address = document.querySelector("#contactAddress").value;
    const phone = document.querySelector("#contactPhone").value;
    const contactObject = Object.create(null);
    contactObject.name = name;
    contactObject.address = address;
    contactObject.phone = phone;
    console.log(contactObject);
    (0, _contactCollection.default)(contactObject);
  });
};

var _default = createContactObject;
exports.default = _default;

},{"./contactCollection.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Panya
    Name: contactList.js
    Purpose: displays all contacts. It should import the Contact component and the ContactCollection component.
 */
const createContactList = () => {
  const listEl = document.querySelector("#contactDisplay");
  (0, _contactCollection.default)().then(contactArray.forEach(element => {
    listEl.innerHTML += (0, _contact.default)(element);
  }));
};

var _default = createContactList;
exports.default = _default;

},{"./contact.js":1,"./contactCollection.js":2}],5:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactForm = _interopRequireDefault(require("./contactForm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
{
    name: name
    address: address with street city state zip
    phone: phone number
}
*/
//createContactList();
(0, _contactForm.default)();

},{"./contactForm.js":3,"./contactList.js":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7O0FBTUEsTUFBTSxpQkFBaUIsR0FBRyxjQUFjLElBQUk7QUFDeEMsU0FBUSxnQkFBZSxjQUFjLENBQUMsSUFBSztXQUNwQyxjQUFjLENBQUMsT0FBUTtXQUN2QixjQUFjLENBQUMsS0FBTTtlQUY1QjtBQUlILENBTEQ7O2VBT2UsaUI7Ozs7Ozs7Ozs7O0FDYmY7Ozs7O0FBTUEsTUFBTSxXQUFXLEdBQUcsTUFBTTtBQUN0QixTQUFPLEtBQUssQ0FBQyxnQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQURWLENBQVA7QUFFSCxDQUhEOzs7O0FBS0EsTUFBTSxjQUFjLEdBQUksYUFBRCxJQUFtQjtBQUN0QyxTQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUMzQyxJQUFBLE1BQU0sRUFBRSxNQURtQztBQUUzQyxJQUFBLE9BQU8sRUFBRTtBQUNMLHNCQUFnQjtBQURYLEtBRmtDO0FBSzNDLElBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUxxQyxHQUFuQyxDQUFMLENBT0YsSUFQRSxDQU9HLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBWLENBQVA7QUFRSCxDQVREOzs7Ozs7Ozs7Ozs7QUNMQTs7OztBQU5BOzs7OztBQVFBLE1BQU0sbUJBQW1CLEdBQUcsTUFBTTtBQUM5QixFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxnQkFBekMsQ0FBMEQsT0FBMUQsRUFBbUUsTUFBTTtBQUNyRSxVQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxLQUFwRDtBQUNBLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixFQUEwQyxLQUExRDtBQUNBLFVBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLEtBQXREO0FBQ0EsVUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkLENBQXRCO0FBQ0EsSUFBQSxhQUFhLENBQUMsSUFBZCxHQUFxQixJQUFyQjtBQUNBLElBQUEsYUFBYSxDQUFDLE9BQWQsR0FBd0IsT0FBeEI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxLQUFkLEdBQXNCLEtBQXRCO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGFBQVo7QUFDQSxvQ0FBZSxhQUFmO0FBQ0gsR0FWRDtBQVdILENBWkQ7O2VBY2UsbUI7Ozs7Ozs7Ozs7O0FDaEJmOztBQUNBOzs7O0FBUEE7Ozs7O0FBU0EsTUFBTSxpQkFBaUIsR0FBRyxNQUFNO0FBQzVCLFFBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixDQUFmO0FBQ0Esb0NBQWMsSUFBZCxDQUNJLFlBQVksQ0FBQyxPQUFiLENBQXFCLE9BQU8sSUFBSTtBQUM1QixJQUFBLE1BQU0sQ0FBQyxTQUFQLElBQW9CLHNCQUFrQixPQUFsQixDQUFwQjtBQUNILEdBRkQsQ0FESjtBQUtILENBUEQ7O2VBU2UsaUI7Ozs7OztBQ1ZmOztBQUNBOzs7O0FBVEE7Ozs7Ozs7QUFXQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbiAgICBBdXRob3I6IFBhbnlhXG4gICAgTmFtZTogY29udGFjdC5qc1xuICAgIFB1cnBvc2U6IGRpc3BsYXlzIGEgcGVyc29uJ3MgbmFtZSwgcGhvbmUgbnVtYmVyLCBhbmQgYWRkcmVzc1xuKi9cblxuY29uc3QgY3JlYXRlQ29udGFjdENhcmQgPSBjb250YWN0RWxlbWVudCA9PiB7XG4gICAgcmV0dXJuIGA8c2VjdGlvbj48aDM+JHtjb250YWN0RWxlbWVudC5uYW1lfTwvaDM+XG4gICAgPGRpdj4ke2NvbnRhY3RFbGVtZW50LmFkZHJlc3N9PC9kaXY+XG4gICAgPGRpdj4ke2NvbnRhY3RFbGVtZW50LnBob25lfTwvZGl2PlxuICAgIDwvc2VjdGlvbj5gO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29udGFjdENhcmQ7IiwiLypcbiAgICBBdXRob3I6IFBhbnlhXG4gICAgTmFtZTogY29udGFjdENvbGxlY3Rpb24uanNcbiAgICBQdXJwb3NlOiBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIGEganNvbi1zZXJ2ZXIgQVBJLCBhbmQgc2F2ZXMgbmV3IG9uZXMuXG4qL1xuXG5jb25zdCBnZXRDb250YWN0cyA9ICgpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvY29udGFjdHNcIilcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xufTtcblxuY29uc3QgY3JlYXRlQ29udGFjdHMgPSAoY29udGFjdE9iamVjdCkgPT4ge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9jb250YWN0c1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXG4gICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xufTtcblxuZXhwb3J0IHsgZ2V0Q29udGFjdHMsIGNyZWF0ZUNvbnRhY3RzIH07IiwiLypcbiAgICBBdXRob3I6IFBhbnlhXG4gICAgTmFtZTogY29udGFjdEZvcm0uanNcbiAgICBQdXJwb3NlOiBsaXN0ZW5zIGZvciB3aGVuIHRoZSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQuIFdoZW4gaXQgaXMgdHJpZ2dlcmVkLCBhIG5ldyBjb250YWN0IHNob3VsZCBiZSBQT1NUZWQgdG8gdGhlIEFQSS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuKi9cblxuaW1wb3J0IGNyZWF0ZUNvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uLmpzXCI7XG5cbmNvbnN0IGNyZWF0ZUNvbnRhY3RPYmplY3QgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGROZXdDb250YWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3ROYW1lXCIpLnZhbHVlO1xuICAgICAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0QWRkcmVzc1wiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RQaG9uZVwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGNvbnRhY3RPYmplY3QubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnRhY3RPYmplY3QuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIGNvbnRhY3RPYmplY3QucGhvbmUgPSBwaG9uZTtcbiAgICAgICAgY29uc29sZS5sb2coY29udGFjdE9iamVjdCk7XG4gICAgICAgIGNyZWF0ZUNvbnRhY3RzKGNvbnRhY3RPYmplY3QpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29udGFjdE9iamVjdDsiLCIvKlxuICAgIEF1dGhvcjogUGFueWFcbiAgICBOYW1lOiBjb250YWN0TGlzdC5qc1xuICAgIFB1cnBvc2U6IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUNvbnRhY3RDYXJkIGZyb20gXCIuL2NvbnRhY3QuanNcIjtcbmltcG9ydCBnZXRDb250YWN0cyBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvbi5qc1wiO1xuXG5jb25zdCBjcmVhdGVDb250YWN0TGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3REaXNwbGF5XCIpO1xuICAgIGdldENvbnRhY3RzKCkudGhlbihcbiAgICAgICAgY29udGFjdEFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBsaXN0RWwuaW5uZXJIVE1MICs9IGNyZWF0ZUNvbnRhY3RDYXJkKGVsZW1lbnQpO1xuICAgICAgICB9KVxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250YWN0TGlzdDsiLCIvKlxue1xuICAgIG5hbWU6IG5hbWVcbiAgICBhZGRyZXNzOiBhZGRyZXNzIHdpdGggc3RyZWV0IGNpdHkgc3RhdGUgemlwXG4gICAgcGhvbmU6IHBob25lIG51bWJlclxufVxuKi9cblxuaW1wb3J0IGNyZWF0ZUNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0LmpzXCI7XG5pbXBvcnQgY3JlYXRlQ29udGFjdE9iamVjdCBmcm9tIFwiLi9jb250YWN0Rm9ybS5qc1wiO1xuXG4vL2NyZWF0ZUNvbnRhY3RMaXN0KCk7XG5jcmVhdGVDb250YWN0T2JqZWN0KCk7Il19
