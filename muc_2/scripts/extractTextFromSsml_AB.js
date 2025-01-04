const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const extractTextFromSsmlWithLabels = async (inputPath, outputPath) => {
    try {
        // Đọc file ssml.xml
        const filePath = path.resolve(inputPath);
        const xmlData = fs.readFileSync(filePath, 'utf8');

        // Parse XML
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);

        // Trích xuất text từ thẻ <voice> và gắn label
        const dialogues = result.speak.voice.map((voice, index) => {
            const label = index % 2 === 0 ? 'A' : 'B'; // Gắn nhãn A hoặc B
            return `${label}: ${voice._}`;
        }).join('\n');

        // Kiểm tra và tạo thư mục output nếu chưa tồn tại
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Ghi nội dung ra file output_AB.txt
        const outputFilePath = path.resolve(outputPath);
        fs.writeFileSync(outputFilePath, dialogues);
        console.log('Text with labels successfully extracted to:', outputFilePath);
    } catch (error) {
        console.error('Error extracting text with labels:', error);
    }
};

// Chạy hàm
extractTextFromSsmlWithLabels('./input/ssml.xml', './output/output_AB.txt');
