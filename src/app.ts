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
        
        //For demo
        this.page.addChild(new ImageComponent('Image Title', 'data:image/jpeg;base64,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'));
        this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/Z6vhiMNw5lI'));
        this.page.addChild(new NoteComponent('Note Title', 'Note'));
        this.page.addChild(new TodoComponent('Todo Title', '공부해!'));
        this.page.addChild(new ImageComponent('Image Title', 'data:image/jpeg;base64,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'));
        this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/Z6vhiMNw5lI'));
        this.page.addChild(new NoteComponent('Note Title', 'Note'));
        this.page.addChild(new TodoComponent('Todo Title', '공부해!'));
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