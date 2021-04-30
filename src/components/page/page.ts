import { BaseComponent, Component } from './../component.js';
//부모컨테이너 요소

export interface Composable {
    addChild(child: Component): void;
}
type OnCloseListener = () => void; // 닫힌상태만 알려주는 콜백함수

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{
    private closeListener?: OnCloseListener; //외부로부터 전달받은 콜백함수를 저장하고 있을 리스너
    constructor(){
        super(`<li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
            </li>`);
            const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
            closeBtn.onclick = () =>{
                this.closeListener && this.closeListener();
            }
    }
    //외부에서 전달해온 값에 따라서 다양하게 저장
    addChild(child: Component) {
        //class name이 page-item__body 라인요소를 HTMLELEMENT로 캐스팅
        const container = this.element.querySelector('.page-item__body')! as HTMLElement
        child.attachTo(container) //child의 attachTo를 이용하여 컨테이너를 붙임 
    }
    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    } 
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    constructor(){
        super('<ul class="page"></ul>');
    }
//인자로 전달받은 부모 컨테이너에 Page를 추가 HTML에 어떤 것도 받을 수 있고
//이 함수를 통해서 parent요소에 전달한 값을 등록한다.
    //전달받은 컴포넌트를 PAGEITEMCOMPONENT에 담는다
    addChild(section: Component) {
        const item = new PageItemComponent();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        })
    }
}