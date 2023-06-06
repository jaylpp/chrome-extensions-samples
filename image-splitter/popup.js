document.getElementById('imageFile').addEventListener('change', (event) => {
  const imageFile = event.target.files[0];
  const image = new Image();
  const reader = new FileReader();

  reader.onload = function(e) {
    image.src = e.target.result;

    image.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const { width, height } = image;

      canvas.width = width / 2;
      canvas.height = height / 2;

      for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
          ctx.drawImage(
            image, 
            x * canvas.width, y * canvas.height, canvas.width, canvas.height, 
            0, 0, canvas.width, canvas.height
          );
          const dataURL = canvas.toDataURL('image/png');
          chrome.downloads.download({ url: dataURL, filename: `image_part_${x}_${y}.png`, saveAs: false });
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  };

  reader.readAsDataURL(imageFile);
});
