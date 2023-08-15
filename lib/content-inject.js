async function cleanWhitespace(codeString, language) {
  if (prettier) {
    return await prettier.format(codeString, {
      parser: language,
      plugins: prettierPlugins,
    });
  }
  let [delimit] = codeString.match(/\n\s+/);
  return codeString.trim().replaceAll(delimit, "\n");
}

document.addEventListener("DOMContentLoaded", async (e) => {
  // grab slide markup and clone its text into the display element
  let slideContentEl = document.getElementById("slide-content");
  let slideMarkupDisplayEl = document.getElementById("slide-markup-display");

  slideMarkupDisplayEl.textContent = await cleanWhitespace(
    slideContentEl.innerHTML,
    "html"
  );

  let slideStyleEl = document.getElementById("slide-style");
  let slideStyleDisplayEl = document.getElementById("slide-style-display");
  slideStyleDisplayEl.textContent = await cleanWhitespace(
    slideStyleEl.textContent,
    "css"
  );

  hljs.configure({
    cssSelector: "[data-code-display]",
    ignoreUnescapedHTML: true,
  });
  hljs.highlightAll();
  document.documentElement.classList.remove("un-ready");
});
