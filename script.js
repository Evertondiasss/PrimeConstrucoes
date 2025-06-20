// ==========================
// LOGIN
// ==========================
async function login() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!username || !password) {
    msg.innerText = "Preencha todos os campos.";
    msg.style.color = "red";
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyhk3Bb5uNCYResZCDtSJl7ZbvIAhKCCkNT7-KUg6qIoYvKdsD7q-ELNkVWu1Zsv6FfYg/exec");
    const data = await response.json();

    const user = data.find(u =>
      u.username?.toString().trim().toLowerCase() === username &&
      u.password?.toString().trim() === password
    );

    if (user) {
      msg.innerText = "Login bem-sucedido!";
      msg.style.color = "green";
      localStorage.setItem("usuarioLogado", username);
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      msg.innerText = "Usuário ou senha inválido.";
      msg.style.color = "red";
    }

  } catch (err) {
    msg.innerText = "Erro ao conectar com o servidor.";
    msg.style.color = "red";
    console.error(err);
  }
}


// ==========================
// ENVIO DE FORMULÁRIO (SEM ANEXO)
// ==========================
const formulario = document.getElementById("formulario");
if (formulario) {
  formulario.addEventListener("submit", async function (e) {
    e.preventDefault();

    const msg = document.getElementById("msg");
    const usuario = localStorage.getItem("usuarioLogado");

    if (!usuario) {
      msg.innerText = "Usuário não autenticado.";
      msg.style.color = "red";
      return;
    }

    const payload = {
      usuario,
      cliente: formulario.cliente.value,
      tipo: formulario.tipo.value,
      servico: formulario.servico.value,
      observacao: formulario.observacao.value,
      valor: formulario.valor.value,
      data_compra: formulario.data_compra.value,
      data_vencimento: formulario.data_vencimento.value,
      data_pagamento: formulario.data_pagamento.value
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxpvBVXZUlI9JuyHwK-g0SfhxJjoNu-T9IXWpZuopbZR82llX8eWsfVOJ7zwqHYP--D/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.text();
      msg.innerText = result;
      msg.style.color = "green";
      formulario.reset();

    } catch (error) {
      console.error(error);
      msg.innerText = "Erro ao enviar.";
      msg.style.color = "red";
    }
  });
}





// Removido qualquer função relacionada ao envio de formulário ou upload de arquivos
// https://script.google.com/macros/s/AKfycbxpvBVXZUlI9JuyHwK-g0SfhxJjoNu-T9IXWpZuopbZR82llX8eWsfVOJ7zwqHYP--D/exec