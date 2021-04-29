import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, url: string){
        super(`<section class="image">
                <div class="image__holder"><img class="image__thumbnail"></div>
                <h2 class="image__title"></h2>
                </section>`);
        
        //innerHTML에 데이터를 전달하지 않고 따로 필요한 데이터만 업데이트를 시켜준다.
        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement; //Class 명이 image__thumnail인것을 받아옴
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement; //casting
        titleElement.textContent = title;
    }
}