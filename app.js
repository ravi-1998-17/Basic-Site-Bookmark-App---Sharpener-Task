let editedSiteId = null;

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = evt.target.name.value;
  let url = evt.target.url.value;

  let obj = { name, url };

  if (editedSiteId) {
    axios
      .put(
        `https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks/${editedSiteId}`,
        obj
      )
      .then(() => {
        refreshBookmarks();
        evt.target.name.value = "";
        evt.target.url.value = "";
        editedSiteId = null;
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .post(
        "https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks",
        obj
      )
      .then((res) => {
        console.log("POST success:", res.data);
        displayBookmark(res.data);
        evt.target.name.value = "";
        evt.target.url.value = "";
      })
      .catch((err) => console.log(err));
  }
}

function displayBookmark(data) {
  let ul = document.querySelector("#site-list");
  let li = document.createElement("li");

  li.textContent = `${data.name} - ${data.url}`;

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => updateBookmark(data));

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => deleteBookmark(data._id, li));

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

function updateBookmark(data) {
  document.querySelector("#name").value = data.name;
  document.querySelector("#url").value = data.url;

  editedSiteId = data._id;
}

function deleteBookmark(id, li) {
  axios
    .delete(
      `https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks/${id}`
    )
    .then(() => {
      // Remove the list item from the DOM
      li.remove();
      console.log(`Bookmark with id ${id} deleted successfully.`);
    })
    .catch((err) => {
      console.error(`Failed to delete bookmark with id ${id}:`, err);
      alert("Failed to delete bookmark. Please try again.");
    });
}

function refreshBookmarks() {
  axios
    .get(`https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks/`)
    .then((res) => {
      let ul = document.querySelector("#site-list");
      ul.innerHTML = "";
      for (let list of res.data) {
        displayBookmark(list);
      }
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", refreshBookmarks);
