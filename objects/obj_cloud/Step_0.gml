x += move_speed;

// Luôn giữ nguyên độ cao
y = cloud_y;

if (x > room_width + sprite_width) {
    x = -sprite_width;
    cloud_y = random_range(70, 300);
    y = cloud_y;
}