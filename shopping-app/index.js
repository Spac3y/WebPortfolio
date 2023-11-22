
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL: "https://soundwave-18a5e-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "time")

var input = document.getElementById("input-field")
var button = document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

function clearField(inputField) {
	inputField.value = ""
}

function addToShoppingList(list, value) {
	let itemID = value[0]
	let itemValue = value[1]

	let newEl = document.createElement('li')
	newEl.textContent = itemValue

	newEl.addEventListener("click", function() {
		let exactLocationOfItemInDB = ref(database, `time/${itemID}`)
		remove(exactLocationOfItemInDB)
	})

	list.append(newEl)
}

function clearShoppingList(list) {
	list.innerHTML = ""
}

button.addEventListener("click", function() {
	let inputValue = input.value

	push(shoppingListInDB, inputValue)
	
	clearField(input)

	// console.log(`${inputValue} added to database and to screen`)
})

onValue(shoppingListInDB, function(snapshot) {
	if(snapshot.exists()) {
		let itemsArray = Object.entries(snapshot.val())

		clearShoppingList(shoppingListEl)

		for(let i=0; i<itemsArray.length; i++) {
			let currentItem = itemsArray[i]

			addToShoppingList(shoppingListEl, currentItem)
		}
	} else {
		shoppingListEl.innerHTML = "No items here...Yet"
	}
})