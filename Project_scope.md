# DISTANCE BETWEEN US
## PHẠM VI WEB GAME VÀ CÁC TÍNH NĂNG

**Phiên bản:** 2.0  
**Trạng thái:** Kế hoạch phát triển (Planning)  
**Thể loại:** 2D Pixel Art Platformer kết hợp giáo dục ngôn ngữ ký hiệu  
**Nền tảng:** Web  
**Số màn chơi:** 10 màn  
**Nhân vật chính:** Hoàng tử bé

---

## 1. Tổng quan

**Distance Between Us** là một web game 2D Pixel Art kết hợp yếu tố phiêu lưu, giải đố, giáo dục và công nghệ nhận diện ký hiệu tay thông qua webcam.

Game kể về hành trình của một hoàng tử bé vượt qua nhiều vùng đất, từ ngôi làng dưới chân lâu đài, khu rừng, vách đá cho đến những bức tường thành để đến gặp công chúa.

Trên đường đi, hoàng tử phải vượt qua các chướng ngại vật, giải những câu đố và kích hoạt các cơ chế trong môi trường bằng cách thực hiện ký hiệu tay.

Người chơi sử dụng webcam để thực hiện các ký hiệu tương ứng. Hệ thống AI phân tích hình ảnh bàn tay, nhận diện ký hiệu và chuyển kết quả thành hành động trong game.

**Mục tiêu chính:**

- Xây dựng một web game platformer có cốt truyện và hệ thống màn chơi.
- Kết hợp công nghệ Hand Tracking và Gesture Recognition vào gameplay.
- Giúp người chơi làm quen, thực hành và ghi nhớ các ký hiệu chữ cái A–Z.
- Tạo trải nghiệm học tập thông qua hành trình phiêu lưu và giải đố.
- Phát triển prototype có khả năng mở rộng và cải tiến trong tương lai.

---

## 2. Nền tảng và công nghệ

| Thành phần | Công nghệ dự kiến |
|---|---|
| Nền tảng | Web |
| Ngôn ngữ lập trình | TypeScript |
| Game Framework | Phaser |
| Hand Tracking | MediaPipe Hand Landmarker |
| Gesture Recognition | Mô hình phân loại ký hiệu |
| Camera | Web Camera API |
| Build Tool | Vite |
| Đồ họa | 2D Pixel Art |
| Trình duyệt mục tiêu | Chrome / Edge |
| Thiết bị mục tiêu | Máy tính có webcam |

### 2.1. Phong cách đồ họa

Game sử dụng phong cách **2D Pixel Art Fantasy**, lấy cảm hứng từ những trò chơi phiêu lưu màn hình ngang.

Các đặc điểm chính:

- Nhân vật và môi trường được thiết kế bằng Pixel Art.
- Bối cảnh thay đổi theo từng khu vực trong hành trình.
- Sử dụng nhiều lớp background để tạo chiều sâu.
- Camera di chuyển theo nhân vật.
- Có animation cho nhân vật, vật thể và các cơ chế tương tác.
- Sử dụng các tileset để xây dựng bản đồ màn chơi.

### 2.2. Nhân vật

**Hoàng tử bé:**
- Là nhân vật chính do nhóm tự thiết kế.
- Có thể di chuyển, nhảy và tương tác với môi trường.
- Có các trạng thái animation như Idle, Run, Jump, Fall và Interact.

**Công chúa:**
- Là nhân vật gắn với mục tiêu cuối cùng của hành trình.
- Xuất hiện ở phần kết của game.
- Asset nhân vật sẽ được bổ sung khi hoàn thành thiết kế.

---

## 3. Phạm vi của Web Game

### 3.1. Hệ thống Webcam

- Xin quyền truy cập webcam.
- Nhận hình ảnh trực tiếp từ webcam.
- Hiển thị trạng thái camera.
- Cho phép bật hoặc tắt camera.
- Sử dụng dữ liệu hình ảnh làm đầu vào cho hệ thống nhận diện.
- Thông báo khi không phát hiện được bàn tay hoặc camera gặp lỗi.

