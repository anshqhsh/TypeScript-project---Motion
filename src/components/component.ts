export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void;
    removeFrom(parent: HTMLElement): void;
    attach(Component: Component, position?: InsertPosition): void;
}
/**
 * Encapsulate the HTML elment creation
 */
export class BaseComponent<T extends HTMLElement> implements Component{
    protected readonly element: T; //자식클래스에서만 접근가능하고, 한번 만들어지면 재사용 불가 
    //Basecomponent 사용시 어떤 component를 받을껀지 받아서 사용 
    constructor(htmlString: string) {//string타입의 element를 받아서 만들어짐 
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild! as T;
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ){
        parent.insertAdjacentElement(position, this.element) //자식요소 어딘가에 추가하는 API
    }

    removeFrom(parent: HTMLElement){
        if(parent !== this.element.parentElement){
            throw new Error('parent mismatch')
        }
        parent.removeChild(this.element);
    }
    attach(component: Component, position?: InsertPosition){
        component.attachTo(this.element, position)
    }
}