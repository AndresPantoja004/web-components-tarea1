class MiFormularioPantoja extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <form id="formulario">
        <label>
          Texto del botón:
          <input type="text" name="texto" required>
        </label><br><br>
        <label>
          Límite:
          <input type="number" name="limite" min="0">
        </label><br><br>
        <label>
          Color de fondo:
          <input type="color" name="bg">
        </label><br><br>
        <label>
          Color del texto:
          <input type="color" name="textColor">
        </label><br><br>
        <button type="submit">Actualizar Contador</button>
      </form>

      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f3f3f3;
          padding: 20px;
          border-radius: 10px;
          font-family: Arial;
        }
        label {
          font-weight: bold;
        }
        button {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #388e3c;
        }
      </style>
    `;
    return template;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));

    this.shadowRoot.querySelector('#formulario').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const texto = data.get('texto');
      const limite = data.get('limite');
      const bg = data.get('bg');
      const textColor = data.get('textColor');

      const contador = document.querySelector('click-contador-pantoja');
      if (contador) {
        contador.setAttribute('texto', texto);
        contador.setAttribute('limite', limite);
        contador.setAttribute('bg', bg);
        contador.setAttribute('text-color', textColor);
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('mi-formulario-pantoja', MiFormularioPantoja);
