import { ImageComponent } from './components/image.js';
import { PageComponent } from './components/page.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        this.image = new ImageComponent();
        this.image.attachTo(appRoot);
    }
}
new App(document.querySelector('.document'));
