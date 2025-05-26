const template = document.createElement("template");
template.innerHTML = `
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #e3e3e3;
      padding: 20px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .contador {
      margin-top: 10px;
      font-size: 18px;
    }
    ::slotted(*) {
      margin-top: 10px;
      color: #555;
    }
  </style>
  <div class="container">
    <button id="btn"></button>
    <div class="contador">Clics: <span id="contadorer">0</span></div>
    <slot><p>Slot por defecto</p></slot>
  </div>
`;

export class ClickContador extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.contador = 0;
    this.limite = 0;
    this.texto = "Click aqui!";
    this.bg = "#000";
    this.textColor = "#fff";
  }

  static get observedAttributes() {
    return ["texto", "limite", "contador", "bg", "text-color"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "text-color") {
        this.textColor = newValue;
      } else {
        this[name] = newValue;
      }
      this.render();
    }
  }

  clickControllerBtn() {
    const button = this.shadowRoot.querySelector("#btn");
    const contadorer = this.shadowRoot.querySelector("#contadorer");
    button.addEventListener("click", () => {
      this.contador++;
      const limite = parseInt(this.limite);

      if (!limite || this.contador <= limite) {
        contadorer.textContent = this.contador;
      }

      if (limite && this.contador === limite) {
        this.dispatchEvent(new CustomEvent("limite-alcanzado", {
          detail: { mensaje: "¡Se alcanzó el límite!" },
          bubbles: true,
          composed: true
        }));
      }

      if (this.contador > limite && limite > 0) {
        contadorer.textContent = `${limite} (Límite alcanzado)`;
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = "";
    const clone = template.content.cloneNode(true);
    clone.querySelector("#btn").textContent = this.texto;
    clone.querySelector("#btn").style.backgroundColor = this.bg;
    clone.querySelector("#btn").style.color = this.textColor;
    clone.querySelector("#contadorer").textContent = this.contador;
    this.shadowRoot.appendChild(clone);
    this.clickControllerBtn();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("click-contador-pantoja", ClickContador);
