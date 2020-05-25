(function () {
  const $ = q => document.querySelector(q);
  const register = $('#send');

  const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

  function renderGarage() {
    const garage = getGarage()
    garage.forEach(c => addCarToGarage(c));
  }

  function handleClick(event) {
    event.preventDefault();
    const car = $('#veiculo').value;
    const placa = $('#placa').value;

    if (!car || !placa) {
      alert('Os campos são obrigatórios')
      return;
    }

    const carro = {
      car,
      placa,
      time: new Date()
    }

    const garage = getGarage()
    garage.push(carro)
    localStorage.garage = JSON.stringify(garage)

    addCarToGarage(carro);

    $('#veiculo').value = ''
    $('#placa').value = ''
  }

  function addCarToGarage(car) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${car.car}</td>
        <td>${car.placa}</td>
        <td>${new Date(car.time).toLocaleString("pt-BR", { hour: 'numeric', minute: 'numeric' })}</td>
        <td>
          <button class="delete" data-delete>X</button>
        </td>
    `;

    $('#garage').appendChild(row)

  }

  renderGarage()

  register.addEventListener('click', handleClick);

  const deletes = document.querySelectorAll('[data-delete]');
  deletes.forEach(itens => {
    itens.addEventListener('click', e => {
      console.log(e.target.parentElement.parentElement.cells)
    })
  })

})();