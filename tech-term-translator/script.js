const translations = {
  "microsoft teams": "The app that requires 3 logins and still drops your call.",
  "clippy": "Your overly enthusiastic but completely unhelpful paperclip coworker.",
  "ai": "Magic marketing term for 'if statements' and unfinished features.",
  "synergy": "We don’t know what it means either, but it sounds important.",
  "scrum": "Meetings about meetings, but with a timer.",
  "blockchain": "A slow, expensive database that makes investors excited.",
  "cloud": "Someone else’s computer. Still goes down. Still your fault.",
  "agile": "We change our minds weekly. You adapt or perish.",
  "mfa": "Let’s make you prove your identity 6 times before 9am.",
  "jira": "Project management meets existential dread."
};

const clippyQuotes = [
  "It looks like you're trying to survive a status meeting...",
  "Need help turning this buzzword into a deliverable?",
  "Tip: Try rebooting your stakeholders.",
  "Don't worry — Teams will ask you to log in again soon.",
  "Clippy recommends: more synergy."
];

document.getElementById('translateBtn').addEventListener('click', function () {
  const input = document.getElementById('termInput').value.toLowerCase().trim();
  const translation = translations[input] || "Sorry, that's not in our corporate dictionary (yet).";
  const resultBox = document.getElementById('resultBox');
  resultBox.textContent = translation;

  // Rotate clippy quote
  const clippyQuote = document.getElementById('clippyQuote');
  clippyQuote.textContent = clippyQuotes[Math.floor(Math.random() * clippyQuotes.length)];
});
