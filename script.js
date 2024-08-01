async function convertToPDF() {
    const { jsPDF } = window.jspdf;
    const input = document.getElementById('fileInput');
    const files = input.files;

    if (files.length === 0) {
        alert("Please select at least one image file.");
        return;
    }

    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);

        await new Promise((resolve) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Set watermark font and color
                ctx.font = 'bold 30px Arial'; // Make the text bold and larger
                ctx.fillStyle = 'white'; // Set the text color to white
                ctx.textAlign = 'right'; // Align text to the right
                ctx.fillText('pdf scanner made by Soham Pal', canvas.width - 10, canvas.height - 10); // Position with some margin

                const imgData = canvas.toDataURL('image/jpeg');
                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

                resolve();
            };
        });
    }

    pdf.save('output.pdf');
}
