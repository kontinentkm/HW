let products = [];
let filteredProducts = products;
const wrapper = document.querySelector('.wrapper');
wrapper.classList.add('row-cols-1', 'row-cols-md-4', 'g-3');

let yourOrderTotalPrice = document.querySelector('.yourOrderTotalPrice');
let yourOrdercalcAtButton = 0;
yourOrderTotalPrice.textContent = `Total: ${yourOrdercalcAtButton}.0$`;

let yourCardButton = document.querySelector('.yourCardButton');
yourCardButton.textContent = `You card - ${yourOrdercalcAtButton}.0$`;


const yourOrderBlock = document.querySelector('.yourOrderBlock');
const yourOrderCardsListNoItems = document.querySelector('.yourOrderCardsListNoItems');






fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
   console.log(data.products);
	
	products = data.products;
	addProductsToPage(products);
	search();
	addCardToYourOrder();
	yourOrderBlockShowHide();
	

});

function yourOrderBlockShowHide() {
	const darkBackground = document.querySelector('.darkBackground');
	yourCardButton.addEventListener('click', (event) => {
		if (yourOrderBlock.style.display === 'none') {
			yourOrderBlock.style.display = 'block';
			darkBackground.style.display = 'block';
			document.body.style.overflow = 'hidden';
		} else {
			yourOrderBlock.style.display = 'none';
			darkBackground.style.display = 'none';
			document.body.style.overflow = 'visible';
		}

	});
	
	const closeYourOrder = document.querySelector('.closeYourOrder');
	closeYourOrder.addEventListener('click', (event) => {
		yourOrderBlock.setAttribute('style', 'display: none')
		darkBackground.setAttribute('style', 'display: none')
		document.body.style.overflow = 'visible';
	});
}

function addPriceToYourCard(cardPrice) {
	yourOrdercalcAtButton = yourOrdercalcAtButton + cardPrice;
	yourOrderTotalPrice.textContent = `Total: ${yourOrdercalcAtButton}.0$`
	yourCardButton.textContent = `You card - ${yourOrdercalcAtButton}.0$`
	return;
}

function removePriceFromYourCard(cardPrice) {
	yourOrdercalcAtButton = yourOrdercalcAtButton - cardPrice;
	yourOrderTotalPrice.textContent = `Total: ${yourOrdercalcAtButton}.0$`
	yourCardButton.textContent = `You card - ${yourOrdercalcAtButton}.0$`
	return;
}


function yourCardOperations() {
	const cards = document.querySelectorAll('.list-group-item');
	
	cards.forEach(card => {
		const cardPrice = card.querySelector('.yourCardPriceButton');
		let currentCardPrice = +card.querySelector('.yourCardPriceButton').textContent;

		const plusButton = card.querySelector('.plusButton');
		plusButton.addEventListener('click', (event) => {
			currentCardPrice = currentCardPrice + +card.querySelector('.yourCardPriceButton').textContent;
			cardPrice.textContent = currentCardPrice;
			addPriceToYourCard(currentCardPrice);
		})
		

		const minusButton = card.querySelector('.minusButton');
		minusButton.addEventListener('click', (event) => {
			currentCardPrice = currentCardPrice - +card.querySelector('.yourCardPriceButton').textContent;
			cardPrice.textContent = currentCardPrice;
			removePriceFromYourCard(currentCardPrice)
		})
		
		const removeButton = card.querySelector('.removeButton');
		removeButton.addEventListener('click', (event) => {
			card.remove();
			removePriceFromYourCard(+card.querySelector('.yourCardPriceButton').textContent);
			emptyCard();
			
		})
	})
	return
}

function emptyCard() {
	const cards = document.querySelectorAll('.list-group-item');
	const yourOrderButton = document.querySelector('.yourOrderButton');

	if (cards.length !== 0) {
		yourOrderCardsListNoItems.setAttribute('style', 'display: none')
		yourOrderButton.classList.remove("disabled");
		return 
	} else {
		yourOrderCardsListNoItems.setAttribute('style', 'display: block')
		yourOrderButton.classList.add("disabled");
		return
	}
}

