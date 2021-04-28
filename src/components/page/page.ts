//부모컨테이너 요소
export class PageComponent {
    private element: HTMLUListElement //내부 state : 카드의 목록을 담는 곳 정렬되지 않은 리스트
    //생성자 안에서 돔요소를 만들어준다.
    constructor(){
        this.element = document.createElement('ul');//createElement api이용
        this.element.setAttribute('class', 'page');//class 이름을 page로 지정
        this.element.textContent = 'This is PageComponent'
    }
//인자로 전달받은 부모 컨테이너에 Page를 추가 HTML에 어떤 것도 받을 수 있고
//이 함수를 통해서 parent요소에 전달한 값을 등록한다.
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ){
        parent.insertAdjacentElement(position, this.element) //자식요소 어딘가에 추가하는 API
}
}