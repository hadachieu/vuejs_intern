# vuejs_intern

Các bước làm của 4 phần:
Mục 1:
- Tạo file
+ input/ssml.xml
+ scripts/extractTextFromSsml.js
- Chạy "npm install xml2js"
- Chạy node "scripts/extractTextFromSsml.js" sẽ trả về file output/output.txt

Mục 2:
- Tạo file
+ input/ssml.xml
+ scripts/extractTextFromSsml_AB.js
- Chạy "npm install xml2js"
- Chạy node "scripts/extractTextFromSsml_AB.js" sẽ trả về file output/output_AB.txt


Mục 3:
- Tạo file
+ input/timestamp.json
+ scripts/node scripts/extractTimestamp.js
- Chạy "npm install xml2js"
- Chạy node "scripts/node scripts/extractTimestamp.js" sẽ trả về file output/timestamp.txt

Mục 4:
- Tạo với câu lệnh: npm create vue@latest
- Sao chép 3 file vào public
+ audio.opus
+ output_AB.txt
+ timestamp.txt
- Tạo file tên là: AudioHighlighter.vue vào src/components
- Chỉnh sửa file App.vue
- Chạy "npm install axios"
- Và cuối cùng chạy "npm run dev"s