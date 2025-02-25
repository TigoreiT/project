export class MainPage {
	constructor(parent) {
		this.parent = parent
	}

	render() {
		this.parent.insertAdjacentHTML(
			'beforeend',
			'<button type="button" class="btn btn-primary">Hello world 3!</button>'
		)
	}
}
