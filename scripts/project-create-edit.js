//Testa os parâmetros da URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

// Type: 'create' | 'edit'
    const screenType = params.id ? 'edit' : 'create';

    window.onload = function(){

    setScreenTypeText();
    fillInputs();
}

    function fillInputs() {
        if(screenType === 'edit') {
            fetch(`https://64505d3ca322196911494a35.mockapi.io/api/projects/${params.id}`)
            .then(response => response.json())
            .then(project => {
                document.querySelector('#title').value = project.title;
                document.querySelector('#totalCost').value = project.totalCost;
                document.querySelector('#description').value = project.description;
            })
        }
    }

    function setScreenTypeText() {
    // MODO CRIAR
    if (screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo Projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    // MODO EDITAR
    if (screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
    }
    
    function createOrEdit () {
        let payload = {
            title: document.querySelector("#title").value,
            totalCost: document.querySelector("#totalCost").value,
            description: document.querySelector("#description").value,
            idClient: "1"
        }
    
        fetch(`https://64505d3ca322196911494a35.mockapi.io/api/projects${screenType === 'edit' ? ('/' + params.id) : '' } `, {
            method: screenType === 'edit' ? 'PUT' : 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if(screenType === 'edit') {
                alert('Edição concluída')
            } else {
                alert('Projeto criado');
            }

            window.location.href = "list.html";
            
        })
        .catch(error => {
            alert('Erro no servidor!');
            console.log(error);
        })
        // Atribuir Ids no HTML
        //Colocar as regras no HTML
        //Construir o método de cadastro
        //Construir o payload
        //Enviar os dados para a API
        //Redirecionar para a listagem
    
    
        
    }
    
