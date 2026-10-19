var mouse_gui_x = device_mouse_x_to_gui(0);
var mouse_gui_y = device_mouse_y_to_gui(0);


// ================================
// NÚT PAUSE / RESUME
// ================================

var click_pause_button = point_in_rectangle(
    mouse_gui_x,
    mouse_gui_y,
    920, 20,
    1020, 65
);

var click_resume_button = point_in_rectangle(
    mouse_gui_x,
    mouse_gui_y,
    540, 380,
    740, 440
);


// Đang Pause → cho Resume
if (paused) {

    if (click_pause_button || click_resume_button) {

        instance_activate_all();
        paused = false;

        exit;
    }
}


// Đang chơi → cho Pause
else {

    if (click_pause_button) {

        paused = true;
        instance_deactivate_all(true);

        exit;
    }
}


// ================================
// NÚT SAVE
// ================================

if (point_in_rectangle(
    mouse_gui_x,
    mouse_gui_y,
    1030, 20,
    1120, 65
)) {

    if (!paused && instance_exists(obj_slime)) {

        ini_open("save.ini");

        // Lưu vị trí slime
        ini_write_real(
            "Player",
            "x",
            obj_slime.x
        );

        ini_write_real(
            "Player",
            "y",
            obj_slime.y
        );

        // Lưu trạng thái cổng A
        if (instance_exists(obj_gate_A)) {
            ini_write_real(
                "Level1",
                "gate_opened",
                obj_gate_A.opened
            );
        }

        // Lưu trạng thái dây leo B
        if (instance_exists(obj_vine_B)) {
            ini_write_real(
                "Level1",
                "vine_opened",
                obj_vine_B.opened
            );
        }

        // Lưu trạng thái cầu C
        if (instance_exists(obj_bridge_C)) {
            ini_write_real(
                "Level1",
                "bridge_lowered",
                obj_bridge_C.lowered
            );
        }

        ini_close();

        save_notice = 120;
    }
}


// ================================
// NÚT EXIT
// ================================

if (point_in_rectangle(
    mouse_gui_x,
    mouse_gui_y,
    1130, 20,
    1220, 65
)) {

    game_end();
}