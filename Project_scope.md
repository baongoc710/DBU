# DISTANCE BETWEEN US
## Phạm vi Web Game và các tính năng

## 1. Tổng quan

Distance Between Us là một web game 2D kết hợp yếu tố giáo dục và nhận diện cử chỉ tay.

Người chơi sử dụng webcam để thực hiện các ký hiệu ngôn ngữ ký hiệu. Hệ thống nhận diện cử chỉ tay và sử dụng kết quả nhận diện để kích hoạt hành động hoặc vượt qua các thử thách trong game.

Game được xây dựng theo hướng platformer, trong đó người chơi tiến hành một hành trình từ vùng thấp dưới chân lâu đài đến lâu đài thông qua các khu vực và thử thách khác nhau.

---

## 2. Nền tảng

- Nền tảng: Web
- Thiết bị: Máy tính có webcam
- Trình duyệt mục tiêu: Chrome / Edge
- Phương thức tương tác: Webcam + Hand Tracking + Gesture Recognition
- Đồ họa: 2D

---

## 3. Phạm vi của Web Game

Prototype tập trung vào các chức năng cốt lõi sau:

### 3.1. Hệ thống webcam

- Xin quyền sử dụng webcam.
- Nhận hình ảnh từ webcam.
- Hiển thị trạng thái camera.
- Sử dụng hình ảnh webcam làm dữ liệu đầu vào cho hệ thống nhận diện bàn tay.

### 3.2. Nhận diện bàn tay

- Phát hiện bàn tay từ webcam.
- Theo dõi vị trí các điểm landmark của bàn tay.
- Xác định các cử chỉ được sử dụng trong game.
- Phản hồi khi người chơi thực hiện đúng hoặc sai ký hiệu.

### 3.3. Hệ thống ký hiệu ngôn ngữ ký hiệu

- Sử dụng các ký hiệu được xác định trong nội dung game.
- Mỗi ký hiệu tương ứng với một thử thách hoặc hành động trong game.
- Người chơi được quan sát mẫu, thực hành và ghi nhớ ký hiệu.
- Một số thử thách yêu cầu người chơi tự nhớ ký hiệu khi hình minh họa được giảm hoặc loại bỏ.

### 3.4. Hệ thống gameplay

- Nhân vật chính di chuyển qua các khu vực.
- Người chơi vượt qua chướng ngại vật.
- Người chơi tương tác với cổng, vật thể hoặc cơ chế trong môi trường.
- Ký hiệu đúng có thể kích hoạt hành động hoặc mở đường.
- Ký hiệu sai khiến người chơi phải thực hiện lại thử thách.
- Có cơ chế hoàn thành và thất bại màn chơi.

### 3.5. Hệ thống màn chơi

Các khu vực chính của game gồm:

1. Ngôi làng dưới chân lâu đài
2. Khu rừng
3. Vách đá
4. Bức tường hoàng gia
5. Lâu đài
6. Khu vực Boss

Các màn được xây dựng với độ khó tăng dần.

### 3.6. Hệ thống thử thách

Các dạng thử thách dự kiến:

- Mở cổng bằng ký hiệu.
- Kích hoạt cơ chế trong môi trường.
- Vượt qua chướng ngại vật.
- Nhận diện ký hiệu không kèm hình minh họa.
- Kiểm tra ngẫu nhiên các ký hiệu đã học.
- Thực hiện chuỗi ký hiệu.
- Thực hiện ký hiệu trong giới hạn thời gian.
- Ôn tập các ký hiệu đã học ở phần Boss.

### 3.7. Hệ thống tiến trình

- Người chơi hoàn thành từng thử thách để tiếp tục hành trình.
- Các khu vực được mở theo tiến trình của game.
- Game ghi nhận trạng thái hoàn thành/thất bại của màn chơi.
- Có thể lưu các thông tin tiến trình cần thiết cho prototype.

---

## 4. Cấu trúc nội dung học

Game sử dụng quy trình:

Quan sát → Thực hành → Ghi nhớ/Kiểm tra

### Quan sát
Người chơi xem ký hiệu và làm quen với hình dạng của ký hiệu.

### Thực hành
Người chơi thực hiện ký hiệu trước webcam.

### Ghi nhớ/Kiểm tra
Người chơi thực hiện lại ký hiệu với mức độ gợi ý giảm dần hoặc trong các thử thách kiểm tra.

---

## 5. Hệ thống nội dung ký hiệu

Nội dung ký hiệu được tổ chức theo các nhóm:

- Màn 1: A – E
- Màn 2: F – J
- Màn 3: K – O
- Màn 4: P – T
- Màn 5: U – Z
- Màn 6: Ôn tập A – Z / Boss

Việc phân chia chi tiết thành các level nhỏ hơn sẽ được xác định trong giai đoạn thiết kế màn chơi.

---

## 6. Hệ thống phản hồi

Game cần cung cấp phản hồi cho người chơi khi thực hiện ký hiệu:

### Đúng
- Hiển thị phản hồi thành công.
- Kích hoạt hành động tương ứng.
- Cho phép người chơi tiếp tục thử thách.

### Sai
- Hiển thị phản hồi không chính xác.
- Yêu cầu người chơi thực hiện lại.
- Không cho phép vượt qua thử thách cho đến khi đáp ứng điều kiện.

---

## 7. Phạm vi Prototype

Prototype tập trung chứng minh quy trình:

Webcam
→ Hand Tracking
→ Hand Landmark
→ Gesture Recognition
→ Game Action
→ Gameplay

Prototype cần thể hiện được:

- Nhận diện bàn tay từ webcam.
- Nhận diện các ký hiệu được lựa chọn.
- Chuyển ký hiệu thành hành động trong game.
- Nhân vật và môi trường 2D.
- Một số loại chướng ngại vật.
- Cổng hoặc vật thể tương tác.
- Cơ chế vượt qua thử thách.
- Tiến trình màn chơi.
- Phản hồi đúng/sai.

---

## 8. Giới hạn của Prototype

Prototype không hướng đến việc xây dựng một hệ thống nhận diện ngôn ngữ ký hiệu hoàn chỉnh.

Các giới hạn gồm:

- Chỉ nhận diện các ký hiệu được lựa chọn cho game.
- Chỉ hỗ trợ môi trường và thiết bị phù hợp với điều kiện thử nghiệm.
- Độ chính xác nhận diện có thể bị ảnh hưởng bởi ánh sáng, góc bàn tay, khoảng cách tới webcam và việc che khuất bàn tay.
- Không xây dựng mô hình Computer Vision từ đầu.
- Không yêu cầu hỗ trợ tất cả thiết bị hoặc trình duyệt.
- Không phát triển quy mô sản phẩm thương mại.

---

## 9. Các chức năng không nằm trong phạm vi hiện tại

Prototype hiện không tập trung vào:

- Ứng dụng mobile native.
- Hỗ trợ VR/AR.
- Thiết bị điều khiển chuyên dụng.
- Nhận diện toàn bộ ngôn ngữ ký hiệu ngoài phạm vi game.
- Hệ thống multiplayer.
- Hệ thống tài khoản người dùng phức tạp.
- Bảng xếp hạng trực tuyến.
- Hệ thống thanh toán hoặc thương mại hóa.

---

## 10. Công nghệ dự kiến

- Programming Language: TypeScript
- Game Framework: Phaser
- Hand Tracking / Gesture Recognition: MediaPipe
- Camera: Web Camera API
- Build Tool: Vite
- Platform: Web
- Graphics: 2D
