document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const tanggal = document.getElementById("tanggal").value;
  const keterangan = document.getElementById("keterangan").value;
  const pemasukan = document.getElementById("pemasukan").value;
  const pengeluaran = document.getElementById("pengeluaran").value;

  await fetch("/api/keuangan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tanggal, keterangan, pemasukan, pengeluaran }),
  });

  loadData();
});

async function loadData() {
  const response = await fetch("/api/keuangan");
  const data = await response.json();

  const tbody = document.getElementById("data");
  tbody.innerHTML = data
    .map(
      (row) => `
      <tr>
        <td>${row.id}</td>
        <td>${row.tanggal}</td>
        <td>${row.keterangan}</td>
        <td>${row.pemasukan}</td>
        <td>${row.pengeluaran}</td>
        <td><button onclick="deleteData(${row.id})">Delete</button></td>
      </tr>
    `
    )
    .join("");
}

async function deleteData(id) {
  await fetch(`/api/keuangan/${id}`, { method: "DELETE" });
  loadData();
}

loadData();
