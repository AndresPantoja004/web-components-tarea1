export class MiFormularioPantoja extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <form id="formulario">
        <label>Texto del botón: <input type="text" name="texto" required></label><br>
        <label>Límite: <input type="number" name="limite"></label><br>
        <label>Color de fondo: <input type="color" name="bg"></label><br>
        <label>Color del texto: <input type="color" name="textColor"></label><br>
        <button type="submit">Actualizar Contador</button>
      </form>
      <style>
        form {
          display: flex;
          flex-direction: column;
          background: #fafafa;
          padding: 15px;
          border-radius: 10px;
          font-family: sans-serif;
        }
        label {
          margin-bottom: 10px;
        }
      </style>
    `;

    this.shadowRoot.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const contador = document.querySelector("click-contador-pantoja");

      if (contador) {
        contador.setAttribute("texto", data.get("texto"));
        contador.setAttribute("limite", data.get("limite"));
        contador.setAttribute("bg", data.get("bg"));
        contador.setAttribute("text-color", data.get("textColor"));
      }
    });
  }
}

customElements.define("mi-formulario-pantoja", MiFormularioPantoja);
