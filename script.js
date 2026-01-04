function showPage(pageId) {
  const sections = document.querySelectorAll("main section");
  const buttons = document.querySelectorAll("nav button");

  sections.forEach((section) => section.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(pageId).classList.add("active");

  const btn = Array.from(buttons).find((b) =>
    b.textContent.toLowerCase().includes(pageId)
  );
  if (btn) btn.classList.add("active");
}

let extraNodes = [];

// Ambil data dari localStorage saat halaman dibuka
function loadNodes() {
  const saved = localStorage.getItem("extraNodes");
  if (saved) {
    extraNodes = JSON.parse(saved);
    renderNodes();
  }
}

// Simpan ke localStorage
function saveNodes() {
  localStorage.setItem("extraNodes", JSON.stringify(extraNodes));
}

// Render node ke halaman
function renderNodes() {
  const container = document.getElementById("extraNodes");
  container.innerHTML = "";

  extraNodes.forEach((n) => {
    const div = document.createElement("div");
    div.className = "node extra-node";

    div.innerHTML = `
      <img src="images/default-node.jpg" />
      <span>${n.name}<br><small>(${n.role})</small></span>
    `;

    container.appendChild(div);
  });
}


// Tambah node baru
function addNode() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const parent = document.getElementById("parent").value;
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!name || !role || !file) {
    alert("Nama, peran, dan foto WAJIB diisi");
    return;
  }

  if (file.type !== "image/jpeg") {
    alert("Foto harus JPG");
    return;
  }

  if (file.size > 100 * 1024) {
    alert("Ukuran foto maksimal 100KB");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const newNode = {
      id: Date.now(),
      name,
      role,
      parent,
      image: reader.result // BASE64
    };

    let data = JSON.parse(localStorage.getItem("familyTree")) || [];
    data.push(newNode);
    localStorage.setItem("familyTree", JSON.stringify(data));

    alert("Node berhasil ditambahkan!");
    document.getElementById("familyForm").reset();
  };

  reader.readAsDataURL(file);
}

// Jalankan saat halaman dibuka
window.onload = loadNodes;

// ===== LEVEL 6 =====

// Jumlah node statis (tree utama Level 3)
const STATIC_NODE_COUNT = 7;

// Depth tree statis (hingga buyut)
const STATIC_TREE_DEPTH = 3;

// Update info X & Y
function updateTreeInfo() {
  const totalNodes = STATIC_NODE_COUNT + extraNodes.length;
  const depth = STATIC_TREE_DEPTH;

  const info = document.getElementById("treeInfo");
  if (!info) return;

  info.innerHTML = `
    <strong>Informasi Tree:</strong><br>
    Total Node (X): <b>${totalNodes}</b><br>
    Depth Tree (Y): <b>${depth}</b>
  `;
}

div.className = "node extra-node";

function deleteNode(id) {
  const node = document.getElementById(id);
  if (node) {
    if (confirm("Yakin mau hapus node ini?")) {
      node.remove();
    }
  }
}
