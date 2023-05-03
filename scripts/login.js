function checkIfAnyRoleIsChecked(){
    let list = document.getElementsByName("role");
    let counter = 0;

    for(let radioButton of list){
        if (radioButton.checked === false) {
            counter++;
        }
    }

    return counter !== list.length
}

checkIfAnyRoleIsChecked();

function cadastrar() {
    console.log('Cadastro efetuado com sucesso!')

    // Pegar dados do form

    if(checkIfAnyRoleIsChecked() === false) {
        alert('Marque algum perfil!')
        return;
    }

    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    // Enviar para a API

    fetch("https://64505d3ca322196911494a35.mockapi.io/api/users", {
        method:'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        alert('Cadastrado com sucesso!');
    })
    .catch(error => {
        alert('Erro no servidor!');
        console.log(error);
    })

 
}