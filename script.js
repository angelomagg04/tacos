const protein = document.getElementById("protein");
const salsa = document.getElementById("salsa");
const tops = document.getElementById("toppings");
const finalTaco = document.getElementById("finalTaco");
const form = document.getElementById("taco-form"); 
const leng= document.getElementById("leng");
let url = "https://mocki.io/v1/bfb40168-1a2f-4324-aa8a-611ab475ab5a";

document.addEventListener("DOMContentLoaded", function () {
  getProteins();
});

leng.addEventListener("change", function () {
  if(leng.value=="EN"){
    url = "https://mocki.io/v1/bfb40168-1a2f-4324-aa8a-611ab475ab5a";
    console.log("English");
  }
  else if(leng.value=="IT"){
    url = "https://mocki.io/v1/79f87e5d-b34a-4dba-b64b-32ad4ce919f7";
    console.log("Italiano");
  }
  else{
    console.log("error lenguage");
  }
  getProteins();
});

function getProteins(){
  fetch(url)
  .then(response => response.json()) 
  .then(data => {
    prtns=data.proteins;
    console.log(data);
    protein.innerHTML="";
    prtns.forEach((prt) => {
      protein.innerHTML+=`<option value="${prt.name}">${prt.name} (${prt.preparation})</option>`;
    });
    updateSalsas(protein.value);
    updateToppings(protein.value);
  }) 
  .catch(error => console.log("Error fetching proteins data:", error))
}

protein.addEventListener("change", function () {
  const proteina=protein.value;
  console.log(protein.value);
  updateSalsas(proteina);
  updateToppings(proteina);
});

function updateSalsas(proteina){
  fetch(url)
  .then(response => response.json()) 
  .then(data => {
    salsa.innerHTML="";
    data.proteins.find(protein => protein.name === proteina).salsas.forEach((sl) => {
      salsa.innerHTML+=`<option value="${sl.name} (${sl.spiciness})">${sl.name} (${sl.spiciness})</option>`;
    });
  }) 
  .catch(error => console.log("Error fetching salsas data:", error))
}

function updateToppings(proteina){
  fetch(url)
  .then(response => response.json()) 
  .then(data => {
    tops.innerHTML="";
    data.proteins.find(protein => protein.name === proteina).toppings.forEach((top) => {
      tops.innerHTML+=`<label><input type="checkbox" class="form-check-input" name="toppings" value="${top.name} (${top.quantity})"> ${top.name} (${top.quantity})</label>`;
    });
  }) 
  .catch(error => console.log("Error fetching toppings data:", error))
}

function buildTaco() {
    const toppings = Array.from(document.querySelectorAll("input[name='toppings']:checked"))
      .map(input => input.value);

    const output = document.getElementById("output");
    output.innerHTML = `
      <h3>Your Taco 🌮</h2>
      <p><strong>🍳Protein:</strong> ${protein.value}</p>
      <p><strong>🌶️Salsa:</strong> ${salsa.value}</p>
      <p><strong>🥗Toppings:</strong> ${toppings.join(", ") || "None"}</p>
    `;
  }

