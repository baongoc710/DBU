if (keyboard_check_pressed(ord("B"))) {
    opening = true;
}

if (opening) {
    image_index += 0.16;

    if (image_index >= image_number - 1) {
        image_index = image_number - 1;
        opening = false;
        opened = true;
    }
}