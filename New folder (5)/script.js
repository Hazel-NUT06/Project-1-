document.addEventListener("DOMContentLoaded", () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const soundFolder = 'sounds/'; 
    const soundExtension = '.wav'; 
    const backgroundMusic = document.getElementById('background-music');
    const normalVolume = 1; 
    const loweredVolume = 0.5; 
  
    
    backgroundMusic.volume = normalVolume;
  
    
    const playMusic = () => {
      backgroundMusic.play().catch((error) => {
        console.log('Autoplay prevented:', error.message);
      });
      document.removeEventListener('click', playMusic); 
    };
  
    document.addEventListener('click', playMusic);
  
  
    document.querySelector('.alphabet-container').innerHTML = letters
      .split('')
      .map(
        (letter) => `
          <button class="alphabet-button" data-letter="${letter}">
            ${letter}
          </button>
        `
      )
      .join('');
  

    function playSound(letter) {
      const audio = new Audio(`${soundFolder}${letter}${soundExtension}`);

      backgroundMusic.volume = loweredVolume;
  
      audio.play();
  
    
      audio.addEventListener('ended', () => {
        backgroundMusic.volume = normalVolume;
      });
    }
  
    document.querySelectorAll('.alphabet-button').forEach((button) => {
      button.addEventListener('click', () => {
        const letter = button.dataset.letter;
        playSound(letter);
      });
    });
  
    function pronounceWord() {
      const word = document.getElementById('word').value.trim();
      const output = document.getElementById('output');
  
      if (!word) {
        output.textContent = "Please enter a word!";
        return;
      }
  
      backgroundMusic.volume = loweredVolume;
  
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      
      window.speechSynthesis.speak(utterance);
  
      utterance.onend = () => {
        backgroundMusic.volume = normalVolume;
      };
  
      output.textContent = `Playing pronunciation for "${word}"...`;
    }
    window.pronounceWord = pronounceWord;
  });
  