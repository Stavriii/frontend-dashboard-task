// Global variables for elements
const userListElement = document.getElementById('userList');
const userSearchElement = document.getElementById('userSearch');
const loadingElement = document.getElementById('loading');
const postModal = document.getElementById('postModal');
const postListElement = document.getElementById('postList');
const closeModalButton = document.getElementById('closeModal');

// Fetch users from the API
function fetchUsers() {
    loadingElement.style.display = 'block'; // Show loading spinner
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            loadingElement.style.display = 'none'; // Hide loading spinner
            displayUsers(users);
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            alert('Error fetching users: ' + error.message);
        });
}

// Display users in the UI
function displayUsers(users) {
    userListElement.innerHTML = ''; // Clear previous results
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
        userDiv.addEventListener('click', () => showUserPosts(user.id));
        userListElement.appendChild(userDiv);
    });
}

// Show posts of a selected user in the modal
function showUserPosts(userId) {
    postModal.style.display = 'flex'; // Show the modal
    postListElement.innerHTML = ''; // Clear previous posts

    // Fetch the posts for the selected user
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            // Loop through each post and display the title and body
            posts.forEach(post => {
                const postItem = document.createElement('li');
                
                // Display the title and body of the post
                postItem.innerHTML = `
                    <strong>${post.title}</strong>
                    <p>${post.body}</p>
                `;
                postListElement.appendChild(postItem);
            });
        })
        .catch(error => {
            alert('Error fetching posts: ' + error.message);
        });
}

// Close the modal when the close button is clicked
closeModalButton.addEventListener('click', () => {
    postModal.style.display = 'none';
});

// Filter users based on search input
userSearchElement.addEventListener('input', function () {
    const searchTerm = userSearchElement.value.toLowerCase();
    const userItems = document.querySelectorAll('.user');
    userItems.forEach(userItem => {
        const userName = userItem.querySelector('strong').textContent.toLowerCase();
        if (userName.includes(searchTerm)) {
            userItem.style.display = 'block';
        } else {
            userItem.style.display = 'none';
        }
    });
});

// Initialize the app by fetching users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
