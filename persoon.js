function displayImage() {
    const name = document.getElementById('nameInput').value;
    console.log(`Name: ${name}`);

    const imageSrc = 'https://media.istockphoto.com/id/1332100919/nl/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=xtNyi-UkCmWF19N6JfuLj2-VfXiCVOiybEvqWXG38WA=';
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    document.body.appendChild(imageElement);
  }