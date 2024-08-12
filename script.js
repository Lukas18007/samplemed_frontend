document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');

    async function loadPosts() {
        try {
            const response = await fetch('http://localhost:8765/api/posts.json');
            const data = await response.json();

            postsContainer.innerHTML = '';
            const posts = data.posts;

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const title = document.createElement('h2');
                title.textContent = post.title;

                const body = document.createElement('p');
                body.textContent = post.body;

                const created = document.createElement('time');
                created.textContent = new Date(post.created).toLocaleString();

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.addEventListener('click', function() {
                    deletePost(post.id);
                });

                postElement.appendChild(title);
                postElement.appendChild(body);
                postElement.appendChild(created);
                postElement.appendChild(deleteButton);

                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsContainer.textContent = 'Posts não encontrados.';
        }
    }

    async function deletePost(postId) {
        try {
            const response = await fetch(`http://localhost:8765/api/posts/${postId}.json`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Postagem deletada com sucesso!');
                loadPosts();
            } else {
                alert('Falha ao deletar postagem');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Falha ao deletar postagem');
        }
    }

    loadPosts();
});
