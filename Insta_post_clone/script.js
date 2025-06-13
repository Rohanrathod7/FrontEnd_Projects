
    const posts = [
      {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "https://i.pravatar.cc/40?img=33",
        post: "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
        comment: "just took a few mushrooms lol",
        likes: 21
      },
      {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "https://i.pravatar.cc/40?img=12",
        post: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
      },
      {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "https://i.pravatar.cc/40?img=18",
        post: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
      }
    ];

    const postsContainer = document.getElementById('posts');

    posts.forEach((post, index) => {
      const postEl = document.createElement('section');
      postEl.className = 'post';
      postEl.innerHTML = `
        <div class="user-info">
          <img src="${post.avatar}" alt="${post.name}">
          <div class="details">
            <strong>${post.name}</strong><br>
            <span>${post.location}</span>
          </div>
        </div>
        <img src="${post.post}" class="post-img" alt="Post Image" data-index="${index}">
        <div class="icons">
          <i class="fa-regular fa-heart like-icon" data-index="${index}"></i>
          <i class="fa-regular fa-comment"></i>
          <i class="fa-regular fa-paper-plane"></i>
        </div>
        <div class="likes" id="likes-${index}">
          ${post.likes},000 likes
        </div>
        <div class="comment">
          <strong>${post.username}</strong> ${post.comment}
        </div>
      `;
      postsContainer.appendChild(postEl);
    });

    function toggleLike(index) {
      const icon = document.querySelector(`.like-icon[data-index='${index}']`);
      const likesText = document.getElementById(`likes-${index}`);
      const liked = icon.classList.contains('fa-solid');

      if (liked) {
        posts[index].likes--;
        icon.classList.remove('fa-solid', 'liked');
        icon.classList.add('fa-regular');
      } else {
        posts[index].likes++;
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'liked');
      }

      likesText.textContent = `${posts[index].likes},000 likes`;
    }

    document.querySelectorAll('.post-img').forEach(img => {
      img.addEventListener('dblclick', () => {
        const idx = img.dataset.index;
        toggleLike(idx);
      });
    });

    document.querySelectorAll('.like-icon').forEach(icon => {
      icon.addEventListener('click', () => {
        const idx = icon.dataset.index;
        toggleLike(idx);
      });
    });
 