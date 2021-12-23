const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// complete function
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  loading();
  //   pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = !quote.author
    ? (authorText.textContent = "unknown")
    : quote.author;
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  //  set Quote, hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catch Error Here
    console.log(err);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load

getQuotes();
