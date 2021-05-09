import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { VideoComponent } from './components/page/item/video.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { Component } from './components/component.js';

type InputComponentConstructor<T= (MediaData | TextData) & Component> = {
    new (): T; //생성자
};

class App{
    private readonly page: Component & Composable
    //추가할 최상위의 루트 요소를 받아옴
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement){
        this.page = new PageComponent(PageItemComponent);//새로운페이지 컴포넌트를 만들어
        this.page.attachTo(appRoot);//appRoot에 붙여줘

        //image
        this.bindElementToDialog<MediaSectionInput>(
            '#new-image', //셀렉터
            MediaSectionInput, // add 클릭시 
            (input: MediaSectionInput) => new ImageComponent(input.title, input.url)); // input데이터에 대해 컴포넌트를 만든다
        //video
        this.bindElementToDialog<MediaSectionInput>(
            '#new-video', 
            MediaSectionInput,
            (input: MediaSectionInput) => new VideoComponent(input.title, input.url)); 

        this.bindElementToDialog<TextSectionInput>(
            '#new-note',
            TextSectionInput,
            (input: TextSectionInput) => new NoteComponent(input.title, input.body)); 
        
        this.bindElementToDialog<TextSectionInput>(
            '#new-todo',
            TextSectionInput,
            (input: TextSectionInput) => new TodoComponent(input.title, input.body));
        
    }

    //리팩토링 함수화
    //특정한 요소(버튼)에 다이어로그를 연결 add 시 페이지에 추가 element 와 다이어로그를 연결하는 펑션

    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string, 
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component//콜백함수 MediaSectionInput | TextSectionInput을 전달해주면 컴포넌트를 만듦
        ){
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new InputComponent();  
            dialog.addChild(input);//dialog에 전달 
            dialog.attachTo(this.dialogRoot); //전달 받은 것을 document body에 전달 dialogRoot = document.body

            dialog.setOnCloseListener(()=>{
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                //섹션을 만들어서 페이지에 추가해준다.
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
//dom요소에 있는 document 요소를 받아 페이지를 추가  app 클래스에 인스턴스를 만들어줌 -> 생성자안에 다큐먼트 클래스 요소를 받아 전달 html class = 'document'
//document.body안에도 전달 
new App(document.querySelector('.document')! as HTMLElement, document.body);