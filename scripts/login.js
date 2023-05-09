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

    // Pegar dados do form

    if(checkIfAnyRoleIsChecked() === false) {
        Swal.fire(
            'Algo deu errado',
            'Marque um tipo de perfil Dev ou Cliente',
            'error'
          )
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
        
        Swal.fire({
            title: 'Bem vindo!',
            text: 'Usuário cadastrado com sucesso',
            icon: 'success',
            confirmButtonColor: 'var(--ld-color-primary)',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if(result.isConfirmed) {
                localStorage.setItem("userName", response.fullName);
                localStorage.setItem("role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
                localStorage.setItem("idClient", response.id);
        
        
                window.location.href = "list.html";
            }
        })
    })
}