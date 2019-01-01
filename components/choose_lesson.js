export default class ChooseLesson extends HTMLElement {
    constructor() {
        super()
        const template = this.querySelector("template")
        for (let i = 1; i <= 9; i++) {
            const elem = document.importNode(template.content, true)
            const button = elem.querySelector("[data-role=lesson]")
            button.innerHTML = i
            button.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("onchooselesson", { bubbles: true, detail: i }))
            })
            this.appendChild(elem)
        }
    }
}