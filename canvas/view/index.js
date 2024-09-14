import CanvasArgs from "../data/CanvasArgs.js";

const canvas = document.getElementById('demotivatorCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;  // Ширина canvas
canvas.height = 600;  // Высота canvas

const errorElement = document.getElementById('error');

// Функция для обновления Canvas с обработкой ошибок
async function updateCanvas(texts, images) {
    try {
        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let a = document.getElementById("typecanvas").value
        const o = await import("../"+a+".js");
        const args = new CanvasArgs(texts, ProcessImage);
        await args.AddImages(images)
        await o.default.execute(canvas, ctx, args);

        errorElement.style.display = 'none';
    } catch (error) {
        // Если произошла ошибка, выводим ее на экран
        errorElement.textContent = `Ошибка: ${error.message}`;
        errorElement.style.display = 'block'; // Показываем блок с ошибкой
        console.error(error);
    }
}

async function ProcessImage(file) {
    return new Promise((resolve, reject)=>{
        if(typeof file === "string"){
            const img = new Image();
            img.src = "../../"+file;
            img.onload = () => resolve(img);
    
        }else if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => resolve(img);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        } else {
            resolve(null);
        }
    })
}

// Добавление нового текстового поля
document.getElementById('addTextButton').addEventListener('click', () => {
    const textFieldsContainer = document.getElementById('textFieldsContainer');
    const newTextDiv = document.createElement('div');
    newTextDiv.classList.add('dynamic-text');
    newTextDiv.innerHTML = `
        <input type="text" placeholder="Текст" required>
        <button type="button" class="removeText">Удалить</button>
    `;
    textFieldsContainer.appendChild(newTextDiv);
});

// Добавление нового поля для загрузки изображения
document.getElementById('addImageButton').addEventListener('click', () => {
    const imageFieldsContainer = document.getElementById('imageFieldsContainer');
    const newImageDiv = document.createElement('div');
    newImageDiv.classList.add('dynamic-image');
    newImageDiv.innerHTML = `
        <input type="file" accept="image/*" required>
        <button type="button" class="removeImage">Удалить</button>
    `;
    imageFieldsContainer.appendChild(newImageDiv);
});

// Удаление текстового поля
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeText')) {
        event.target.parentElement.remove();
    }
});

// Удаление поля для изображения
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeImage')) {
        event.target.parentElement.remove();
    }
});

// Обработчик отправки формы
document.getElementById('canvasForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Собираем все тексты
    const texts = Array.from(document.querySelectorAll('#textFieldsContainer input')).map(input => input.value);

    // Собираем все изображения
    const images = Array.from(document.querySelectorAll('#imageFieldsContainer input')).map(input => input.files[0]);

    updateCanvas(texts, images);
});