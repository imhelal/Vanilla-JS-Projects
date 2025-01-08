import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, onValue, push, ref, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL: 'https://pwcartjs-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingTable = 'shopping_list'
const shoppingListInDB = ref(database, shoppingTable)

let inputField = document.getElementById('input-field')
let addButton  = document.getElementById('add-button')
let shoppingListEl = document.getElementById('cart-items')


addButton.addEventListener('click', ()=>{

	let itemToAdd = inputField.value

	if(itemToAdd.length > 0){

		push(shoppingListInDB, inputField.value)
		
		cleareInputField()

	}
	
})

// Fetch items
onValue(shoppingListInDB, (snapshot)=>{
	
	if(snapshot.exists()){

		let items = Object.entries(snapshot.val())

		if(items.length > 0){
			clearShoppingListEl() 
			items.forEach((item)=>{
				addItemToList(item)
			})
		}

	}else{
		shoppingListEl.innerHTML = "No items added... yet"
	}
	
})


// Cleare input 
function cleareInputField(){
	inputField.value = "";
}

// Add item to the list 
function addItemToList(item) {
	let itemID = item[0]
	let itemValue = item[1]

	let li = document.createElement('li')
	li.textContent = itemValue

	li.addEventListener('click', ()=>{
		removeItem(itemID)
	})

	shoppingListEl.append(li)
}

// Remove item
function removeItem(itemID) {
	let locationOfTheItem = ref(database, `${shoppingTable}/${itemID}`)
	remove(locationOfTheItem)
}


// Cleare shopping list 
function clearShoppingListEl() {
	shoppingListEl.innerHTML = ''
}

