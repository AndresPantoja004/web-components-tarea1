class Clickcontador extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.contador = 0;
    this.limite = 0;
    this.texto = "Click aqui!";
    this.bg = "#000";
    this.                                                                                                                 u  ="#fff";
    
  }

  static get observedAttributes() {
    return ["texto","limite","contador","bg","text-color"];
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

  getStyles() {
    return `
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
          background-color: ${this.bg};
          color: ${this.textColor};
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #555;
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
    `;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="container">
        <button id="btn">${this.texto}</button>
        <div class="contador">Clics: <span id="contadorer">${this.contador}</span></div>
        <slot>
            <p>Slot por defecto</p>
        </slot>
      </div>
      ${this.getStyles()}
    `;
    return template;
  }


  render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.clickControllerBtn();
  }

  clickControllerBtn() {
    const button = this.shadowRoot.querySelector("#btn");
    const contadorer = this.shadowRoot.querySelector("#contadorer");
    button.addEventListener("click", () => {
      this.contador++;
      if(this.limite==0){
        contadorer.textContent = this.contador;
      }else{
        if (this.contador > this.limite) {
            contadorer.textContent = this.limite + " (Límite alcanzado)"
        }else{
            contadorer.textContent = this.contador;
        }
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("click-contador-pantoja", Clickcontador);