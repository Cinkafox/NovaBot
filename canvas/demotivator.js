import CanvasArgs from "./data/CanvasArgs.js";
import CanvasCompound from "./data/CanvasCompound.js";

/**
 * 
 * @param {*} canvas 
 * @param {*} ctx 
 * @param {CanvasArgs} args 
 */
let func = function(canvas,ctx, args){
     const image = args.images[0];

     // Устанавливаем максимальные размеры canvas
    const maxCanvasWidth = 800;  // Максимальная ширина
    const maxCanvasHeight = 800; // Максимальная высота

     // Исходные размеры изображения
     const originalImageWidth = image.width;
     const originalImageHeight = image.height;

     // Пропорции для холста
     const paddingRatio = 0.08;  // Процент от ширины на отступы
     const borderWidthRatio = 0.005;  // Процент от ширины на границу
     const textHeightRatio = 0.1;  // Процент от высоты на текст (для основного и дополнительного текста)

     // Рассчитываем коэффициент масштабирования, чтобы изображение не выходило за пределы максимальных размеров
     const scaleWidth = maxCanvasWidth / originalImageWidth;
     const scaleHeight = maxCanvasHeight / (originalImageHeight + (originalImageHeight * textHeightRatio * 2) + (originalImageWidth * paddingRatio * 2));
     const scaleFactor = Math.min(scaleWidth, scaleHeight); // Выбираем минимальный коэффициент для сохранения пропорций

     // Применяем масштабирование к ширине и высоте изображения
     const imageWidth = originalImageWidth * scaleFactor;
     const imageHeight = originalImageHeight * scaleFactor;

     // Рассчитываем ширину и высоту холста с учётом текстов и отступов
     const canvasWidth = imageWidth * 1.2; // Увеличим ширину для рамки и отступов
     const canvasHeight = imageHeight + (imageHeight * textHeightRatio * 2) + (imageWidth * paddingRatio * 2);

     // Устанавливаем размер холста
     canvas.width = canvasWidth;
     canvas.height = canvasHeight;

     // Отступы и рамки
     const padding = canvasWidth * paddingRatio;
     const borderWidth = canvasWidth * borderWidthRatio;
     const imageX = (canvasWidth - imageWidth) / 2;
     const imageY = padding;

     // Позиция текста
     const mainTextY = imageY + imageHeight + padding;
     const subTextY = mainTextY + imageHeight * textHeightRatio;

     // Заливка фона холста
     ctx.fillStyle = '#000';
     ctx.fillRect(0, 0, canvas.width, canvas.height);

     // Отображение изображения
     ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

     // Рисуем рамку
     ctx.strokeStyle = '#fff';
     ctx.lineWidth = borderWidth;
     ctx.strokeRect(imageX - padding / 2, imageY - padding / 2, imageWidth + padding, imageHeight + padding);

     // Основной текст
     ctx.font = `${Math.floor(canvasWidth * 0.07)}px Times New Roman`;  // Шрифт пропорционален ширине холста
     ctx.fillStyle = '#fff';
     ctx.textAlign = 'center';
     ctx.fillText(args.args[0], canvasWidth / 2, mainTextY + 20);

     // Дополнительный текст
     ctx.font = `${Math.floor(canvasWidth * 0.05)}px Times New Roman`;  // Дополнительный текст поменьше
     ctx.fillStyle = '#aaa';
     ctx.fillText(args.args[1], canvasWidth / 2, subTextY + 20);
}

export default new CanvasCompound(2,1,[],func);