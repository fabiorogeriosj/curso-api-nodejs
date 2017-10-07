
function cadastrar() {
    var nome = $('#nome').val()
    var email = $('#email').val()
    var senha = $('#senha').val()
    $.ajax({
        method: "POST",
        url: "/usuarios",
        contentType: "application/json",
        data: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    }).done(cadastroSucesso).fail(cadastroErro)
}


function cadastroSucesso(data) {
    console.log(data)
}

function cadastroErro(error, status) {
    console.log(error, status)
}

function logar() {
    var email = $('#email').val()
    var senha = $('#senha').val()
    $.ajax({
        method: "POST",
        url: "/usuarios/logar",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            senha: senha
        }),
        success: loginSucesso,
        error: loginErro
    })
}

function loginSucesso(data) {
    console.log(data)
}

function loginErro(error, status) {
    console.log(error, status)
}