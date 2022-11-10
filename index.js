var arr = new Array(); // main array
let id = (id) => document.getElementById(id);

let firstName = id("firstName");
let lastName = id("lastName");
let address = id("address");
let selectDate = id("selectDate");
let gender = "";
let notes = id("floatingTextarea");
let form = id("form");
let table = id("table");
let RemoveBtn = id("removeBtn");
let errorMassage = document.getElementsByClassName("error");

//choose gender
let dropdownBtn = document.getElementById("dropdownBtn");
male.addEventListener("click", () => {
  gender = "male";
  dropdownBtn.innerText = "Male";
});
female.addEventListener("click", () => {
  gender = "female";
  dropdownBtn.innerText = "Female";
});

//submit button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  giveError(firstName, 0, "Write Your Name !!!");
  giveError(lastName, 1, "Write your Lastname !!!");
  giveError(address, 2, "Write your Address !!!");

  if (
    firstName.value.length == 0 ||
    lastName.value.length == 0 ||
    address.value.length == 0
  ) {
    RemoveBtn.style.visibility = "hidden";
    table.style.display = "none";
  } else {
    RemoveBtn.style.visibility = "visible";
    table.style.display = "table";
  }
  firstName.value = "";
  lastName.value = "";
  address.value = "";
  selectDate.value = "";
  gender = "";
  notes.value = "";
  dropdownBtn.innerText = "Choose Gender";
});
// error function
let giveError = (id, index, message) => {
  if (id.value.trim() === "") {
    errorMassage[index].innerHTML = message;
    id.style.border = "6px solid red";
  } else {
    errorMassage[index].innerHTML = "";
    id.style.border = "6px solid green";
  }
};
// remove all button
RemoveBtn.addEventListener("click", () => {
  if (confirm("are you sure to delete all rows?")) {
    localStorage.clear();
    location.reload();
  }
});
// remove button, for each element
const removeItem = (id) => {
  let items = JSON.parse(localStorage.getItem("localData"));

  items.forEach(function (item, index) {
    if (id === item.id) {
      if (confirm("Delete User?")) {
        items.splice(index, 1);
      }
    }
  });
  localStorage.setItem("localData", JSON.stringify(items));
  showData();
};
// add new data
const addData = () => {
  getData();

  let array = arr.map((item) => item.id);
  let max = Math.max(...array);
  let index = array.indexOf(max);
  let userID = index + 1;
  userID++;

  if (
    firstName.value.length == 0 ||
    lastName.value.length == 0 ||
    address.value.length == 0
  ) {
    arr.push({
      id: userID,
      fname: "none",
      lname: "none",
      address: "none",
      date: "none",
      gender: "none",
      notes: notes.value,
    });
  } else {
    arr.push({
      id: userID,
      fname: firstName.value,
      lname: lastName.value,
      address: address.value,
      date: selectDate.value,
      gender: gender,
      notes: notes.value,
    });
  }
  localStorage.setItem("localData", JSON.stringify(arr));
  showData();
};
// get data function
const getData = () => {
  let str = localStorage.getItem("localData");
  str != null ? (arr = JSON.parse(str)) : console.log();
};
// show data table
const showData = () => {
  getData();

  let x = table.rows.length;
  while (--x) {
    table.deleteRow(x);
  }
  arr.map((item) => {
    let index = item.id;
    let btnRemove = `
            <button onclick=showPopup(${index}) id="myBtn" type="button" class="btn btn-sm btn-outline-success">Notes <i class="fa">&#xf0f6;</i></button>
            <button onclick=removeItem(${index}) type="button" class="btn btn-sm btn-outline-danger">Remove <i class="fa">&#xf00d;</i></button>
        `;
    let r = table.insertRow();
    let cell1 = r.insertCell();
    let cell2 = r.insertCell();
    let cell3 = r.insertCell();
    let cell4 = r.insertCell();
    let cell5 = r.insertCell();
    let cell6 = r.insertCell();
    let cell7 = r.insertCell();

    cell1.innerHTML = item.id;
    cell2.innerHTML = item.fname;
    cell3.innerHTML = item.lname;
    cell4.innerHTML = item.address;
    cell5.innerHTML = item.date;
    cell6.innerHTML = item.gender;
    cell7.innerHTML = btnRemove;
  });
};
// popup function
const showPopup = (id) => {
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  let noteText = document.getElementById("noteText");

  modal.style.display = "block";
  arr.forEach(function (index) {
    if (id === index.id) {
      if (index.notes.length > 0) {
        noteText.innerHTML = index.notes;
      } else {
        noteText.innerHTML = "there is not any notes.";
      }
    }
  });
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

// dropdown gender
dropdownBtn.addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("show");
});

// close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
