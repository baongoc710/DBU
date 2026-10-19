if (instance_exists(obj_slime)) {

    var target_x = obj_slime.x - view_w / 2;
    var target_y = obj_slime.y - view_h / 2;

    // Không cho camera nhìn ra ngoài Room
    target_x = clamp(
        target_x,
        0,
        max(0, room_width - view_w)
    );

    target_y = clamp(
        target_y,
        0,
        max(0, room_height - view_h)
    );

    // Camera di chuyển mượt
    var camera_x = lerp(
        camera_get_view_x(cam),
        target_x,
        0.08
    );

    var camera_y = lerp(
        camera_get_view_y(cam),
        target_y,
        0.08
    );

    camera_set_view_pos(cam, camera_x, camera_y);
}