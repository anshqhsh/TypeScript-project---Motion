import { BaseComponent, Component } from './../component.js';
//부모컨테이너 요소

export interface Composable {
    addChild(child: Component): void;
}
type OnCloseListener = () => void; // 닫힌상태만 알려주는 콜백함수

//규격사항 : 섹션을 감싸는 컨테이너  
interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void
}

type SectionContainerConstructor = {
    new(): SectionContainer//아무것도 전달 받지 않는 생성자 생성자를 받는 어떤 클래스도 받는다 생성자가 호출 받으면 
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer{
    private closeListener?: OnCloseListener; //외부로부터 전달받은 콜백함수를 저장하고 있을 리스너
    constructor(){
        super(`<li draggable="true" class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
            </li>`);
            const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
            closeBtn.onclick = () =>{
                this.closeListener && this.closeListener();
            };
            this.element.addEventListener('dragstart', (event: DragEvent) => {
                this.onDragStart(event);
            });
            this.element.addEventListener('dragend', (event: DragEvent) => {
                this.onDragEnd(event);
            });
    }
    
    onDragStart(event: DragEvent){
        console.log('dragstart', event);
    }

    onDragEnd(event: DragEvent){
        console.log('dragend', event);
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
    constructor(private pageItemConstructor: SectionContainerConstructor){
        super('<ul class="page"></ul>');
    
        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        });
    }

    onDragOver(event: DragEvent){
        event.preventDefault(); // 드랍존을 정의 할 때 호출을 안하면 터치, 포인터 이벤트가 문제 있을 수 있다. 
        console.log('onDragOver');
        
    }
    onDrop(event: DragEvent){
        event.preventDefault();
        console.log('onDrop');
        
    }
//인자로 전달받은 부모 컨테이너에 Page를 추가 HTML에 어떤 것도 받을 수 있고
//이 함수를 통해서 parent요소에 전달한 값을 등록한다.
    //전달받은 컴포넌트를 PAGEITEMCOMPONENT에 담는다
    addChild(section: Component) {
        const item = new this.pageItemConstructor(); //외부에서 전달받아서 만듦
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        })
    }
}