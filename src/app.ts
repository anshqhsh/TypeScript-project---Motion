import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { InputDialog } from './components/dialog/dialog.js';
import { VideoComponent } from './components/page/item/video.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { Component } from './components/component.js';

class App{
    private readonly page: Component & Composable
    //추가할 최상위의 루트 요소를 받아옴
    constructor(appRoot: HTMLElement, dialogRoot: HTMLElement){
        this.page = new PageComponent(PageItemComponent);//새로운페이지 컴포넌트를 만들어
        this.page.attachTo(appRoot);//appRoot에 붙여줘
        
        // 수동적으로 추가 하는 코드 
        // const image = new ImageComponent('Image Title', 'https://picsum.photos/200/300');
        // this.page.addChild(image);

        // const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/exCn38p8bGs');
        // this.page.addChild(video);

        // const note = new NoteComponent('Note Title', 'Note Body');
        // this.page.addChild(note);

        // const todo = new TodoComponent('Todo Title', 'Todo Item');
        // this.page.addChild(todo);    

        //imageBtn
        const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);//dialog에 전달 
            dialog.attachTo(dialogRoot); //전달 받은 것을 document body에 전달 dialogRoot = document.body

            dialog.setOnCloseListener(()=>{
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                //섹션을 만들어서 페이지에 추가해준다.
                const image = new ImageComponent(inputSection.title, inputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
        });

        //videoBtn
        const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);//dialog에 전달 
            dialog.attachTo(dialogRoot); //전달 받은 것을 document body에 전달 dialogRoot = document.body

            dialog.setOnCloseListener(()=>{
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                //섹션을 만들어서 페이지에 추가해준다.
                const video = new VideoComponent(inputSection.title, inputSection.url);
                this.page.addChild(video);
                dialog.removeFrom(dialogRoot);
            });
        });
        //noteBtn
        const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);//dialog에 전달 
            dialog.attachTo(dialogRoot); //전달 받은 것을 document body에 전달 dialogRoot = document.body

            dialog.setOnCloseListener(()=>{
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                //섹션을 만들어서 페이지에 추가해준다.
                const note = new NoteComponent(inputSection.title, inputSection.body);
                this.page.addChild(note);
                dialog.removeFrom(dialogRoot);
            });
        });
        //todoBtn
        const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);//dialog에 전달 
            dialog.attachTo(dialogRoot); //전달 받은 것을 document body에 전달 dialogRoot = document.body

            dialog.setOnCloseListener(()=>{
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                //섹션을 만들어서 페이지에 추가해준다.
                const todo = new TodoComponent(inputSection.title, inputSection.body);
                this.page.addChild(todo);
                dialog.removeFrom(dialogRoot);
            });
        });
    }
}
//dom요소에 있는 document 요소를 받아 페이지를 추가  app 클래스에 인스턴스를 만들어줌 -> 생성자안에 다큐먼트 클래스 요소를 받아 전달 html class = 'document'
//document.body안에도 전달 
new App(document.querySelector('.document')! as HTMLElement, document.body);