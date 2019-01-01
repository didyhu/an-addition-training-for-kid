import ChooseLesson from "./components/choose_lesson.js"
import Lesson from "./components/lesson.js"
customElements.define("choose-lesson", ChooseLesson)
customElements.define("my-lesson", Lesson)

document.addEventListener("onlessonexit", () => {
    document.querySelector("my-lesson").classList.add("hidden")
    document.querySelector("choose-lesson").classList.remove("hidden")
})
document.addEventListener("onchooselesson", () => {
    document.querySelector("my-lesson").classList.remove("hidden")
    document.querySelector("choose-lesson").classList.add("hidden")
})