document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
  
    let users = [];
  
    // Fetch users on load
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        users = data;
        renderUsers(users);
      })
      .catch(err => {
        userList.innerHTML = `<li>Error loading users.</li>`;
        console.error(err);
      });
  
    // Render users
    function renderUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        li.addEventListener('click', () => fetchUserPosts(user.id));
        userList.appendChild(li);
      });
    }
  
    // Filter users
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(query)
      );
      renderUsers(filtered);
    });
  
    // Fetch user posts
    function fetchUserPosts(userId) {
      showModal();
      modalBody.innerHTML = 'Loading...';
  
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => res.json())
        .then(posts => {
          if (posts.length === 0) {
            modalBody.innerHTML = '<p>No posts found.</p>';
          } else {
            modalBody.innerHTML = '<ul>' +
              posts.map(post => `<li>${post.title}</li>`).join('') +
              '</ul>';
          }
        })
        .catch(err => {
          modalBody.innerHTML = '<p>Error loading posts.</p>';
          console.error(err);
        });
    }
  
    // Show/hide modal
    function showModal() {
      modal.classList.remove('hidden');
    }
  
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // Optional: Close modal on outside click
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  