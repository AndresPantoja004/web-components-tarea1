class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.title = this.getAttribute("title") || "Product Title";
    this.price = this.getAttribute("price") || "0";
    this.image = this.getAttribute("image") || "";
    this.category = this.getAttribute("category") || "Category";
    this.description = this.getAttribute("description") || "Description...";
    this.rating = parseInt(this.getAttribute("rating")) || 0;
    this.bgBase = this.getAttribute("bg-base") || "rgb(38, 114, 236)";
    this.bgButton = this.getAttribute("bg-button") || " #ffc107";
    this.count = 0;
    this.textColor = this.getAttribute("text-color") || "black";
  }

  get styles() {
    return `
      <style>
        .card {
          width: 280px;
          font-family: sans-serif;
          background: white;
          border-radius: 15px;
          color: ${this.textColor};
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .image-container img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          z-index: 2;
          
        }
        .image-container{
            width: 100%;
            height: 200px;
            position: relative;
            overflow: hidden;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2px solid #eee;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .image{
              z-index: 1;
        }

        .background-diagonal {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${this.bgBase};
            clip-path: polygon(0 0, 100% 0, 0 100%);
        }

        .info {
          padding: 15px;
        }

        .category {
          font-size: 13px;
          
        }
        
        .category spam{
          border: 2px solid ${this.textColor};
          padding: 5px;
          border-radius: 5px;
          color: ${this.textColor};
          font-weight: 600;
        }

        .title {
          font-size: 18px;
          font-weight: 700;
          color:${this.bgBase};
          margin-bottom: 8px;
        }

        .description {
          font-size: 14px;
          color: ${this.textColor};
          margin-bottom: 10px;
        }

        .rating {
          color: gold;
          margin-bottom: 10px;
          font-size: 28px;
        }

        .price {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .counter {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .container-secondary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

        }
        .container-secondary svg{
            fill:rgb(225, 225, 225);  
            width: 30px;
            height: 30px;
        }
        
        .container-secondary svg:hover{
            fill: ${this.bgButton};
            cursor: pointer;
        }
        

        .counter button {
          width: 30px;
          height: 30px;
          font-size: 18px;
          border: none;
          background: #eee;
          border-radius: 5px;
          cursor: pointer;
        }

        .add-to-cart {
          display: block;
          width: 100%;
          padding: 12px;
          background: ${this.bgButton};
          color: ${this.textColor};
          text-align: center;
          font-weight: bold;
          border: none;
          border-radius: 0 0 15px 15px;
          cursor: pointer;
        }
      </style>
    `;
  }

  getTemplate() {
    const stars = "★".repeat(this.rating) + "☆".repeat(5 - this.rating);
    return `
      <div class="card">
        <div class="image-container">
          <div class="background-diagonal"></div>
          <div class="image">
            <img src="${this.image}" alt="${this.title}">
          </div>
        </div>
        <div class="info">
          <div class="container-secondary">
                <div class="category"><spam>${this.category}</spam></div>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg" color="#58630" stroke-width="1.5"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z" fill=""></path></svg>
          </div>
          <div class="title">${this.title}</div>
          <div class="description">${this.description}</div>
          <div class="rating">${stars}</div>
          <div class="container-secondary">
            <div class="price">$${this.price}</div>
            <div class="counter">
                <button id="decrease">-</button>
                <span id="count">${this.count}</span>
                <button id="increase">+</button>
            </div>
          </div>
        </div>
        <button class="add-to-cart">ADD TO CART</button>
      </div>
      ${this.styles}
    `;
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
    this.addEventListeners();
  }

  addEventListeners() {
    const increaseBtn = this.shadowRoot.querySelector("#increase");
    const decreaseBtn = this.shadowRoot.querySelector("#decrease");
    const countDisplay = this.shadowRoot.querySelector("#count");

    increaseBtn.addEventListener("click", () => {
      this.count++;
      countDisplay.textContent = this.count;
    });

    decreaseBtn.addEventListener("click", () => {
      if (this.count > 0) {
        this.count--;
        countDisplay.textContent = this.count;
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("product-card", ProductCard);
