fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
   console.log(data.products);
   // Start here :)
	
	const cards = data.products;
	const wrapper = document.querySelector('.wrapper');
	wrapper.classList.add('row-cols-1', 'row-cols-md-4', 'g-3');
	
	
	for (let i = 0; i < cards.length; i++) {


		let 	col = document.createElement('div'),
				card = document.createElement('div'),
				cardBody = document.createElement('div'),
				carouselSlide = document.createElement('div'),
				carouselInner = document.createElement('div'),
				cardTitle = document.createElement('h5'),
				cardDescription = document.createElement('p'),
				cardFooter = document.createElement('div'),
				cardPrice = document.createElement('small'),
				cardRatingInfo = document.createElement('small');


		col.className = 'col';
		card.className = 'card h-100';
		carouselSlide.className = 'carousel slide';
		carouselSlide.setAttribute('data-bs-ride', 'carousel');
		carouselInner.className = 'carousel-inner';

		// <carousel>
		// начинает автоматом скролится только когда полистаешь слайды, наверно особенность бутсраповского слайдера
		for (let j = 0; j < cards[i].images.length; j++) {
			let 	carouselItem = document.createElement('div'),
					cardImage = document.createElement('img'),
					carouselButtons = document.createElement('div');

			carouselSlide.setAttribute('id', `carouselControls${i}${j}`);
			cardImage.className = 'd-block w-100';
			carouselItem.className = 'carousel-item';
			carouselItem.setAttribute('style', 'height: 150px')
			if (j === 0) {
				carouselItem.className = 'carousel-item active';
			}
			cardImage.src = cards[i].images[j];
			cardImage.setAttribute('style', 'min-height: 150px')
			carouselButtons.innerHTML = `<button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${i}${j}"  data-bs-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Предыдущий</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselControls${i}${j}"  data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Следующий</span></button>`

			carouselInner.appendChild(carouselItem);
			carouselItem.appendChild(cardImage);
			carouselInner.appendChild(carouselButtons);
		}
		// </carousel>

		cardBody.className = 'card-body';
		cardTitle.className = 'card-title';
		cardDescription.className = 'card-text';
		cardFooter.className = 'card-footer d-flex justify-content-between';


		cardTitle.textContent = cards[i].title;
		cardDescription.textContent = cards[i].description;
		cardPrice.textContent = `Price: ${cards[i].price}$`;
		cardRatingInfo.textContent = `Rating: ${cards[i].rating}`;


		wrapper.appendChild(col);
		col.appendChild(card);
		card.appendChild(carouselSlide);
		carouselSlide.appendChild(carouselInner);
		card.appendChild(cardBody);
		cardBody.appendChild(cardTitle);
		cardBody.appendChild(cardDescription);
		card.appendChild(cardFooter);
		cardFooter.appendChild(cardPrice);
		cardFooter.appendChild(cardRatingInfo);
	

	}
  });
