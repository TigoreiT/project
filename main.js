import { MainPage } from './pages/main/index.js'
import { ButtonComponent } from '../../components/button/index.js'

const root = document.getElementById('root')

const mainPage = new MainPage(root)
mainPage.render = function () {
	/* вместо mainPage.render() -> {mainPage.render = function () { (лаб.3 шаг 7) */
	const button = new ButtonComponent(this.parent)
	button.render()
}
mainPage.render() /* вместо ' ' -> mainPage.render() (лаб.3 шаг 7)*/
