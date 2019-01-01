export default class Lesson extends HTMLElement {
    constructor() {
        super()
        this.size = 20
        this.index = 0
        this.answer = null
        this.scores = 0
        document.addEventListener("onchooselesson", this.onChooseLesson.bind(this))
        this.querySelector("[data-action=exit]").addEventListener("click", this.onExit.bind(this))

        const answerTpl = this.querySelector("template[name=answer]")
        for (let i = 0; i < 20; i++) {
            const wrapper = document.createElement("div")
            wrapper.appendChild(document.importNode(answerTpl.content, true))
            wrapper.querySelector("[data-name=value]").innerHTML = i
            this.querySelector("[data-role=answers]").appendChild(wrapper)
            wrapper.addEventListener("click", this.onAnswer.bind(this, i))
        }

        this.addEventListener("onchangescores", () => {
            this.querySelector("[data-name=scores]").innerHTML = this.scores
        })
    }
    onExit() {
        this.dispatchEvent(new CustomEvent("onlessonexit", { bubbles: true, detail: this.scores }))
    }
    onChooseLesson(event) {
        this.index = 0
        this.scores = 0
        this.answer = null
        const i = event.detail
        const questionTpl = this.querySelector("template[name=question]")
        this.querySelector("[data-role=questions]").innerHTML = ""
        this.questions = []
        for (let j = 0; j < this.size; j++) {
            const a = i,
                b = Math.round(Math.random() * 10),
                c = a + b,
                type = Math.random() > .5
            const elem = document.importNode(questionTpl.content, true)
            elem.querySelector("[data-name=a]").innerHTML = a
            if (type) {
                elem.querySelector("[data-name=b]").innerHTML = b
                elem.querySelector("[data-name=c]").innerHTML = "?"
                elem.querySelector("[data-name=answer]").innerHTML = c
            } else {
                elem.querySelector("[data-name=b]").innerHTML = "?"
                elem.querySelector("[data-name=c]").innerHTML = c
                elem.querySelector("[data-name=answer]").innerHTML = b
            }
            const wrapper = document.createElement("div")
            wrapper.appendChild(elem)
            this.questions.push(wrapper)
            this.querySelector("[data-role=questions]").appendChild(wrapper)
            this.addEventListener("onchangequestion", () => {
                if (this.index == j) {
                    wrapper.classList.add("active")
                    this.answer = type ? c : b
                } else {
                    wrapper.classList.remove("active")
                }
                if (j < this.index) {
                    wrapper.classList.add("answered")
                }
            })
        }
        this.dispatchEvent(new CustomEvent("onchangescores"))
        this.dispatchEvent(new CustomEvent("onchangequestion"))
    }
    onAnswer(answer, event) {
        if (answer == this.answer) {
            this.scores += 5
            this.dispatchEvent(new CustomEvent("onchangescores"))
            this.questions[this.index].querySelector("[data-role=result-wrong]").classList.add("hidden")
            this.questions[this.index].querySelector("[data-role=result-right]").classList.remove("hidden")
            if (this.index < this.size - 1) {
                this.index++
                this.dispatchEvent(new CustomEvent("onchangequestion"))
            }
        } else {
            this.questions[this.index].querySelector("[data-role=result-right]").classList.add("hidden")
            this.questions[this.index].querySelector("[data-role=result-wrong]").classList.remove("hidden")
        }
    }
}