document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');
  const listaUsuarios = document.getElementById('listaUsuarios');

  exibirUsuarios();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    const usuario = { nome, email, senha };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const jaExiste = usuarios.some(u => u.email === email);
    if (jaExiste) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    form.reset();
    exibirUsuarios();
  });

  function exibirUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    listaUsuarios.innerHTML = '';

    usuarios.forEach((usuario, index) => {
      const div = document.createElement('div');
      div.className = 'usuario';
      div.innerHTML = `
        <strong>${usuario.nome}</strong> - ${usuario.email}
        <button onclick="removerUsuario(${index})">Remover</button>
      `;
      listaUsuarios.appendChild(div);
    });
  }

  window.removerUsuario = function(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    exibirUsuarios();
  };
});
