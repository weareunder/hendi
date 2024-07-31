import cv2
from core import VideoProcessor, StateManager
from gestures import CursorControl, ClickHandler
from additional.utils import setup_window

def main():
    video_processor = VideoProcessor()
    state_manager = StateManager()
    cursor_control = CursorControl(*video_processor.screen_size)
    click_handler = ClickHandler()

    setup_window(video_processor.mouse_callback)

    while video_processor.is_camera_opened():
        image = video_processor.process_frame()
        if image is None:
            continue

        hand_landmarks = video_processor.detect_hand(image)
        if hand_landmarks:
            image = state_manager.process_hand(image, hand_landmarks, video_processor, cursor_control, click_handler)
        else:
            state_manager.reset()
            video_processor.draw_no_hand_message(image)

        video_processor.draw_interface(image, state_manager, click_handler)
        
        if video_processor.should_exit():
            break

    video_processor.release()

if __name__ == "__main__":
    main()