### 3.2. Hệ thống Hand Tracking

- Phát hiện bàn tay từ webcam.
- Theo dõi 21 điểm landmark trên bàn tay bằng MediaPipe.
- Xác định vị trí và hình dạng bàn tay.
- Trích xuất dữ liệu phục vụ nhận diện ký hiệu.
- Hỗ trợ xử lý kết quả qua nhiều khung hình để tăng độ ổn định.
- Tối ưu tần suất xử lý nhằm hạn chế ảnh hưởng đến hiệu năng game.

### 3.3. Hệ thống nhận diện ký hiệu

Game dự kiến sử dụng bộ **26 ký hiệu chữ cái A–Z** theo bảng ký hiệu đã được nhóm lựa chọn.

Các chức năng:

- Thu thập dữ liệu bàn tay theo từng nhãn ký hiệu.
- Chuẩn hóa dữ liệu hand landmarks.
- Huấn luyện mô hình phân loại ký hiệu.
- Dự đoán ký hiệu được thực hiện trước webcam.
- Đánh giá độ tin cậy của kết quả nhận diện.
- Phản hồi khi ký hiệu được nhận diện đúng hoặc sai.
- Hạn chế kích hoạt hành động nhiều lần khi người chơi giữ nguyên một ký hiệu.
- Xử lý riêng các ký hiệu có yêu cầu chuyển động nếu bộ ký hiệu sử dụng có đặc điểm này.

**Lưu ý:** Bảng ảnh minh họa A–Z được dùng làm tài liệu tham chiếu. Để huấn luyện mô hình, nhóm cần bổ sung dữ liệu thực tế thu thập từ webcam.

### 3.4. Hệ thống Gameplay

Game được phát triển theo cơ chế platformer màn hình ngang.

**Di chuyển nhân vật:**
- Di chuyển sang trái và phải.
- Nhảy qua chướng ngại vật.
- Di chuyển giữa các bệ đứng.
- Tương tác với vật thể và cơ chế trong môi trường.

**Tương tác bằng ký hiệu:**
- Mở cổng.
- Kích hoạt cầu.
- Di chuyển hoặc loại bỏ vật cản.
- Kích hoạt công tắc và cơ chế.
- Giải các câu đố.
- Mở khóa khu vực tiếp theo.

**Trạng thái gameplay:**
- Bắt đầu màn chơi.
- Tạm dừng hoặc tiếp tục.
- Hoàn thành thử thách.
- Thất bại và thử lại.
- Hoàn thành màn chơi.
- Chuyển sang màn tiếp theo.

---

## 3.5. Hệ thống 10 màn chơi

Game được thiết kế gồm **10 màn chơi**, có cốt truyện liên kết và độ khó tăng dần.

| Màn | Tên màn dự kiến | Bối cảnh | Mục tiêu |
|---|---|---|---|
| 1 | Lời ước dưới chân thành | Ngôi làng | Làm quen với game và webcam |
| 2 | Khu rừng ký hiệu | Rừng xanh | Vượt các chướng ngại đầu tiên |
| 3 | Bí mật rừng sâu | Rừng sâu | Ghi nhớ và sử dụng ký hiệu |
| 4 | Vách đá thử thách | Vách đá | Vượt địa hình nguy hiểm |
| 5 | Con đường lên tháp | Chân tháp | Giải đố để mở đường |
| 6 | Bức tường hoàng gia | Tường thành | Vượt các hệ thống bảo vệ |
| 7 | Khu vườn lâu đài | Vườn hoàng gia | Kết hợp các kỹ năng đã học |
| 8 | Cánh cổng bí ẩn | Cổng lâu đài | Mở khóa đường vào lâu đài |
| 9 | Đại sảnh hoàng gia | Bên trong lâu đài | Vượt các thử thách cuối |
| 10 | The Last Sign | Khu vực cuối | Hoàn thành thử thách tổng hợp và gặp công chúa |

