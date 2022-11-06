(() => {
  try {
    const searchInputEl = document.querySelector("#search-input");
    const root = document.querySelector("#main");
    const formEl = document.querySelector("#form");
    let inputValue;

    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      inputValue = searchInputEl.value;
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`
      );
      const data = await response.json();
      render(data);
    });

    function render(arr) {
      root.innerHTML = "";
      arr.forEach((element) => {
        let sectionEl = `<section>
        <div class="dictionary-content">
          <h2 class="dictionary-title">${element.word} - ${element.phonetic}</h2>`;

        element.meanings.forEach((item) => {
          sectionEl += `<p class="dictionary-text">${
            item.definitions[0].definition
          }</p>
          <span class="dictionary-span">${
            item.definitions[0].example ? item.definitions[0].example : ""
          }
          </span>`;
        });
        sectionEl += `</div><div class="dictionary-audio">
          <h3 class="dictionary-audio-title">"A dwelling."</h3>
          <div class="dictionary-audio-wrapper">
            <audio src="${element.phonetics[0].audio}" controls></audio>
            <span class="dictionary-audio-span">Play the word</span>
          </div>
        </div>
      </section>`;

        root.innerHTML += sectionEl;
      });
    }
  } catch (error) {
    console.log(error);
  }
})();
