if (instance_exists(obj_slime)) {

    var distance_to_player = point_distance(
        x, y,
        obj_slime.x, obj_slime.y
    );

    // Nhấn E khi đứng gần để mở hoặc đóng
    if (distance_to_player < 180
    && keyboard_check_pressed(ord("E"))
    && animation_direction == 0) {

        if (opened) {
            animation_direction = -1; // Đóng
        } else {
            animation_direction = 1;  // Mở
        }
    }
}

// Chạy animation
image_index += animation_direction * 0.15;

// Mở hoàn toàn
if (animation_direction == 1
&& image_index >= image_number - 1) {

    image_index = image_number - 1;
    animation_direction = 0;
    opened = true;
}

// Đóng hoàn toàn
if (animation_direction == -1
&& image_index <= 0) {

    image_index = 0;
    animation_direction = 0;
    opened = false;
}
