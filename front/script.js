document.getElementById('display').addEventListener('click', () => {
    const foodDataDiv = document.getElementById('food-data');
    foodDataDiv.classList.toggle('hide');

    // Fetch and display food data when showing the container
    if (!foodDataDiv.classList.contains('hide')) {
        fetchFoodData();
    }
});

// Function to fetch and display all food items
function fetchFoodData() {
    fetch('http://localhost:8000/food')
        .then(res => res.json())
        .then(data => {
            const food_container = document.getElementById('food-data');
            food_container.innerHTML = ''; // Clear existing content

            data.forEach(element => {
                const data_div = document.createElement('div');
                data_div.className = 'food-item';

                data_div.innerHTML = `
                    <h2>Food Name: ${element.foodName}</h2>
                    <button class="edit-btn" data-id="${element._id}">Edit</button>
                    <button class="delete-btn" data-id="${element._id}">Delete</button>
                    <p><strong>Food Group:</strong> ${element.foodGroup}</p>
                    <p><strong>Description:</strong> ${element.description}</p>
                    <p><strong>Calories:</strong> ${element.nutritionalInformation.calories} kcal</p>
                    <p><strong>Proteins:</strong> ${element.nutritionalInformation.proteins} g</p>
                    <p><strong>Fats:</strong> ${element.nutritionalInformation.fats} g</p>
                    <p><strong>Carbohydrates:</strong> ${element.nutritionalInformation.carbohydrates} g</p>
                    <p><strong>Sodium:</strong> ${element.nutritionalInformation.sodium} mg</p>
                    <p><strong>Cholesterol:</strong> ${element.nutritionalInformation.cholestrol} mg</p>
                    <p><strong>Serving Size:</strong> ${element.servingSize} g</p>
                    <p><strong>Allergens:</strong> ${element.allergens.join(', ')}</p>
                    <p><strong>Ingredients:</strong> ${element.ingredients.join(', ')}</p>
                    <p><strong>Preparation Methods:</strong> ${element.preparationMethods.join(', ')}</p>
                    <p><strong>Certifications:</strong> ${element.certifications}</p>
                    <p><strong>Country of Origin:</strong> ${element.countryOrigin}</p>
                    <p><strong>Brand:</strong> ${element.Brand}</p>
                    <p><strong>Dietary Restrictions:</strong> ${element.DietaryRestritctions.join(', ')}</p>
                `;

                food_container.appendChild(data_div);
            });

            // Add event listeners for edit and delete buttons
            const editButtons = document.querySelectorAll('.edit-btn');
            const deleteButtons = document.querySelectorAll('.delete-btn');

            editButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const foodId = button.getAttribute('data-id');
                    editFood(foodId);
                });
            });

            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const foodId = button.getAttribute('data-id');
                    deleteFood(foodId);
                });
            });
        })
        .catch(e => {
            console.log(e);
        });
}

