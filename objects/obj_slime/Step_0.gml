// ================================
// 1. KHAI BÁO BIẾN
// ================================

var move = 0;
var old_x = x;

var gate_hit = noone;
var vine_hit = noone;

var bridge = noone;

var bridge_left = 0;
var bridge_right = 0;
var bridge_surface = 0;

var touching_bridge_x = false;

var standing_on_ground = false;
var standing_on_bridge = false;
var landed_on_bridge = false;

var vertical_direction = 0;
var on_floor = false;


// ================================
// 2. NHẬN PHÍM DI CHUYỂN
// ================================

if (keyboard_check(ord("D"))) {
    move = 1;
}

if (keyboard_check(ord("A"))) {
    move = -1;
}


// ================================
// 3. DI CHUYỂN NGANG
// ================================

x += move * move_speed;


// ================================
// 4. VA CHẠM CỔNG A
// ================================

gate_hit = instance_place(x, y, obj_gate_A);

if (gate_hit != noone) {
    if (!gate_hit.opened) {
        x = old_x;
    }
}


// ================================
// 5. VA CHẠM DÂY LEO B
// ================================

vine_hit = instance_place(x, y, obj_vine_B);

if (vine_hit != noone) {
    if (!vine_hit.opened) {
        x = old_x;
    }
}


// ================================
// 6. TÌM CẦU
// ================================

bridge = instance_nearest(x, y, obj_bridge_C);

if (bridge != noone && bridge.lowered) {

    // Lấy vùng Collision Mask của cầu
    bridge_left = bridge.bbox_left;
    bridge_right = bridge.bbox_right;
    bridge_surface = bridge.bbox_top;

    touching_bridge_x =
        bbox_right > bridge_left
        && bbox_left < bridge_right;


    // Slime đang đứng sát mặt cầu
    if (touching_bridge_x
    && abs(bbox_bottom - bridge_surface) <= 12) {

        y += bridge_surface - bbox_bottom;
        vsp = 0;

        standing_on_bridge = true;
    }
}


// ================================
// 7. KIỂM TRA MẶT ĐẤT
// ================================

standing_on_ground =
    place_meeting(x, y + 1, obj_ground);


// ================================
// 8. NHẢY
// ================================

if ((standing_on_ground || standing_on_bridge)
&& keyboard_check_pressed(vk_space)) {

    vsp = jump_speed;

    standing_on_ground = false;
    standing_on_bridge = false;
}


// ================================
// 9. TRỌNG LỰC
// ================================

vsp += grav;
vsp = min(vsp, max_fall_speed);


// ================================
// 10. ĐÁP XUỐNG CẦU
// ================================

if (bridge != noone
&& bridge.lowered
&& vsp >= 0) {

    bridge_left = bridge.bbox_left;
    bridge_right = bridge.bbox_right;
    bridge_surface = bridge.bbox_top;

    touching_bridge_x =
        bbox_right > bridge_left
        && bbox_left < bridge_right;


    // Chân slime đi qua mặt cầu
    if (touching_bridge_x
    && bbox_bottom <= bridge_surface + 10
    && bbox_bottom + vsp >= bridge_surface - 4) {

        y += bridge_surface - bbox_bottom;

        vsp = 0;

        landed_on_bridge = true;
        standing_on_bridge = true;
    }
}


// ================================
// 11. VA CHẠM MẶT ĐẤT
// ================================

if (!landed_on_bridge && vsp != 0) {

    vertical_direction = sign(vsp);

    if (place_meeting(x, y + vsp, obj_ground)) {

        while (!place_meeting(
            x,
            y + vertical_direction,
            obj_ground
        )) {
            y += vertical_direction;
        }

        vsp = 0;
    }

    y += vsp;
}


// ================================
// 12. KIỂM TRA LẠI MẶT CẦU
// ================================

if (bridge != noone && bridge.lowered) {

    bridge_left = bridge.bbox_left;
    bridge_right = bridge.bbox_right;
    bridge_surface = bridge.bbox_top;

    touching_bridge_x =
        bbox_right > bridge_left
        && bbox_left < bridge_right;

    if (touching_bridge_x
    && abs(bbox_bottom - bridge_surface) <= 12) {

        standing_on_bridge = true;
    }
}


// ================================
// 13. KIỂM TRA LẠI MẶT ĐẤT
// ================================

standing_on_ground =
    place_meeting(x, y + 1, obj_ground);


// ================================
// 14. ANIMATION SLIME
// ================================

image_speed = 0;

on_floor =
    standing_on_ground
    || standing_on_bridge
    || landed_on_bridge;


// Đang đứng trên đất hoặc cầu
if (on_floor) {

    anim_frame += anim_speed;

    if (anim_frame >= 4) {
        anim_frame = 0;
    }


    // Đứng yên: frame 0–3
    if (move == 0) {
        image_index = floor(anim_frame);
    }


    // Chạy sang phải: frame 4–7
    else if (move == 1) {
        image_index = 4 + floor(anim_frame);
    }


    // Chạy sang trái: frame 8–11
    else if (move == -1) {
        image_index = 8 + floor(anim_frame);
    }
}


// Đang nhảy hoặc rơi
else {

    // Nhảy sang phải
    if (move > 0) {
        image_index = 4;
    }

    // Nhảy sang trái
    else if (move < 0) {
        image_index = 8;
    }

    // Rơi thẳng
    else {
        image_index = 0;
    }
}

// ================================
// RƠI XUỐNG NƯỚC
// ================================

if (place_meeting(x, y, obj_pit_water)
|| y > room_height + 100) {

    x = respawn_x;
    y = respawn_y;

    vsp = 0;
    anim_frame = 0;
}