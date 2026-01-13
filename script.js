/* ================= NAVIGATION ================= */
function showPage(id) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("onclick")?.includes(id)) {
      btn.classList.add("active");
    }
  });
}

/* ================= ADD NODE (TREE DINAMIS) ================= */
function addNode() {
  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const parentName = document.getElementById("parent").value.trim();
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!name || !role || !parentName || !file) {
    alert("Nama, peran, parent, dan foto WAJIB diisi!");
    return;
  }

  if (file.type !== "image/jpeg") {
    alert("Foto harus JPG");
    return;
  }

  // cari node parent berdasarkan NAMA
  const allNodes = document.querySelectorAll(".node-card");
  let parentNode = null;

  allNodes.forEach(node => {
    const nodeName = node.querySelector(".node-name")?.textContent.trim();
    if (nodeName === parentName) {
      parentNode = node;
    }
  });

  if (!parentNode) {
    alert("Parent tidak ditemukan! Pastikan nama persis sama.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const parentLi = parentNode.closest("li");

    let childUl = parentLi.querySelector(":scope > ul");
    if (!childUl) {
      childUl = document.createElement("ul");
      parentLi.appendChild(childUl);
    }

    const childId = "node_" + Date.now();

    const childLi = document.createElement("li");
    childLi.innerHTML = `
      <div class="node-card style-leaf" id="${childId}">
        <button class="delete-btn" onclick="deleteNode('${childId}')">✖</button>
        <img src="${reader.result}" class="node-img">
        <span class="node-name">${name}</span>
        <span class="node-role">${role}</span>
      </div>
    `;

    childUl.appendChild(childLi);

    alert("Node berhasil ditambahkan!");
    document.getElementById("familyForm").reset();
  };

  reader.readAsDataURL(file);
}

/* ================= DELETE NODE ================= */
function deleteNode(id) {
  const node = document.getElementById(id);
  if (!node) return;

  if (!confirm("Yakin ingin menghapus node ini beserta turunannya?")) return;

  const li = node.closest("li");
  if (li) {
    li.remove();
  } else {
    node.remove();
  }
}
