console.log("start reading time");
const article = document.querySelector("main");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  console.log("this page contains article");
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  // assume that people read 200 words every minute
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read -- 熊猫Jay`;

  // Support for API reference docs , for csdn
  const heading = article.querySelector(".title-article");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;
  console.log("heading", heading);
  console.log("date", date);
  (date ?? heading).insertAdjacentElement("afterend", badge);
} else {
  console.log("this page does not contain article");
}
console.log("end reading time");
