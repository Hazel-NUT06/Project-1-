document.addEventListener("DOMContentLoaded", () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Supported letters
    const soundFolder = 'sounds/'; // Path to your sound files folder
    const soundExtension = '.wav'; // File extension for your sound files
    const backgroundMusic = document.getElementById('background-music');
    const normalVolume = 1; // Normal background music volume
    const loweredVolume = 0.5; // Volume when a letter is pressed
  
    // Set initial background music volume
    backgroundMusic.volume = normalVolume;
  
    // Function to start background music after user interaction (required for autoplay)
    const playMusic = () => {
      backgroundMusic.play().catch((error) => {
        console.log('Autoplay prevented:', error.message);
      });
      document.removeEventListener('click', playMusic); // Remove event listener after playing music
    };
  
    // Add click event listener to start background music
    document.addEventListener('click', playMusic);
  
    // Create alphabet buttons dynamically
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
  
    // Function to play sound for a specific letter
    function playSound(letter) {
      const audio = new Audio(`${soundFolder}${letter}${soundExtension}`);
      // Lower the background music volume
      backgroundMusic.volume = loweredVolume;
  
      // Play the letter sound
      audio.play();
  
      // When the letter sound ends, restore the background music volume
      audio.addEventListener('ended', () => {
        backgroundMusic.volume = normalVolume;
      });
    }
  
    // Attach event listeners to each alphabet button
    document.querySelectorAll('.alphabet-button').forEach((button) => {
      button.addEventListener('click', () => {
        const letter = button.dataset.letter;
        playSound(letter);
      });
    });
  
    // Pronounce a word entered in the text box using SpeechSynthesis
    function pronounceWord() {
      const word = document.getElementById('word').value.trim();
      const output = document.getElementById('output');
  
      if (!word) {
        output.textContent = "Please enter a word!";
        return;
      }
  
      // Lower the background music volume before speech synthesis
      backgroundMusic.volume = loweredVolume;
  
      // Create a SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      
      // Play the pronunciation
      window.speechSynthesis.speak(utterance);
  
      // Once the speech is done, restore the background music volume
      utterance.onend = () => {
        backgroundMusic.volume = normalVolume;
      };
  
      output.textContent = `Playing pronunciation for "${word}"...`;
    }
  
    // Expose pronounceWord function globally for button click
    window.pronounceWord = pronounceWord;
  });
  