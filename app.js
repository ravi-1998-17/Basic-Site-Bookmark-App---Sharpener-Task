let editedSiteId = null;

function handleFromSubmit(evt) {
  evt.preventDefault();

  let name = evt.target.name.value;
  let url = evt.target.url.value;

  let obj = { name, url };

  axios
    .post(
      "https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks",
      obj
    )
    .then((res) => displayBookmark(res.data))
    .catch((err) => console.log(err));
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
  delBtn.addEventListener("click", () => deleteBookmark(data._id,  li));

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

function updateBookmark(data) {
  document.querySelector("#name").value = data.name;
  document.querySelector("#url").value = data.url;

  editedSiteId = data._id;

  axios
    .delete(
      `https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks/${editedSiteId}`
    )
    .then(() => {
      console.log("User Deleted for edit");
      editedSiteId = null;
    })
    .catch((err) => console.log(err));
}

function deleteBookmark(id, li) {
  axios
    .delete(
      `https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks/${id}`
    )
    .then(() => {
        li.remove();
    })
    .catch((err) => console.log(err));
}

window.addEventListener('DOMContentLoaded', () => {
    axios
      .get(
        `https://crudcrud.com/api/78c9fb4b483c4224aeb14e7df8e2a627/bookmarks/`
      )
      .then((res) => {
            for(let list of res.data){
                displayBookmark(list);
            }
      })
      .catch((err) => console.log(err));

})