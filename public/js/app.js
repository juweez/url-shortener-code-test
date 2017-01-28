var urlShortenerForm = document.querySelector('.js-shortener-form'),
    urlShortenerInput = document.querySelector('.js-shortener-input')
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
      urlShortenerInput.value = JSON.parse(xhr.responseText).short_url;
      urlShortenerInput.select();
    }
  }
});
