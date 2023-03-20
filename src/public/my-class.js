document.addEventListener('DOMContentLoaded', () => {
    const house = document.getElementById('house');
    const className = document.getElementById('className');
    const placeholder = document.querySelector('.placeholder');
    const getClassName = document.getElementById('getClassName').innerText;
    house.addEventListener('click', () => {
        className.textContent = getClassName; // Replace 'Your Class Name' with the actual class name from your data
        className.style.display = 'block';
        placeholder.style.display = 'none';
    });
});