let randomLinks = JSON.parse(localStorage.getItem("randomLinks")) || [];
let customLists = JSON.parse(localStorage.getItem("customLists")) || {};

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

const customListsContainer = document.getElementById("custom-lists");
const addListBtn = document.getElementById("add-list-btn");
const newListNameInput = document.getElementById("new-list-name");

// ========== Render Functions ==========
function renderRandomLinks() {
  ulEl.innerHTML = "";
  randomLinks.forEach((link, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" class="link-checkbox" data-type="random" data-index="${index}">
            <a href="${link}" target="_blank">${link}</a>
            <button title="Delete" onclick="deleteRandomLink(${index})"><i class="fas fa-trash"></i></button>
        `;
    ulEl.appendChild(li);
  });
}

function renderCustomLists() {
  customListsContainer.innerHTML = "";
  for (let listName in customLists) {
    const listWrapper = document.createElement("div");
    listWrapper.className = "custom-list";

    const header = document.createElement("div");
    header.className = "list-header";

    header.innerHTML = `
            <details>
                <summary><strong>${listName}</strong></summary>
                <ul>
                    <ul>
                       ${customLists[listName]
                            .map(
                              (link, i) => `
                                  <li>
                                        <input type="checkbox" class="link-checkbox" data-type="${listName}" data-index="${i}">
                                              <a href="${link}" target="_blank">${link}</a>
                                      <button title="Delete" onclick="deleteCustomLink('${listName}', ${i})"><i class="fas fa-trash"></i></button>
                                 </li>
                             `
                       )
                       .join("")}
                </ul>

                </ul>
            </details>
            <div class="list-actions">
                <button onclick="openAllLinks('${listName}')">Open All</button>
                <button onclick="renameList('${listName}')">Rename</button>
                <button onclick="deleteList('${listName}')">Delete List</button>
                <button onclick="addToCustomListPrompt('${listName}')">Add Link</button>
            </div>
        `;

    listWrapper.appendChild(header);
    customListsContainer.appendChild(listWrapper);
  }
}

// ========== Random Links Logic ==========
inputBtn.addEventListener("click", () => {
  const value = inputEl.value.trim();
  if (value) {
    randomLinks.push(value);
    inputEl.value = "";
    localStorage.setItem("randomLinks", JSON.stringify(randomLinks));
    renderRandomLinks();
  }
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabUrl = tabs[0].url;
    randomLinks.push(tabUrl);
    localStorage.setItem("randomLinks", JSON.stringify(randomLinks));
    renderRandomLinks();
  });
});

deleteBtn.addEventListener("click", () => {
  if (confirm("Delete all random links?")) {
    randomLinks = [];
    localStorage.setItem("randomLinks", JSON.stringify(randomLinks));
    renderRandomLinks();
  }
});

function deleteRandomLink(index) {
  randomLinks.splice(index, 1);
  localStorage.setItem("randomLinks", JSON.stringify(randomLinks));
  renderRandomLinks();
}

// ========== Custom List Logic ==========
addListBtn.addEventListener("click", () => {
  const name = newListNameInput.value.trim();
  if (name && !customLists[name]) {
    customLists[name] = [];
    newListNameInput.value = "";
    saveAndRenderCustomLists();
  } else {
    alert("List already exists or name is empty.");
  }
});

function deleteCustomLink(listName, index) {
  customLists[listName].splice(index, 1);
  saveAndRenderCustomLists();
}

function addToCustomListPrompt(listName) {
  const url = prompt(`Add a link to "${listName}"`);
  if (url && url.trim()) {
    customLists[listName].push(url.trim());
    saveAndRenderCustomLists();
  }
}

function deleteList(listName) {
  if (confirm(`Delete entire list "${listName}"?`)) {
    delete customLists[listName];
    saveAndRenderCustomLists();
  }
}

function renameList(oldName) {
  const newName = prompt("Enter new list name:", oldName);
  if (newName && newName !== oldName) {
    if (customLists[newName]) {
      alert("List with that name already exists!");
    } else {
      customLists[newName] = customLists[oldName];
      delete customLists[oldName];
      saveAndRenderCustomLists();
    }
  }
}

function openAllLinks(listName) {
  customLists[listName].forEach((link) => {
    chrome.tabs.create({ url: link });
  });
}

function saveAndRenderCustomLists() {
  localStorage.setItem("customLists", JSON.stringify(customLists));
  renderCustomLists();
}

// ========== Initialize ==========
renderRandomLinks();
renderCustomLists();

// ========== Expose Globals ==========
window.deleteRandomLink = deleteRandomLink;
window.deleteCustomLink = deleteCustomLink;
window.openAllLinks = openAllLinks;
window.renameList = renameList;
window.deleteList = deleteList;
window.addToCustomListPrompt = addToCustomListPrompt;
