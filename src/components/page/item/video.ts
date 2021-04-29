import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string){
        super(`<section class="video">
        <div class="video__player"><iframe class="video__iframe"></iframe></div>
        <h3 class="video__title"></h3>
    </section>`);        
    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);
    
    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
}

    //정규표현식 Regex를 이용하여 가져옴 중요!!!
    //url에서 -> VideoId 추출 -> embed용 url로 변경 
    private convertToEmbeddedURL(url: string): string{
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        console.log(match);
        
        const videoId = match? match[1] || match[2] : undefined; //match에서 match하다면 배열로 전달됨(두그룹을 받아오는 정규표현식) 없다면 다음 배열 없으면 undefined
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}