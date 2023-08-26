class Count extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // this.render();
  }

  static get observedAttributes(): string[] {
    return ["count"];
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  public render = (): void => {
    if (this.shadowRoot == null) {
      return;
    }

    this.shadowRoot.replaceChildren(this.styles, this.content);
  };

  private get content(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    wrapper.innerHTML = `
    <slot></slot> 
    <span>${this.count}</span>
    `;

    return wrapper;
  }

  private get styles(): HTMLStyleElement {
    const styles = document.createElement("style");
    styles.textContent = `
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-size: 2rem;
        -webkit-text-stroke: 2px #000000;
        gap: 4px;
    }

    ::slotted(svg) {
        width: 64px;
        height: 64px;
    }
    `;
    return styles;
  }

  private get count(): string {
    return this.getAttribute("count") ?? "";
  }
}

if (customElements.get("game-count") == null) {
  customElements.define("game-count", Count);
}
