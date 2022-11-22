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
let index = '';




fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
   console.log(data.products);
	
	products = data.products;
	addProductsToPage(products);
	search();
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

function search() {
	const formElement = document.querySelector('form');
	const searchInput = document.querySelector('#searchInput');
	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		searchFunction(searchInput.value);
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

function allPricesCalc() {
	yourOrdercalcAtButton = 0;
	const allPrices = document.querySelectorAll('.cardPrice');
	const allCounts = document.querySelectorAll('.cardCount');
	for (let i = 0; i < allPrices.length; i++) {
		yourOrdercalcAtButton = yourOrdercalcAtButton + allPrices[i].textContent * allCounts[i].textContent
	}
	yourOrderTotalPrice.textContent = `Total: ${yourOrdercalcAtButton}.0$`
	yourCardButton.textContent = `You card - ${yourOrdercalcAtButton}.0$`
}

function cardRemove(card) {
	const yourCardListGroup = document.querySelectorAll('.list-group-item');
	const newArray = Array.from(yourCardListGroup);
	let trueFalse = newArray.some((item, i) => {
		index = i
		return item.innerText.includes(card.title)
	});
	if (trueFalse) {
		yourCardListGroup[index].remove();
		allPricesCalc();
		emptyCard();
	} 
}

function minusButton(card) {
	const yourCardListGroup = document.querySelectorAll('.list-group-item');
	const newArray = Array.from(yourCardListGroup);
	let trueFalse = newArray.some((item, i) => {
		index = i
		return item.innerText.includes(card.title)
	});
	if (trueFalse) {
		const count = yourCardListGroup[index].querySelector('.cardCount');
		count.innerText = +count.innerText - 1;
		allPricesCalc();
		if (+count.innerText === 0) {
			cardRemove(card);
		}
	} 
}

function addCardToYourOrder(card) {
	const yourCardListGroup = document.querySelectorAll('.list-group-item');
	const newArray = Array.from(yourCardListGroup);

	let trueFalse = newArray.some((item, i) => {
		index = i
		return item.innerText.includes(card.title)
	});

	if (trueFalse) {
		const count = yourCardListGroup[index].querySelector('.cardCount');
		count.innerText = +count.innerText + 1;
		allPricesCalc();
	} else creatYourOrderCard(card);	

}

function creatYourOrderCard(card) {
	const yourOrderCardsList = document.querySelector('.yourOrderCardsList');
	const addRemoveButton = createElement('button', ['removeButton', 'btn', 'btn-danger', 'm-1'], null, 'Remove from order');
	addRemoveButton.addEventListener('click', (event) => {
		cardRemove(card);
	});
	const addPlusButton = createElement('button', ['plusButton','btn', 'btn-secondary', 'm-1'], null, '+');
	addPlusButton.addEventListener('click', (event) => {
		addCardToYourOrder(card);
	});
	const cardCount = createElement('div', ['cardCount'], null, 1);
	const x = createElement('div', ['m-1'], null, 'x');
	const cardPriceAttributes = [
		{
		prop: 'style',
		value: 'border-radius: 19px;',
		},
		{
		prop: 'data-price',
		value: card.price,
		},
	];
	const cardPrice = createElement('div', ['cardPrice'], cardPriceAttributes, card.price);
	const priceButtonAttributes = [
		{
		prop: 'style',
		value: 'border-radius: 19px;',
		},
	];
	const addPriceButton = createElement('button', ['yourCardPriceButton', 'btn', 'btn-primary', 'm-1', 'd-flex', 'align-items-center'], priceButtonAttributes, null, [cardCount, x, cardPrice], 'append');
	const addMinusButton = createElement('button', ['minusButton', 'btn', 'btn-secondary', 'm-1'], null, '-');
	addMinusButton.addEventListener('click', (event) => {
		minusButton(card);
	});
	const addButtonsDiv = createElement('div', ['d-flex', 'align-items-center'], null, null,[addMinusButton, addPriceButton, addPlusButton, addRemoveButton], 'append' );
	const addTitle = createElement('p', ['yourCardTitle', 'm-2'], null, card.title);
	const imageAttributes = [
		{
		prop: 'src',
		value: card.thumbnail,
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
	emptyCard();
	allPricesCalc();
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
		cardButton.addEventListener('click', (event) => {
			addCardToYourOrder(product);
		});
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
