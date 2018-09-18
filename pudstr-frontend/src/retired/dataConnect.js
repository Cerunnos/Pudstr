const BASE_URL = 'http://localhost:3000';


userForm = document.getElementById('greenButton')
userForm.addEventListener('click', (event) => {
				event.preventDefault()
				userName = document.getElementById('userName')
				const submitVal = userName.value
		
				addNamePoints(submitVal, 0, '')
			})





let getAllUsers = () => {
	return fetch("http://localhost:3000/users")
					.then(res => res.json())
}



// this works for posting a new user
function addNamePoints(name, points = 0, favorites = '') {
    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
				'Content-Type': 'application/json',
    		'Accept': 'application/json'
      },
      body: JSON.stringify({
				points: points,
				name: name,
				favorites: favorites
      })
    })
    .then((res) => { return res.json() })
    .then(json => { console.log('Updated JSON:' + json)})
  }



	// console.log(getAllUsers());
	getAllUsers()
	.then(json => {
		 console.log(json)
	})
