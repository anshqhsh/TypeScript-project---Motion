import { Component } from './components/component';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent } from './components/page/page.js';

class App{
    private readonly page: Component & Composable
    //추가할 최상위의 루트 요소를 받아옴
    constructor(appRoot: HTMLElement){
        this.page = new PageComponent();//새로운페이지 컴포넌트를 만들어
        this.page.attachTo(appRoot);//appRoot에 붙여줘
        
        const image = new ImageComponent('Image Title', 'https://picsum.photos/200/300');
        this.page.addChild(image);

        const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/exCn38p8bGs');
        this.page.addChild(video);

        const note = new NoteComponent('Note Title', 'Note Body');
        this.page.addChild(note);

        const todo = new TodoComponent('Todo Title', 'Todo Item');
        this.page.addChild(todo);    
    }
}

new App(document.querySelector('.document')! as HTMLElement)//dom요소에 있는 document 요소를 받아 페이지를 추가  app 클래스에 인스턴스를 만들어줌 -> 생성자안에 다큐먼트 클래스 요소를 받아 전달 html class = 'document'