**Lưu ý:** Tên và nội dung chi tiết của các màn là đề xuất thiết kế và có thể điều chỉnh trong quá trình phát triển.

### 3.6. Hệ thống thử thách

Các dạng thử thách dự kiến:

- Mở cổng bằng ký hiệu.
- Kích hoạt cầu và bệ di chuyển.
- Vượt chướng ngại vật cố định hoặc chuyển động.
- Thực hiện ký hiệu theo hình minh họa.
- Nhận diện ký hiệu không có gợi ý trực tiếp.
- Thực hiện chuỗi ký hiệu theo thứ tự.
- Nhận diện ký hiệu ngẫu nhiên.
- Hoàn thành thử thách có giới hạn thời gian.
- Ôn tập các ký hiệu đã học ở màn cuối.

### 3.7. Hệ thống tiến trình

- Các màn được mở theo thứ tự từ 1 đến 10.
- Người chơi phải hoàn thành các thử thách để tiếp tục hành trình.
- Mỗi màn có điểm bắt đầu và điểm kết thúc.
- Một số màn có checkpoint.
- Ghi nhận trạng thái hoàn thành màn chơi.
- Cho phép chơi lại màn đã mở.
- Lưu tiến trình cơ bản bằng bộ nhớ trình duyệt nếu được triển khai.

---

## 4. Cấu trúc nội dung học

Game sử dụng quy trình:

**Quan sát → Thực hành → Ghi nhớ → Kiểm tra**

### 4.1. Quan sát

- Hiển thị hình minh họa ký hiệu.
- Hiển thị tên chữ cái.
- Giúp người chơi nhận biết hình dạng và cách thực hiện ký hiệu.

### 4.2. Thực hành

- Người chơi thực hiện ký hiệu trước webcam.
- Hệ thống nhận diện và hiển thị kết quả.
- Người chơi có thể thử lại khi thực hiện chưa chính xác.

### 4.3. Ghi nhớ

- Giảm dần mức độ gợi ý.
- Người chơi tự nhớ ký hiệu đã được giới thiệu.
- Kết hợp ký hiệu vào những tình huống gameplay khác nhau.

### 4.4. Kiểm tra

- Yêu cầu thực hiện ký hiệu không có hình minh họa.
- Kiểm tra ngẫu nhiên những ký hiệu đã học.
- Thực hiện chuỗi ký hiệu theo thứ tự.
- Tăng độ khó ở những màn sau.

---

## 5. Hệ thống nội dung ký hiệu

Game dự kiến sử dụng **26 ký hiệu chữ cái A–Z**, được phân bổ trong 10 màn.

| Màn | Ký hiệu mới | Số lượng |
|---|---|---|
| 1 | A, B, C | 3 |
| 2 | D, E, F | 3 |
| 3 | G, H, I | 3 |
| 4 | J, K, L | 3 |
| 5 | M, N, O | 3 |
| 6 | P, Q, R | 3 |
| 7 | S, T, U | 3 |
| 8 | V, W, X | 3 |
| 9 | Y, Z | 2 |
| 10 | Ôn tập A–Z | Không có ký hiệu mới |
| **Tổng** | **A–Z** | **26** |

Mỗi ký hiệu sẽ gắn với một hành động, vật thể hoặc thử thách cụ thể.

Ví dụ:

- Ký hiệu A: Mở cổng.
- Ký hiệu B: Loại bỏ vật cản.
- Ký hiệu C: Hạ cầu.
- Ký hiệu D: Kích hoạt công tắc.
- Ký hiệu E: Mở lối đi.

Chức năng chính xác của từng ký hiệu và câu đố sẽ được mô tả trong tài liệu thiết kế màn chơi riêng.

**Màn 10** là màn tổng hợp, tập trung kiểm tra khả năng ghi nhớ và thực hiện các ký hiệu đã học, thay vì giới thiệu ký hiệu mới.

---

