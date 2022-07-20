/* dependencies */
const form = document.querySelector("form");
const btn = document.getElementById("btn");

[...document.querySelectorAll("tbody tr")].forEach(tr => {
  tr.addEventListener("click", function (e) {
    form.action = `/edit/${tr.id}`;
    btn.innerHTML = "Update";
    if (tr.id === e.target.id) {
      [...tr.children].forEach(td => {
        if (td.className === "taskname") {
          form[0].value = td.textContent;
        }
        if (td.className === "priority") {
          form[1].selectedIndex =
            td.textContent === "high"
              ? "1"
              : td.textContent === "medium"
              ? "2"
              : td.textContent === "low"
              ? "3"
              : 0;
        }
        if (td.className === "date") {
          form[2].value = new Date(td.textContent).toISOString().slice(0, 10);
        }
      });
    }
  });
});
