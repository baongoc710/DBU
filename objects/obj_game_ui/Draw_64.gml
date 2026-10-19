// ================================
// THIẾT LẬP CHỮ
// ================================

draw_set_halign(fa_center);
draw_set_valign(fa_middle);


// ================================
// NÚT PAUSE
// ================================

draw_set_color(c_dkgray);
draw_rectangle(920, 20, 1020, 65, false);

draw_set_color(c_white);

if (paused) {
    draw_text(970, 42, "RESUME");
} else {
    draw_text(970, 42, "PAUSE");
}


// ================================
// NÚT SAVE
// ================================

draw_set_color(c_dkgray);
draw_rectangle(1030, 20, 1120, 65, false);

draw_set_color(c_white);
draw_text(1075, 42, "SAVE");


// ================================
// NÚT EXIT
// ================================

draw_set_color(c_dkgray);
draw_rectangle(1130, 20, 1220, 65, false);

draw_set_color(c_white);
draw_text(1175, 42, "EXIT");


// ================================
// THÔNG BÁO ĐÃ LƯU
// ================================

if (save_notice > 0) {
    draw_set_color(c_white);
    draw_text(1075, 85, "SAVED!");
}


// ================================
// MÀN HÌNH PAUSE
// ================================

if (paused) {

    draw_set_alpha(0.55);
    draw_set_color(c_black);
    draw_rectangle(0, 0, 1280, 720, false);
    draw_set_alpha(1);

    draw_set_color(c_white);
    draw_text(640, 300, "GAME PAUSED");
    draw_text(640, 350, "Click RESUME to continue");
}


// Trả căn chữ về mặc định
draw_set_halign(fa_left);
draw_set_valign(fa_top);