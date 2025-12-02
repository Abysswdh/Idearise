document.addEventListener("DOMContentLoaded", () => {
  const comments = [
    {
      id: 1,
      text: "Ide apikasi yang menarik, saya akan mendukungnya.",
      likes: 14,
      time: getRandomPastDate(30),
      user: {
        name: "Abyasa Wedha",
        avatar: "/Assets/images/Profile_Pictures/1.jpg",
      },
      replies: [],
    },
    {
      id: 2,
      text: "hmm menarik, jika aplikasi ini benar-benar terwujud tentunya kita akan mudah mengelola keuangan kita.",
      likes: 20,
      time: getRandomPastDate(30),
      user: {
        name: "Satria Pratama",
        avatar: "/Assets/images/Profile_Pictures/1.jpg",
      },
      replies: [],
    },
  ];

  const currentUser = {
    id: 3,
    name: "Tamu",
    avatar: "/Assets/images/Profile_Pictures/1.jpg",
  };

  const likesGiven = new Set();
  let userHasCommented = false;

  const commentInput = document.getElementById("comment-input");
  const postButton = document.getElementById("post-button");
  const sortButtons = document.querySelectorAll(".sort-button");
  const commentsContainer = document.getElementById("comments");
  const commentTitle = document.getElementById("comment-title");

  postButton.addEventListener("click", () => {
    if (userHasCommented) {
      alert("Anda hanya dapat menambahkan satu komentar.");
      return;
    }

    const text = commentInput.value;
    if (text) {
      const comment = {
        id: Date.now(),
        text,
        likes: 0,
        time: new Date(),
        user: currentUser,
        replies: [],
      };
      comments.push(comment);
      renderComments(comments);
      commentInput.value = "";
      userHasCommented = true;
    }
  });

  sortButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const sortType = event.target.getAttribute("data-sort");
      sortComments(sortType);
      renderComments(comments);
      updateSortButtonStyles(event.target);
    });
  });

  function sortComments(type) {
    comments.sort((a, b) => {
      if (type === "latest") return b.time - a.time;
      if (type === "oldest") return a.time - b.time;
      if (type === "mostLiked") return b.likes - a.likes;
      return 0;
    });
  }

  function renderComments(comments) {
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      commentsContainer.appendChild(commentElement);
    });
    updateCommentTitle(comments.length);
  }

  function updateCommentTitle(count) {
    commentTitle.textContent = `${count} Komentar`;
  }

  function createCommentElement(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const avatar = document.createElement("img");
    avatar.src = comment.user.avatar;

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("comment-content");

    const userInfo = document.createElement("p");
    userInfo.textContent = `${comment.user.name} · ${getRelativeTime(
      comment.time
    )}`;

    const text = document.createElement("p");
    text.textContent = comment.text;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("comment-actions");

    const likeButton = document.createElement("button");

    likeButton.innerHTML = `❤️ ${comment.likes} Disukai`;
    likeButton.addEventListener("click", () => {
      if (!likesGiven.has(comment.id)) {
        comment.likes++;
        likeButton.innerHTML = `❤️ ${comment.likes} Disukai`;
        likesGiven.add(comment.id);
      } else {
        comment.likes--;
        likeButton.innerHTML = `❤️ ${comment.likes} Disukai`;
        likesGiven.delete(comment.id);
      }
    });

    const shareButton = document.createElement("button");
    shareButton.innerHTML = "➢ Bagikan";

    actionsDiv.appendChild(likeButton);
    actionsDiv.appendChild(shareButton);

    const repliesDiv = document.createElement("div");
    repliesDiv.classList.add("replies");
    comment.replies.forEach((reply) => {
      const replyElement = createCommentElement(reply);
      repliesDiv.appendChild(replyElement);
    });

    contentDiv.appendChild(userInfo);
    contentDiv.appendChild(text);
    contentDiv.appendChild(actionsDiv);
    contentDiv.appendChild(repliesDiv);

    commentDiv.appendChild(avatar);
    commentDiv.appendChild(contentDiv);

    return commentDiv;
  }

  function getRelativeTime(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) return `${days} Hari yang lalu`;
    if (days === 1) return "1 Hari yang lalu";
    if (hours > 1) return `${hours} Jam yang lalu`;
    if (hours === 1) return "1 Jam yang lalu";
    if (minutes > 1) return `${minutes} Menit yang lalu`;
    if (minutes === 1) return "1 Menit yang lalu";
    return "Baru";
  }

  function getRandomPastDate(daysAgo) {
    const now = new Date();
    const pastDate = new Date(
      now.getTime() - Math.random() * daysAgo * 24 * 60 * 60 * 1000
    );
    return pastDate;
  }

  function updateSortButtonStyles(selectedButton) {
    sortButtons.forEach((button) => {
      if (button === selectedButton) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  renderComments(comments);
});