function addCardToYourOrder() {
	const cards = document.querySelectorAll('.card');
	const yourOrderCardsList = document.querySelector('.yourOrderCardsList');

	
	cards.forEach(card => {
		const cardButton = card.querySelector('button');
		cardButton.addEventListener('click', (event) => {
			const cardPrice = card.querySelector('.price');
			addPriceToYourCard(+cardPrice.textContent.slice(7).slice(0, -1));
			const addRemoveButton = createElement('button', ['removeButton', 'btn', 'btn-danger', 'm-1'], null, 'Remove from order');
			const addPlusButton = createElement('button', ['plusButton','btn', 'btn-secondary', 'm-1'], null, '+');
			const priceButtonAttributes = [
				{
				prop: 'style',
				value: 'border-radius: 19px;',
			  	},
		 	];
			const addPriceButton = createElement('button', ['yourCardPriceButton', 'btn', 'btn-primary', 'm-1'], priceButtonAttributes, +cardPrice.textContent.slice(7).slice(0, -1));
			const addMinusButton = createElement('button', ['minusButton', 'btn', 'btn-secondary', 'm-1'], null, '-');
			const addButtonsDiv = createElement('div', ['d-flex', 'align-items-center'], null, null,[addMinusButton, addPriceButton, addPlusButton, addRemoveButton], 'append' );
			const addTitle = createElement('p', ['m-2'], null, card.querySelector('h5').innerHTML);
			const imageAttributes = [
				{
				prop: 'src',
				value: card.querySelector('img').getAttribute('src'),
				},
				{
				prop: 'style',
				value: 'height: 50px; width: 50px',
			  	},
		 	];
			const addImage = createElement('img', ['img'], imageAttributes);
			const addImageTitleDiv = createElement('div', ['d-flex', 'align-items-center'], null, null,[addImage, addTitle], 'append' );
			const addCard = createElement('li', ['list-group-item', 'd-flex', 'align-items-center', 'justify-content-between'], null, null, [addImageTitleDiv, addButtonsDiv], 'append');
			yourOrderCardsList.appendChild(addCard);
			yourCardOperations();
			emptyCard();

		});
		
	})

}

function search() {
	const formElement = document.querySelector('form');
	const searchInput = document.querySelector('#searchInput');
	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		searchFunction(searchInput.value);
		addCardToYourOrder();
	});
}

function searchFunction(searchText) {
	let filteredProducts = products.filter((element) => {
		return (element.title.includes(searchText) 
		|| element.description.includes(searchText)) 
	})
	wrapper.innerHTML = "";
	addProductsToPage(filteredProducts);
}

function addProductsToPage(cards) {
	cards.forEach(product => {
		const cardImage =  createCardImage(product);
		const cardBody =  createCardBody(product);
		const cardFooter =  createCardFooter(product);
		const cardButtonAttributes = [
			{
		 prop: 'type',
		 value: 'submit',
			},
	 ];
		const cardButton = createElement('button', ['btn', 'btn-primary', 'mt-2'], cardButtonAttributes, 'Add to cart');
		const card = createElement('div', ['card', 'h-100'], null, null, [cardImage, cardBody, cardFooter, cardButton], 'append');
		const itemCol = createElement('div', ['col'], null, null, [card], 'append');
		wrapper.append(itemCol);
	});
}
	
function createCardImage(product) {
	const imageAttributes = [
	  	{
		prop: 'src',
		value: product.thumbnail,
	  	},
	  	{
		 prop: 'alt',
		 value: product.title,
	  	},
	  	{
		prop: 'style',
		value: 'height: 100%',
	 	},
	];
	const imageElement = createElement('img', ['card-img-top'], imageAttributes);
	const imageContainerElementAttributes = [
		{
		 prop: 'style',
		 value: 'height: 150px',
	  	},
	 ];
	const imageContainerElement = createElement('div', ['image-container'], imageContainerElementAttributes, null, [imageElement], 'append');
 
	return imageContainerElement;
 }

function createCardBody(product) {
	const bodyTitle = createElement('h5', ['card-title'], null, product.title);
	const bodyText = createElement('p', ['card-text'], null, product.description);
	const cardBody = createElement('div', ['card-body'], null, null, [bodyTitle, bodyText], 'append');

	return cardBody;
}

function createCardFooter(product) {
	const priceElement = createElement('small', ['price'], null, `Price: ${product.price}$`);
	const ratingElement = createElement('small', null, null, `Rating: ${product.rating}`);
	const cardFooter = createElement('div', ['card-footer', 'd-flex', 'justify-content-between'], null, null, [priceElement, ratingElement], 'append');

	return cardFooter;
}

function createElement(tag, classList, attributes, textContent, children, childrenAction) {
	const element = document.createElement(tag);
 
	if (classList) {
	  element.classList.add(...classList);
	}
 
	if (attributes?.length) {
	  attributes.forEach(({ prop, value }) => {
		 element.setAttribute(prop, value);
	  });
	}
 
	if (textContent) {
	  element.textContent = textContent;
	}
 
	if (children) {
	  element[childrenAction](...children);
	}
 
	return element;
}
