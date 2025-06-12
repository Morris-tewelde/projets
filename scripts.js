const projects = [
  {
    name: "PLAN MINUTE BOLBEC ZA BACLAIR",
    city: "Bolbec",
    date: "05/2025",
    status: "actif",
    pdf: "PLAN MINUTE BOLBEC ZA BACLAIR.pdf"
  },
  {
    name: "PLAN MINUTE FRATACCI",
    city: "Le Havre",
    date: "06/2024",
    status: "termine",
    pdf: "PLAN MINUTE FRATACCI.pdf"
  },
  {
    name: "PLAN MINUTE RUE DUGUY TROUIN",
    city: "Le Havre",
    date: "01/2025",
    status: "actif",
    pdf: "PLAN MINUTE RUE DUGUY TROUIN.pdf"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#pdfTable tbody");
  projects.forEach(project => {
    const row = document.createElement("tr");
    row.setAttribute("data-pdf", project.pdf);

    row.innerHTML = `
      <td>${project.name}</td>
      <td>${project.city}</td>
      <td>${project.date}</td>
      <td><span class="${project.status === 'actif' ? 'status-active' : 'status-completed'}">${project.status}</span></td>
    `;

    row.addEventListener("click", () => {
      window.open(`sources/${encodeURIComponent(project.pdf)}`, "_blank");
    });

    tbody.appendChild(row);
  });
});

function sortTable(columnIndex) {
  const table = document.getElementById("pdfTable");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const sortDirection = table.getAttribute("data-sort-dir") !== "desc" ? "desc" : "asc";
  table.setAttribute("data-sort-dir", sortDirection);

  rows.sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent.trim();
    const bValue = b.cells[columnIndex].textContent.trim();

    if (columnIndex === 2) {
      const [aMonth, aYear] = aValue.split("/").map(Number);
      const [bMonth, bYear] = bValue.split("/").map(Number);
      const aDate = new Date(aYear, aMonth - 1);
      const bDate = new Date(bYear, bMonth - 1);
      return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
    }

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue, "fr", { sensitivity: "base" })
      : bValue.localeCompare(aValue, "fr", { sensitivity: "base" });
  });

  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}

function searchTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("pdfTable");
  const tr = table.querySelectorAll("tbody tr");

  tr.forEach(row => {
    let found = false;
    const cells = row.querySelectorAll("td");
    for (let i = 0; i < cells.length - 1; i++) {
      if (cells[i].textContent.toUpperCase().includes(filter)) {
        found = true;
        break;
      }
    }
    row.style.display = found ? "" : "none";
  });
}
