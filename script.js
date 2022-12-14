class Model extends HTMLElement {
  constructor() {
    super();
    console.log("Model Component Initialized");
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
    <style>
    #backdrop
    {
      position:fixed;
      top:0px;
      left:0px;
      background:rgba(0,0,0,0.75);
      width:100%;
      height:100vh;
      opacity:0;
      pointer-events:none;
      
    }
    #model
    {
      z-index:100;
      position:fixed;
      top:10vh;
      left:25%;
      width:50%;
      border:2px solid black;
      box-shadow:0 2px 8px rgba(0,0,0,0.26);
    
      background-color:white;
      border-radius:3px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      opacity:0;
      transition:all 0.3s ease-out;
    }
    #actions
    {
      border-top:1px solid #ccc;
      padding:1rem;
      display:flex;
      justify-content:flex-end;
    }
    #actions button
    {
      margin:0 0.25rem;
    }
    header
    {
      padding:1rem;     
      border-bottom:1px solid #ccc; 
    }
    header h1
    {
      font-size:1.25rem;
    }
    #main
    {
      padding:2rem;
    }
    :host([opened]) #backdrop,
    :host([opened]) #model
    {
      opacity:1;
      pointer-events:all;
    }

    :host([opened]) #model
    {
      top:15vh;
    }

    ::slotted(h1)
    {
      color:green;
      mergin:0px;
    }
    </style>
    
    <div id="backdrop"></div>
    <div id="model">
    <header>
        <h1><slot name="title"></h1>
    </header>
    <section id="main">
        <slot name="content">
        </slot>
    </section>
    <sections id="actions">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Okay</button>
    </sections>
    </div> 
        `;

    let allslots = this.shadowRoot.querySelectorAll("slot");
    allslots[1].addEventListener("slotchange", (evt) => {
      console.dir(allslots[1]);
    });

    //console.log(allslots[1]);
  }
  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
  }
  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }
  connectedCallback() {
    let cancelbtn = this.shadowRoot.querySelector("#cancel-btn");
    let confirmBtn = this.shadowRoot.querySelector("#confirm-btn");

    cancelbtn.addEventListener("click", () => {
      this.dispatchEvent(new Event("close"));
    });

    confirmBtn.addEventListener("click", () => {
      this.dispatchEvent(new Event("confirm transation"));
    });

    let backdrop = this.shadowRoot.querySelector("#backdrop");
    backdrop.addEventListener("click", () => {
      this.dispatchEvent(new Event("close"));
    });
  }

  // attributeChangedCallback(name, oldVal, newVal) {
  //   console.log(name, oldVal, newVal);
  //   if (name == "opened") {
  //     this.hasAttribute("opened");
  //     {
  //       this.shadowRoot.querySelector("#backdrop").style.opacity = 1;
  //       this.shadowRoot.querySelector("#backdrop").style.pointerEvents = "all";
  //       this.shadowRoot.querySelector("#model").style.opacity = 1;
  //       this.shadowRoot.querySelector("#model").style.pointerEvents = "all";
  //     }
  //   }
  // }
  // static get observedAttributes() {
  //   return ["opened"];
  // }
}
customElements.define("uc-model", Model);
