const valueHandler = (event) => {
    console.log(event);
    if (event > 0) {
        let paragraph = document.createElement('p');
        paragraph.textContent = `Hello World! Value is ${event}`
        paragraph.style.fontSize = 18;
        const textArea = document.getElementById('myTextarea');
        textArea.insertAdjacentElement('afterend', paragraph)
    }
}

const textarea = document.getElementById('myTextarea');
const dropdownContent = document.getElementById('dropdownContent');
textarea.addEventListener('click', function () {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

const options = dropdownContent.querySelectorAll('option');
options.forEach(option => {
    option.addEventListener('click', function () {
        textarea.value = option.textContent;
        dropdownContent.style.display = 'none';
        valueHandler(option.value)
    });
});