// Function to handle editing a food item
function editFood(foodId) {
    // Fetch the current food item data
    fetch(`http://localhost:8000/food/${foodId}`)
        .then(res => res.json())
        .then(food => {
            // Create a form to edit the food item
            const formHTML = `
                <form id="edit-form">
                    <h2>Edit Food Item</h2>
                    <label>Food Name: <input type="text" name="foodName" value="${food.foodName}" required></label>
                    <label>Food Group: <input type="text" name="foodGroup" value="${food.foodGroup}" required></label>
                    <label>Description: <textarea name="description">${food.description}</textarea></label>
                    <label>Calories: <input type="number" name="calories" value="${food.nutritionalInformation.calories}" required></label>
                    <label>Proteins: <input type="number" name="proteins" value="${food.nutritionalInformation.proteins}" required></label>
                    <label>Fats: <input type="number" name="fats" value="${food.nutritionalInformation.fats}" required></label>
                    <label>Carbohydrates: <input type="number" name="carbohydrates" value="${food.nutritionalInformation.carbohydrates}" required></label>
                    <label>Sodium: <input type="number" name="sodium" value="${food.nutritionalInformation.sodium}" required></label>
                    <label>Cholesterol: <input type="number" name="cholesterol" value="${food.nutritionalInformation.cholestrol}" required></label>
                    <label>Serving Size: <input type="number" name="servingSize" value="${food.servingSize}" required></label>
                    <label>Allergens: <input type="text" name="allergens" value="${food.allergens.join(', ')}"></label>
                    <label>Ingredients: <input type="text" name="ingredients" value="${food.ingredients.join(', ')}"></label>
                    <label>Preparation Methods: <input type="text" name="preparationMethods" value="${food.preparationMethods.join(', ')}"></label>
                    <label>Certifications: <input type="text" name="certifications" value="${food.certifications}"></label>
                    <label>Country of Origin: <input type="text" name="countryOrigin" value="${food.countryOrigin}"></label>
                    <label>Brand: <input type="text" name="brand" value="${food.Brand}"></label>
                    <label>Dietary Restrictions: <input type="text" name="dietaryRestrictions" value="${food.DietaryRestritctions.join(', ')}"></label>
                    <button type="submit">Update Food Item</button>
                    <button type="button" id="cancel-edit">Cancel</button>
                </form>
            `;

            const food_container = document.getElementById('food-data');
            food_container.innerHTML = formHTML; // Replace food items with the form

            // Handle form submission
            document.getElementById('edit-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                    foodName: formData.get('foodName'),
                    foodGroup: formData.get('foodGroup'),
                    description: formData.get('description'),
                    nutritionalInformation: {
                        calories: Number(formData.get('calories')),
                        proteins: Number(formData.get('proteins')),
                        fats: Number(formData.get('fats')),
                        carbohydrates: Number(formData.get('carbohydrates')),
                        sodium: Number(formData.get('sodium')),
                        cholestrol: Number(formData.get('cholesterol')),
                    },
                    servingSize: Number(formData.get('servingSize')),
                    allergens: formData.get('allergens').split(',').map(item => item.trim()),
                    ingredients: formData.get('ingredients').split(',').map(item => item.trim()),
                    preparationMethods: formData.get('preparationMethods').split(',').map(item => item.trim()),
                    certifications: formData.get('certifications'),
                    countryOrigin: formData.get('countryOrigin'),
                    Brand: formData.get('brand'),
                    DietaryRestritctions: formData.get('dietaryRestrictions').split(',').map(item => item.trim()),
                };

                // Update the food item using the PUT method
                fetch(`http://localhost:8000/food/${foodId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                })
                .then(res => {
                    if (res.ok) {
                        alert('Food item updated successfully.');
                        fetchFoodData(); // Refresh the displayed data
                    } else {
                        alert('Failed to update food item.');
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            });

            // Handle cancel edit
            document.getElementById('cancel-edit').addEventListener('click', () => {
                fetchFoodData(); // Refresh the displayed data
            });
        })
        .catch(e => {
            console.log(e);
        });
}

// Function to handle deleting a food item
function deleteFood(foodId) {
    fetch(`http://localhost:8000/food/${foodId}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            alert(`Food item with ID ${foodId} deleted successfully.`);
            fetchFoodData(); // Refresh the displayed data
        } else {
            alert('Failed to delete food item.');
        }
    })
    .catch(e => {
        console.log(e);
    });
}

document.getElementById('foodForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const foodItem = {
        foodName: document.getElementById('foodName').value,
        foodGroup: document.getElementById('foodGroup').value,
        description: document.getElementById('description').value,
        nutritionalInformation: {
            calories: Number(document.getElementById('calories').value),
            proteins: Number(document.getElementById('proteins').value),
            fats: Number(document.getElementById('fats').value),
            carbohydrates: Number(document.getElementById('carbohydrates').value),
            sodium: Number(document.getElementById('sodium').value),
            cholestrol: Number(document.getElementById('cholesterol').value),
        },
        servingSize: Number(document.getElementById('servingSize').value),
        allergens: document.getElementById('allergens').value.split(',').map(item => item.trim()),
        ingredients: document.getElementById('ingredients').value.split(',').map(item => item.trim()),
        preparationMethods: document.getElementById('preparationMethods').value.split(',').map(item => item.trim()),
        certifications: document.getElementById('certifications').value,
        countryOrigin: document.getElementById('countryOrigin').value,
        Brand: document.getElementById('brand').value,
        DietaryRestritctions: document.getElementById('dietaryRestrictions').value.split(',').map(item => item.trim()),
    };

    fetch('http://localhost:8000/food', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodItem),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById('foodForm').reset(); // Reset the form
        fetchFoodData();
        document.getElementById('error-message').textContent = ''; // Clear error message
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Error adding food item. Please try again.'; // Show error message
    });
});
