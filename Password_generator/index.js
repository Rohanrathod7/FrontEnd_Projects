const generateBtn = document.getElementById('generateBtn');
const passwordEl = document.getElementById('password');
const lengthInput = document.getElementById('length');
const copyBtn = document.getElementById('copyBtn');

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword(length) {
  let result = '';
  for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 6 || length > 32) {
    alert('Please enter a length between 6 and 32');
    return;
  }
  const password = generatePassword(length);
  passwordEl.textContent = password;
});

copyBtn.addEventListener('click', () => {
  const password = passwordEl.textContent;
  if (!password || password === 'Your password will appear here') return;
  navigator.clipboard.writeText(password).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy Password';
    }, 1500);
  });
});
