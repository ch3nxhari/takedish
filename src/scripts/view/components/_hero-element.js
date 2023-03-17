/* eslint-disable max-len */
import heroImage from '../../../public/images/hero/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024,sizes[]=1350';
import heroImageWebp from '../../../public/images/hero/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024,sizes[]=1350&format=webp';

class HeroElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = /* html */ `
      <picture>
        ${this._createSourceElement(heroImage, 'jpeg')}
        ${this._createSourceElement(heroImageWebp, 'webp')}
        <img
        class="lazyload"
        src="${heroImage.src}"        
        width="${heroImage.width}"
        height="${heroImage.height}"
        alt="Gambar Hero"
        />
      </picture>
      <h1 class="hero_heading">TakeDish</h1>
      <p id="hero-tagline" class="hero_tagline">Satisfy your cravings, anywhere, anytime</p>
    `;
  }

  _createSourceElement({images}, type) {
    let elements = '';
    images.forEach(({path, width}, index) => {
      elements += /* html */ `
        <source
          media=${(index < images.length - 1) ?
          `'(max-width: ${width}px)'` :
          `'(min-width: ${images[index - 1].width}px)'`}
          srcset="${path}"
          type="image/${type}">
      `;
    });
    return elements;
  }
}

customElements.define('hero-element', HeroElement);
