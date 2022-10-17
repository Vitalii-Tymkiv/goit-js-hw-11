function createImageMarkup(photos) {
  return photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return /*html*/ `<div class="photo-card">
      <a href ="${largeImageURL}" class ="gallery-link">
  <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <div class="info-item">
      <b class='info-name'>Likes
      <span class='info-number'>${likes}</span>
      </b>
      
    </div>
    <div class="info-item">
      <b class='info-name'>Views
      <span class='info-number'>${views}</span>
      </b>
      
    </div>
    <div class="info-item">
      <b class='info-name'>Comments
      <span class='info-number'>${comments}</span>
      </b>
      
    </div>
    <div class="info-item">
      <b class='info-name'>Downloads
      <span class='info-number'>${downloads}</span>
      </b>
      
    </div>
  </div>
  </a>
</div>`;
      }
    )
    .join('');
}

export { createImageMarkup };

//  <a href ="" class ="gallery-link"></a>
