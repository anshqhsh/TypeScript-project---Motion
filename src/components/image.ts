export class ImageComponent {
    private element  : HTMLUListElement
    constructor(){
        this.element = document.createElement('ul');
        this.element.setAttribute('class', 'image');
        this.element.textContent = 'This is imageComponent' 
    }
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ){
        parent.insertAdjacentElement(position, this.element) //자식요소 어딘가에 추가하는 API
}
}