(function () {
    const template = document.createElement("template");
    template.innerHTML = `
  
    <style>
    :host {
      display: inline-block;
      position: relative;
      --spacing: 16px 40px;
      --buttonBackgroundColor: #a2b0ff;
      --shadowColor: #25385b;
      --textColor: var(--shadowColor);
      --buttonMovement: 8;
      --clickMovement: 4;
      --shadowOffset: 4;
      --shadowPosition: translate(var(--shadowOffset),var(--shadowOffset));
    }
  
  :host * {
  box-sizing: border-box;
  }
  
  :host([bottom-left]){
    --shadowPosition: translate(calc(var(--shadowOffset) * 1px), calc(var(--shadowOffset) * -1px));
    --hoverMovement: translate(calc(var(--buttonMovement) * 1px), calc(var(--buttonMovement) * -1px));
    --clickMove: translate(calc(var(--clickMovement) * 1px), calc(var(--clickMovement) * -1px));
  }
  
  :host([bottom-right]){
    --shadowPosition: translate(calc(var(--shadowOffset) * -1px), calc(var(--shadowOffset) * -1px));
    --hoverMovement: translate(calc(var(--buttonMovement) * -1px), calc(var(--buttonMovement) * -1px));
  --clickMove: translate(calc(var(--clickMovement) * -1px), calc(var(--clickMovement) * -1px))
  }
  
  :host([top-left]){
    --shadowPosition: translate(calc(var(--shadowOffset) * 1px), calc(var(--shadowOffset) * 1px));
    --hoverMovement: translate(calc(var(--buttonMovement) * 1px), calc(var(--buttonMovement) * 1px));
  --clickMove: translate(calc(var(--clickMovement) * 1px), calc(var(--clickMovement) * 1px))
  }
  
  :host([top-right]){
    --shadowPosition: translate(calc(var(--shadowOffset) * -1px), calc(var(--shadowOffset) * 1px));
    --hoverMovement: translate(calc(var(--buttonMovement) * -1px), calc(var(--buttonMovement) * 1px));
    --clickMove: translate(calc(var(--clickMovement) * -1px), calc(var(--clickMovement) * 1px))
  }
  
   a {
      text-decoration: none;
      position: relative;
      text-align: center;
      display: inline-block;
      z-index: 2;
  }
  
  
  .text {
      padding: var(--spacing);
      background: var(--buttonBackgroundColor);
      color: var(--textColor);
      border: 2px solid var(--shadowColor);
      font-weight: bold;
      transition: all 0.4s ease;
      position: relative;
      display: block;
      width: 100%;
      transform: var(--shadowPosition);
      transition: 0.4s all cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  a:hover .text {
      transform: var(--hoverMovement);
      transition: 0.4s all cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  a:active .text {
    transform: var(--clickMove);
  }
  
  .link-shadow {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--shadowColor);
    width: 100%;
    display: block;
  }
  
    </style>
    <a href=""><span class="link-shadow"></span><span class="text"><slot></slot></span></a>
  
  `;
  
    class ShadowButton extends HTMLElement {
      get href() {
        return this.hasAttribute("href");
      }
  
      set href(val) {
        if (val) {
          return this.setAttribute("href", val);
        } else {
          return this.removeAttribute("href");
        }
      }
  
      get color() {
        return this.hasAttribute("color");
      }
  
      set color(val) {
        if (val) {
          return this.setAttribute("color", val);
        } else {
          return this.removeAttribute("color");
        }
      }
  
      get buttonColor() {
        return this.hasAttribute("buttonColor");
      }
  
      set buttonColor(val) {
        if (val) {
          return this.setAttribute("buttonColor", val);
        } else {
          return this.removeAttribute("buttonColor");
        }
      }

      checkColor() {
        var buttonColor = this.getAttribute("buttonColor");
        var shadowColor = this.getAttribute("shadowColor");
        var textColor = this.getAttribute("textColor");
        this.style.setProperty("--buttonBackgroundColor", buttonColor);
        this.style.setProperty("--shadowColor", shadowColor);
        this.style.setProperty("--textColor", textColor);
      }
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
  
      connectedCallback() {
        this.checkColor();
        var link = this.shadowRoot.querySelector("a");
        link.href = this.getAttribute("href");
      }
    }
  
    window.customElements.define("shadow-button", ShadowButton);
  })();
  

  var buttons = document.querySelectorAll('shadow-button');

  buttons.forEach(button => {
    button.buttonColor = 'red';
  })