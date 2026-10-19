// Phóng cửa sổ game gần bằng toàn màn hình nhưng vẫn giữ thanh tiêu đề
window_set_fullscreen(false);
window_set_position(0, 0);

window_set_showborder(true);

var screen_w = display_get_width();
var screen_h = display_get_height() - 40;

window_set_size(screen_w, screen_h);

// Bật hệ thống camera
view_enabled = true;
view_visible[0] = true;

// Tạo camera kích thước 960 x 540
view_camera[0] = camera_create_view(
    0, 0,
    960, 540,
    0,
    obj_slime,
    -1, -1,
    320, 270
);

// Kích thước hiển thị trong cửa sổ game
view_xport[0] = 0;
view_yport[0] = 0;
view_wport[0] = 960;
view_hport[0] = 720;

cam = view_camera[0];

// Góc nhìn rộng hơn, đúng tỉ lệ 16:9
view_w = 1280;
view_h = 720;

camera_set_view_size(cam, view_w, view_h);

