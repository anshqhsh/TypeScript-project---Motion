export class ImageComponent {
    constructor() {
        this.element = document.createElement('ul');
        this.element.setAttribute('class', 'image');
        this.element.textContent = 'This is imageComponent';
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
}
