import random
import pyglet
from pyglet import shapes

SPEED = 25
GRAVITY = 980

class Ball(shapes.Circle):
    def __init__(self, x, y, radius, segments=None, color=..., batch=None, group=None):
        self.speed_y = 0
        self.is_colided = False
        super().__init__(x, y, radius, segments, color, batch, group)
    
    def check_colision(self):
        if self.y <= self.radius and self.is_colided == False:
            self.is_colided = True
            return
        if self.y > self.radius:
            self.is_colided = False


window = pyglet.window.Window(resizable = True)
batch = pyglet.graphics.Batch()
ball_arr = []


@window.event
def on_mouse_press(x, y, button, modifiers):
    if button == pyglet.window.mouse.LEFT:
        print('left button')
        ball_arr.append(Ball(x, y, 50, color=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), batch=batch))

def update_frames(time):
    window.clear()
    for ball in ball_arr:
        if ball.y > 0:
            ball.speed_y = ball.speed_y + time * GRAVITY
            ball.y = ball.y - ball.speed_y * time
            ball.check_colision()
        if ball.is_colided:

            ball.is_colided = False
            ball.y = ball.radius
            ball.speed_y *= -1
            print('after', ball.speed_y)
    batch.draw()


pyglet.clock.schedule_interval(update_frames,1/85.0)
pyglet.app.run()