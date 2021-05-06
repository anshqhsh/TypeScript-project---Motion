import { BaseComponent } from './../../component.js';
export class MediaSectionInput extends BaseComponent<HTMLElement> {
    constructor(){
        super(`<dir>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title" />    
                </div>
                <div class="form__container">
                    <label for="url">URL</label>
                    <input type="text" id="url" />  
                </div>
            </dir>`)
    }; //this element가 준비 
    //getter를 호출하는 시점에 dom 요소의 url읽어 올것 - 사용자가 정보 입력후 add누르면 url을 읽어옴 
    get title(): string {
        const element = this.element.querySelector('#title')! as HTMLInputElement;
        return element.value;
    }
    //dom 요소에 입력된 url을 가지고 옴
    get url(): string {
        const element = this.element.querySelector('#url')! as HTMLInputElement;
        return element.value;
    }
}