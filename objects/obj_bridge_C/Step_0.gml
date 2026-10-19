// Nhấn C để bắt đầu hạ cầu
if (keyboard_check_pressed(ord("C"))
&& !lowering
&& !lowered) {

    lowering = true;
}


// Animation hạ cầu
if (lowering) {

    image_index += 0.08;

    if (image_index >= image_number - 1) {

        image_index = image_number - 1;

        lowering = false;
        lowered = true;
    }
}