## 6. Hệ thống phản hồi

### 6.1. Khi nhận diện đúng

- Hiển thị trạng thái thành công.
- Kích hoạt hành động tương ứng.
- Phát hiệu ứng hình ảnh hoặc âm thanh.
- Cho phép người chơi tiếp tục thử thách.

### 6.2. Khi nhận diện sai

- Hiển thị thông báo chưa chính xác.
- Không kích hoạt cơ chế.
- Cho phép người chơi thực hiện lại.
- Có thể hiển thị gợi ý khi cần.

### 6.3. Khi không nhận diện được

- Thông báo không phát hiện bàn tay hoặc kết quả chưa đủ tin cậy.
- Yêu cầu người chơi điều chỉnh vị trí bàn tay.
- Không tự động xem kết quả không chắc chắn là ký hiệu sai.
- Không kích hoạt hành động ngoài ý muốn.

---

## 7. Phạm vi Prototype

Prototype được phát triển nhằm kiểm chứng tính khả thi của cơ chế kết hợp webcam, nhận diện ký hiệu và gameplay.

**Quy trình cốt lõi:**

Webcam → Hand Tracking → Hand Landmarks → Gesture Classification → Game Action → Gameplay

### 7.1. Chức năng cần kiểm chứng

- Truy cập webcam trong trình duyệt.
- Phát hiện và theo dõi bàn tay.
- Thu thập dữ liệu ký hiệu.
- Huấn luyện và thử nghiệm bộ phân loại.
- Nhận diện ký hiệu từ webcam.
- Chuyển kết quả thành hành động trong game.
- Điều khiển nhân vật 2D.
- Tương tác với môi trường và chướng ngại vật.
- Hiển thị phản hồi đúng, sai hoặc chưa nhận diện được.
- Hoàn thành và chuyển màn.

### 7.2. Phạm vi triển khai

**Thiết kế tổng thể:** 10 màn chơi.

**Giai đoạn thử nghiệm ban đầu:**
- Hoàn thiện một màn chơi mẫu.
- Kiểm chứng nhận diện một nhóm ký hiệu nhỏ.
- Tích hợp hệ thống nhận diện vào gameplay.
- Đánh giá độ chính xác và hiệu năng.

**Giai đoạn mở rộng:**
- Bổ sung dữ liệu và huấn luyện các ký hiệu còn lại.
- Phát triển nội dung các màn tiếp theo.
- Hoàn thiện hệ thống tiến trình.
- Tích hợp asset Pixel Art của nhóm.

Việc hoàn thành toàn bộ 10 màn và nhận diện đủ 26 ký hiệu phụ thuộc vào kết quả triển khai, dữ liệu huấn luyện và thời gian thực hiện dự án.

---

## 8. Giới hạn của Prototype

Prototype không hướng đến việc xây dựng một hệ thống nhận diện ngôn ngữ ký hiệu hoàn chỉnh.

Các giới hạn gồm:

- Chỉ tập trung vào bộ ký hiệu được lựa chọn cho game.
- Chưa hỗ trợ nhận diện ngôn ngữ ký hiệu ở cấp độ câu hoặc hội thoại.
- Độ chính xác phụ thuộc vào chất lượng dữ liệu huấn luyện.
- Kết quả có thể bị ảnh hưởng bởi ánh sáng, góc bàn tay và khoảng cách đến webcam.
- Một số ký hiệu tương tự nhau có thể gây nhầm lẫn.
- Không huấn luyện mô hình phát hiện bàn tay từ đầu.
- Không đảm bảo hoạt động trên mọi loại thiết bị.
- Không phát triển theo quy mô sản phẩm thương mại.

---

## 9. Các chức năng không nằm trong phạm vi hiện tại

- Ứng dụng mobile native.
- Hỗ trợ VR/AR.
- Multiplayer.
- Hệ thống tài khoản phức tạp.
- Bảng xếp hạng trực tuyến.
- Hệ thống thanh toán.
- Chế độ chơi trực
