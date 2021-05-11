import { BaseComponent, Component } from './../component.js';
//부모컨테이너 요소

export interface Composable {
    addChild(child: Component): void;
}
type OnCloseListener = () => void; // 닫힌상태만 알려주는 콜백함수
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDrageStateListener<T extends Component> = (target: T, state: DragState) => void;

//규격사항 : 섹션을 감싸는 컨테이너  
interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void
    setOnDragStateListener(listener: OnDrageStateListener<SectionContainer>): void;
    muteChildren(state: 'mute' | 'unmute'): void;
    getBoundingRect() : DOMRect;
    onDropped(): void;
};



type SectionContainerConstructor = {
    new(): SectionContainer//아무것도 전달 받지 않는 생성자 생성자를 받는 어떤 클래스도 받는다 생성자가 호출 받으면 
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener; //외부로부터 전달받은 콜백함수를 저장하고 있을 리스너
    private dragStateListener?: OnDrageStateListener<PageItemComponent>;
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
            this.element.addEventListener('dragenter', (event: DragEvent) => {
                this.onDragEnter(event);
            });
            this.element.addEventListener('dragleave', (event: DragEvent) => {
                this.onDragLeave(event);
            });
    }
    
    onDragStart(_: DragEvent){
        this.notifyDragObservers('start');
        this.element.classList.add('lifted');//클래스를 추가 
    }
    onDragEnd(_: DragEvent){
        this.notifyDragObservers('stop');
        this.element.classList.remove('lifted');
    }
    onDragEnter(_: DragEvent){
        this.notifyDragObservers('enter');
        this.element.classList.add('drop-area');
    }
    onDragLeave(_: DragEvent){
        this.notifyDragObservers('leave');
        this.element.classList.remove('lifted');
    }
    //등록된 콜백 함수를 호출
    notifyDragObservers(state: DragState){
        this.dragStateListener && this.dragStateListener(this, state); //this에 리스너가 있으면 리스너를 호출 타켓은 이컴포넌트 state를 전달 
    }

    onDropped(){
        this.element.classList.remove('drop-area')
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
    
    setOnDragStateListener(listener: OnDrageStateListener<PageItemComponent>) {
        this.dragStateListener = listener;
    }
    muteChildren(state: 'mute' | 'unmute') {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        } else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundingRect(): DOMRect{
        return this.element.getBoundingClientRect();
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    private children = new Set<SectionContainer>(); //중복된 데이터를 가질수 없는 자료 구조 모든 자식의 sectioncontainer를 가짐  
    private dropTarget?: SectionContainer;//drag drop 저장 = sectioncontainer가 drag&drop
    private dragTarget?: SectionContainer;//drag대상
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
    //위치를 바꿔주는 곳 
    onDrop(event: DragEvent){
        event.preventDefault();
        console.log('onDrop');
        if(!this.dropTarget){
            return
        }
        if(this.dragTarget && this.dragTarget !== this.dropTarget){
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y? 'beforebegin': 'afterend');
        }
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
            this.children.delete(item);
        });
        this.children.add(item);
        //페이지 아이템을 만들때마다 리스너를 등록 해서 출력 
        item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
            switch(state) {
                case 'start' :
                    this.dragTarget = target;
                    this.updateSections('mute');//드래그 시작 하면 포인터를 mute
                    break;
                case 'stop' :
                    this.dragTarget = undefined;
                    this.updateSections('unmute')
                    break;
                case 'enter' :
                    this.dropTarget = target;
                    console.log('enter', target);
                    break;
                case 'leave' : 
                    console.log('leave', target);
                    this.dropTarget = target;
                    break;
                    default: 
                        throw new Error(`unsupported state: ${state}`);//state에 대해 에러발생에 따른 메세지 출력
                }
            
        })
    }

    private updateSections(state: 'mute' | 'unmute'){
        this.children.forEach((Selection: SectionContainer) => {
            Selection.muteChildren(state);
        });//children을 돌면서 해당하는 값을 업데이트 
    }
}