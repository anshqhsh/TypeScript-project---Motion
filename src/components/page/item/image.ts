export class ImageComponent {
    private element  : HTMLElement
    //생성자에서 title과 url을 전달 받아서 동적으로 만듦 template테그 이용
    constructor(title: string, url: string){
        const template = document.createElement('template');
        template.innerHTML = `<section class="image">
        <div class="image__holder"><img class="image__thumbnail"></div>
        <p class="image__title"></p>
    </section>`;//InnerHTML을 이용하여 스트링 타입으로 이용할 수 있음 - template안에 있는 첫번째 자식
        this.element = template.content.firstElementChild! as HTMLElement;

        //innerHTML에 데이터를 전달하지 않고 따로 필요한 데이터만 업데이트를 시켜준다.
        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement; //Class 명이 image__thumnail인것을 받아옴
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement; //casting
        titleElement.textContent = title;
    }
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ){
        parent.insertAdjacentElement(position, this.element) //자식요소 어딘가에 추가하는 API
}
}