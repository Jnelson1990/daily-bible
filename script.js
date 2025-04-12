// Live Date and Time
window.onload = function () {
    setInterval(function () {
      const date = new Date();
      const displayDate = date.toLocaleDateString();
      const displayTime = date.toLocaleTimeString();
      document.getElementById('datetime').innerHTML = `${displayDate} ${displayTime}`;
    }, 1000);
  };
  
  // Verse of the Day
  const verses = [
    { reference: "John 3:16", text: "For God so loved the world, that he gave his only Son..." },
    { reference: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
    { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
    { reference: "Jeremiah 29:11", text: "'For I know the plans I have for you,' declares the Lord..." },
    { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding..." },
    { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him..." },
    { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God..." }
  ];
  
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const verseIndex = dayOfYear % verses.length;
  const verse = verses[verseIndex];
  const verseDisplay = document.getElementById("verse");
  
  fetch(`https://bible-api.com/${encodeURIComponent(verse.reference)}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.text) {
        verseDisplay.textContent = `${data.text.trim()} – ${data.reference}`;
      } else {
        throw new Error("API gave no text");
      }
    })
    .catch(error => {
      console.warn("API failed, using local fallback.", error);
      verseDisplay.textContent = `${verse.text} – ${verse.reference}`;
    });
  
  // Dark mode logic
  const themeToggle = document.getElementById("themeSwitch");
  const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  function setTheme(dark) {
    document.body.classList.toggle("dark", dark);
    themeToggle.checked = dark;
    localStorage.setItem("theme", dark ? "dark" : "light");
  }
  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme === "dark");
  } else {
    setTheme(userPrefersDark.matches);
  }
  
  themeToggle.addEventListener("change", () => {
    setTheme(themeToggle.checked);
  });
  
  const searchForm = document.getElementById("searchForm");
const verseInput = document.getElementById("verseInput");
const searchResult = document.getElementById("searchResult");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = verseInput.value.trim();

  if (!query) return;

  fetch(`https://bible-api.com/${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.text) {
        searchResult.textContent = `${data.text.trim()} – ${data.reference}`;
      } else {
        searchResult.textContent = "Verse not found.";
      }
    })
    .catch(err => {
      console.error("Error fetching verse:", err);
      searchResult.textContent = "Something went wrong. Please try again.";
    });
});
