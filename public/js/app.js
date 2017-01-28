var urlShortenerForm = document.querySelector('.js-shortener-form'),
    urlShortenerInput = document.querySelector('.js-shortener-input')
    urlList = document.querySelector('.js-url-list'),
    postUrl = urlShortenerForm.getAttribute('action');

urlShortenerForm.addEventListener("submit", function(e) {
  e.preventDefault();

  var urlShortenerInputValue = urlShortenerInput.value,
      xhr = new XMLHttpRequest();

  if (urlShortenerInputValue) {
    xhr.open('POST', postUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send('url='+urlShortenerInputValue);
  }

  xhr.onload = function() {
    if (xhr.responseText) {
      var response = JSON.parse(xhr.responseText);

      urlShortenerInput.value = response.short_url;
      urlShortenerInput.select();

      addUrlToList(response.original_url, response.short_url);
    }
  }
});

function addUrlToList(originalUrl, shortUrl) {
  var t = document.querySelector('#urlListTemplate'),
      list = document.querySelector('.js-list'),
      listItem = t.content.querySelector('li'),
      listItemOriginal = t.content.querySelector('.js-original-url a'),
      listItemShort = t.content.querySelector('.js-short-url a');

  var allListItems = document.querySelectorAll('.js-list li');

  allListItems.forEach(function(el) {
    el.classList.remove('m-list__item--highlight');
  });

  listItemOriginal.textContent = originalUrl;
  listItemOriginal.setAttribute('href', originalUrl);
  listItemShort.textContent = shortUrl;
  listItemShort.setAttribute('href', shortUrl);
  listItem.classList.add('m-list__item--highlight');

  var clone = document.importNode(t.content, true);
  list.insertBefore(clone, list.firstChild);
};
