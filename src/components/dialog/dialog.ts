import { Composable } from '../page/page.js';
import { BaseComponent, Component } from './../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;


export class InputDialog extends BaseComponent<HTMLElement> implements Composable{
    closeListener?: OnCloseListener;
    submitListener?: OnSubmitListener;

    constructor(){
        super(`
        <dialog class="dialog">
            <div class="dialog__container">
                <button class="close">&times;</button>
                <div id="dialog__body"></div>
                <button class="dialog__submit">ADD</button>
            </div>
        </dialog>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLElement;
        //closeBtn.addEventListener('click',"")//버튼을 다른곳에서 사용할 때는 onclick에 클릭 이벤트를 할당하지 않고 버튼이벤트를 따로 주는게 좋다 
        closeBtn.onclick= () =>{
            this.closeListener && this.closeListener();

        }
        const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;
        submitBtn.onclick= () =>{
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener: OnCloseListener){
        this.closeListener = listener;
    }
    setOnSubmitListener(listener: OnSubmitListener){
        this.submitListener = listener;
    }
    addChild(child: Component) {
        const body = this.element.querySelector('#dialog__body')! as HTMLElement//body부분에 추가 dialog__body요소를 HTMLelement로 캐스팅 
        child.attachTo(body);
    }

}