import { ImageComponent } from './components/image.js';
import { PageComponent } from './components/page.js';
class App{
    private readonly page: PageComponent
    private readonly image: ImageComponent
    //추가할 최상위의 루트 요소를 받아옴
    constructor(appRoot: HTMLElement){
        this.page = new PageComponent();//새로운페이지 컴포넌트를 만들어
        this.page.attachTo(appRoot);//appRoot에 붙여줘
        this.image = new ImageComponent();
        this.image.attachTo(appRoot);
    }
}

new App(document.querySelector('.document')! as HTMLElement)//dom요소에 있는 document 요소를 받아 페이지를 추가  app 클래스에 인스턴스를 만들어줌 -> 생성자안에 다큐먼트 클래스 요소를 받아 전달 html class = 'document'