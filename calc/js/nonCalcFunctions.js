document.addEventListener('keydown', event => {
	if ((event.key).match(/[0-9%\/*\-+.\(\)=]|Backspace|Enter/)) keaboardOrScreen(event)
})

function keaboardOrScreen(event) {
	if (event.key) return calc(event.key) 
	else {
		if(!event.target.classList.contains('btn')) return;
		return calc(event.target.textContent)
	}
}

const observer = new MutationObserver(
	function(mutations) {
		if (a.toString().length > 7) {
			calcScreenBottom.style.fontSize = 450 / a.toString().length + 'px';
		} else {
			calcScreenBottom.style.fontSize = '4rem';
		}

		if (b.toString().length > 7) {
			calcScreenBottom.style.fontSize = 450 / b.toString().length + 'px';
		} 
	}
);
observer.observe(calcScreenBottom, { childList: true });
