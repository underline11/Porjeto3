// Sistema de SPA básico com templates
const app = document.getElementById("app");

const templates = {
  home: `
    <section>
      <h2>Bem-vindo!</h2>
      <p>Esta é uma aplicação web interativa com JavaScript moderno.</p>
    </section>
    
  `,
  sobre: `
    <section>
      <h2>Sobre o Projeto</h2>
      <p>Este projeto demonstra manipulação do DOM, navegação SPA e validação de formulários.</p>
    </section>
  `,
  contato: `
    <section>
      <h2>Entre em Contato</h2>
      <form id="contactForm">
        <label>Nome:</label>
        <input type="text" id="nome" placeholder="Digite seu nome">
        <span id="erroNome" class="error"></span>

        <label>Email:</label>
        <input type="email" id="email" placeholder="Digite seu e-mail">
        <span id="erroEmail" class="error"></span>

        <label>Mensagem:</label>
        <textarea id="mensagem" placeholder="Digite sua mensagem"></textarea>
        <span id="erroMsg" class="error"></span>

        <button type="submit">Enviar</button>
      </form>
    </section>
  `
};

// Função para renderizar a rota
function navigate(route) {
  app.style.opacity = 0;
  setTimeout(() => {
    app.innerHTML = templates[route] || templates.home;
    app.style.opacity = 1;

    // Se for o formulário, ativar validação
    if (route === "contato") addFormValidation();
  }, 200);
}

// Adiciona listeners nos links do menu
document.querySelectorAll("[data-route]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const route = e.target.getAttribute("data-route");
    navigate(route);
  });
});

// Inicializa na página "home"
navigate("home");

// Função de verificação de formulário
function addFormValidation() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    const erroNome = document.getElementById("erroNome");
    const erroEmail = document.getElementById("erroEmail");
    const erroMsg = document.getElementById("erroMsg");

    // Resetar mensagens
    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroMsg.textContent = "";

    if (nome.value.trim().length < 3) {
      erroNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
      valid = false;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
      erroEmail.textContent = "E-mail inválido.";
      valid = false;
    }

    if (mensagem.value.trim().length < 10) {
      erroMsg.textContent = "A mensagem deve ter pelo menos 10 caracteres.";
      valid = false;
    }

    if (valid) {
      alert("Formulário enviado com sucesso!");
      form.reset();
    }
  });
}
