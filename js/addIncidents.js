const myform = document.getElementById("iform");
const name = document.getElementById("form3");
const description = document.getElementById("form32");
const address = document.getElementById("form8");

// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  const sendBody = {
    name: name.value,
    address: address.value,
    description: description.value,
  };

  try {
    const res = await fetch("http://localhost:5000/api/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
    }

    alert("incident has been added");
    window.location.href = "/index.html";
  } catch (err) {
    alert(err);
    return;
  }
}

myform.addEventListener("submit", addStore);
