const saying = ['That which does not kill us makes us stronger. -- Friedrich Nietzsche', 'A wise man never loses anything if he has half. -- Friedrich Nietzsche', 'He who has a strong enough why can bear almost any how. -- Friedrich Nietzsche', 'Faith: not wanting to know what the truth is. -- Friedrich Nietzsche', 'Growth in wisdom may be exactly measured by decrease in bitterness. -- Friedrich Nietzsche']
const result = saying[Math.floor(Math.random() * 5)]
const footerText = document.querySelector('#footer-text')
footerText.innerHTML = result