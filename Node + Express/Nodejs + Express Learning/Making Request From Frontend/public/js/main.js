const output = document.querySelector("#output");
const button = document.querySelector("#get-post-btn");

//Get and show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/quotes");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    output.innerHTML = "";

    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.textContent = post.quote;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", showPosts);
