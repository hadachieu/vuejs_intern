const fs = require('fs');
const path = require('path');

// Hàm trích xuất timestamp từ file JSON
const extractTimestamp = (inputPath, outputPath) => {
    try {
        // Đường dẫn đầy đủ tới file input và output
        const inputFilePath = path.resolve(inputPath);
        const outputDir = path.dirname(outputPath);
        const outputFilePath = path.resolve(outputPath);

        // Tạo thư mục output nếu chưa tồn tại
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Đọc nội dung file JSON
        const data = fs.readFileSync(inputFilePath, 'utf8');
        const jsonData = JSON.parse(data);

        // Kiểm tra xem timestamp có tồn tại và đúng định dạng
        if (!jsonData.timestamp || !Array.isArray(jsonData.timestamp)) {
            console.error('File JSON không chứa trường "timestamp" hợp lệ.');
            return;
        }

        // Xử lý dữ liệu từ mảng timestamp
        const outputData = jsonData.timestamp.map(entry => {
            // Mỗi entry là một mảng với 4 giá trị
            const [timeEllapsed, duration, index, wordLength] = entry;

            // Kiểm tra các giá trị
            if (
                typeof timeEllapsed === 'number' &&
                typeof duration === 'number' &&
                typeof index === 'number' &&
                typeof wordLength === 'number'
            ) {
                return `${timeEllapsed},${duration},${index},${wordLength}`;
            } else {
                console.error('Dữ liệu không hợp lệ trong entry:', entry);
                return null;
            }
        }).filter(Boolean); // Loại bỏ các giá trị null

        // Ghi dữ liệu vào file output
        fs.writeFileSync(outputFilePath, outputData.join('\n'), 'utf8');
        console.log(`Dữ liệu đã được xuất ra file ${outputFilePath}`);
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
};

// Chạy hàm
extractTimestamp('./input/timestamp.json', './output/timestamp.txt');