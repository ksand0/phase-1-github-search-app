document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    form.addEventListener('submit', function(event) {
    //submit the input    
        event.preventDefault();
        const searchTerm = searchInput.value.trim(); 

        if(searchTerm) {
            fetch('https://api.github.com/search/users?q=${searchTerm}')
            .then(res => res.json())
            .then(data => displayUsers(data.items))
            .catch(error => console.log('Error', error))  
        }
    })

    function displayUsers(users) {
        userList.innerHTML = '';
        reposList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('li')
            userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50" height="50">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            userItem.addEventListener('click', () => fetchUserRepos(user.login));
            userList.appendChild(userItem)
        })
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(repos => displayRepos(repos))
        .catch(error => console.log('Error:', error))
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            `;
            reposList.appendChild(repoItem)
        })
    }
})