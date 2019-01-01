import ChooseLesson from "./components/choose_lesson.js"
import Lesson from "./components/lesson.js"
customElements.define("choose-lesson", ChooseLesson)
customElements.define("my-lesson", Lesson)

document.addEventListener("onlessonexit", (event) => {
    document.querySelector("my-lesson").classList.add("hidden")
    document.querySelector("choose-lesson").classList.remove("hidden")
    const { scores } = event.detail
    const totalScores = parseInt(localStorage.totalScores) || 0
    localStorage.totalScores = totalScores + scores
    update()
})
document.addEventListener("onchooselesson", () => {
    document.querySelector("my-lesson").classList.remove("hidden")
    document.querySelector("choose-lesson").classList.add("hidden")
})

function update() {
    const totalScores = parseInt(localStorage.totalScores) || 0
    document.querySelector("[data-name=total-scores]").innerHTML = totalScores
}

update()