const btnTime = document.querySelector("th a");
const arrow = btnTime.querySelector("i");
const tableBody = document.querySelector("tbody");
const rows = [...document.querySelectorAll("tbody tr")];

let direction = false;

const objRows = rows.map((row) => {
  return {
    module: row.children[0].innerHTML,
    author: row.children[1].innerHTML,
    time: parseInt(row.children[2].innerHTML),
  };
});

const sortData = (objRows, direction) => {
  return objRows.sort((a, b) => {
    return direction ? a.time - b.time : b.time - a.time;
  });
};

const renderTable = (data) => {
  tableBody.innerHTML = "";

  data.forEach(({ module, author, time }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="border px-4 py-2">${module}</td>
        <td class="border px-4 py-2">${author}</td>
        <td class="border px-4 py-2">${timeFormat(time)}</td>
        </tr>`;
    tableBody.appendChild(tr);
  });
};

const timeFormat = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = (time % 3600) % 60;
  return `${hours}:${minutes}:${seconds}`;
};

const arrowDirection = (direction) => {
  arrow.classList.remove(`fa-caret-${direction ? "down" : "up"}`);
  arrow.classList.add(`fa-caret-${direction ? "up" : "down"}`);
};

const handleClick = () => {
  direction = !direction;
  renderTable(sortData(objRows, direction));
  arrowDirection(direction);
};

btnTime.addEventListener("click", handleClick);
