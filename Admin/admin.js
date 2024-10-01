

let table = document.querySelector('table')


let orderData = () =>{
  let rows = document.querySelectorAll("tbody tr")
  let serviceName = document.querySelector("h1").textContent;
for (i = 0; i < rows.length; i++) {
  if (rows[i].children[4].firstElementChild.textContent !== serviceName) {
    rows[i].children[4].parentElement.style.display = "none";
  }
  let span = document.createElement("span");
  span.textContent = "+213 ";
  rows[i].children[1].prepend(span);
}
}
let fetchData = async () =>{
  try {
    let {data} = await axios('https://logistique-back-end.onrender.com/api/v1/frets')
    table.innerHTML = 
    `<thead> <tr><td> Nom </td> <td>Téléphone</td> <td> Ville de livraison </td> <td> Ville de départ </td> <td> Type expédition </td> </tr> </thead>
    ${data.map(({_id, nom, telephone, livraison, depart, fret}) =>{
      return(`
        <tr id=${_id}>
          <td>${nom}</td>
          <td>${telephone}</td>
          <td>${livraison}</td>
          <td>${depart}</td>
          <td><span>${fret}</span><i class="fa-regular fa-trash-can delete"></i></td>
          </tr>
        `)
    }).join(' ')}`
  } catch (error) {
    console.log(error);
  }
  orderData()
}
fetchData()

let toast = (msg) => {
  return Toastify({
    text: msg,
    duration: 3000,
    gravity: "bottom",
    style: {
      background: "linear-gradient(to right, #6ac22b, #96c93d)"
    },
    }).showToast();
}

table.addEventListener('click', async (e) =>{
  if(e.target.classList.contains('delete')){
    let id = e.target.parentElement.parentElement.id
    try {
      await axios.delete(`https://logistique-back-end.onrender.com/api/v1/frets/${id}`)
      toast('Fret supprimé')
    } catch (error) {
      console.log(error);
    }
    fetchData()
  }
})


