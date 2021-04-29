import { BaseComponent } from './../component.js';
//부모컨테이너 요소
export class PageComponent extends BaseComponent<HTMLUListElement>{
    constructor(){
        super('<ul class="page">This is PageComponent!')
    }
//인자로 전달받은 부모 컨테이너에 Page를 추가 HTML에 어떤 것도 받을 수 있고
//이 함수를 통해서 parent요소에 전달한 값을 등록한다.
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ){
        parent.insertAdjacentElement(position, this.element) //자식요소 어딘가에 추가하는 API
}
}