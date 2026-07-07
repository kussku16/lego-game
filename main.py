def on_overlap_tile(sprite3, location2):
    info.change_score_by(1)
    tiles.set_tile_at(location2, assets.tile("""
        myTile
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile17
        """),
    on_overlap_tile)

def on_a_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM) and facingLeft == True:
        animation.run_image_animation(mySprite,
            assets.animation("""
                myAnim1
                """),
            200,
            True)
        mySprite.vy = -200
    elif mySprite.is_hitting_tile(CollisionDirection.BOTTOM) and facingRight == True:
        animation.run_image_animation(mySprite,
            assets.animation("""
                myAnim0
                """),
            200,
            True)
        mySprite.vy = -200
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile2(sprite, location):
    mySprite.vy = -150
    info.change_life_by(-1)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_lava0,
    on_overlap_tile2)

def on_left_pressed():
    global facingLeft, facingRight
    animation.run_image_animation(mySprite,
        assets.animation("""
            myAnim1
            """),
        200,
        True)
    mySprite.fx = 0
    facingLeft = True
    facingRight = False
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vx = -100
    else:
        mySprite.vx = -70
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_released():
    mySprite.fx += 200
    animation.stop_animation(animation.AnimationTypes.ALL, mySprite)
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    mySprite.fx += 200
    animation.stop_animation(animation.AnimationTypes.ALL, mySprite)
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def on_on_overlap(sprite2, otherSprite):
    sprites.destroy(otherSprite)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap)

def on_right_pressed():
    global facingRight, facingLeft, monkeyAwake
    animation.run_image_animation(mySprite,
        assets.animation("""
            myAnim0
            """),
        200,
        True)
    mySprite.fx = 0
    facingRight = True
    facingLeft = False
    monkeyAwake = False
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vx = 100
    else:
        mySprite.vx = 70
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

temperatureChanged = False
temperatureDifference = 0
temperatureStarting = 0
temperatureWarningshown = False
projectile: Sprite = None
monkeyAwake = False
facingRight = False
facingLeft = False
mySprite: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level
    """))
scene.set_background_color(1)
mySprite = sprites.create(img("""
        9 9 9 9 9 9 3 d 9 9 9 9 9 9 9 .
        9 9 9 9 9 2 2 4 e 9 9 9 9 9 9 .
        9 9 9 9 e 2 e e e 9 9 9 9 9 9 .
        9 9 9 9 9 4 4 4 d 9 9 9 9 9 9 .
        9 9 9 9 9 4 4 e d 9 9 9 9 9 9 .
        9 9 9 9 9 b b 7 9 9 9 9 9 9 9 .
        9 9 9 d d d d d d d 9 9 9 9 9 .
        9 9 d d b d d d d b 9 9 9 9 9 .
        9 9 d b d d d d d b e e 9 9 9 .
        9 2 2 9 d d d d d d b 9 9 9 9 .
        9 d d 9 2 2 2 2 2 e 9 9 9 9 9 .
        9 9 9 9 e 2 2 e 2 2 9 9 9 9 9 .
        9 9 9 e e e e e 2 2 9 9 9 9 9 .
        9 9 9 e e e 9 e 2 e e 9 9 9 9 .
        9 9 9 e e e 9 e e f 9 9 9 9 9 .
        9 9 9 d d d d d d d d 9 9 9 9 .
        """),
    SpriteKind.player)
mySprite2 = sprites.create(assets.image("""
    monkey3
    """), SpriteKind.enemy)
info.set_life(10)
mySprite.set_position(10, 777)
mySprite2.set_position(24, 56)
scene.camera_follow_sprite(mySprite)
mySprite.ay = 300

def on_update_interval():
    pass
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . 6 . . . . . . . .
            . . . . . . 8 6 6 . . . 6 8 . .
            . . . e e e 8 8 6 6 . 6 7 8 . .
            . . e 2 2 2 2 e 8 6 6 7 6 . . .
            . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
            . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
            e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
            e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
            e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
            e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
            e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
            e 2 2 2 2 2 2 2 4 e 2 e e c . .
            e e 2 e 2 2 4 2 2 e e e c . . .
            e e e e 2 e 2 2 e e e c . . . .
            e e e 2 e e c e c c c . . . . .
            . c c c c c c c . . . . . . . .
            """),
        mySprite2,
        80,
        -120)
    if monkeyAwake == True:
        projectile.ay = 200
        projectile.set_flag(SpriteFlag.AUTO_DESTROY, False)
        projectile.set_bounce_on_wall(True)
game.on_update_interval(2000, on_update_interval2)

def on_forever():
    global temperatureWarningshown, temperatureStarting
    if mySprite.tilemap_location().column == 31 and mySprite.tilemap_location().row == 3 and temperatureWarningshown == False:
        mySprite.say_text("This is too hot!")
        pause(1000)
        mySprite.say_text(controller.temperature(ControllerTemperatureUnit.CELSIUS))
        temperatureWarningshown = True
        temperatureStarting = controller.temperature(ControllerTemperatureUnit.CELSIUS)
        pause(1000)
        mySprite.say_text("I need to turn the temperature down!", 2000, False)
forever(on_forever)

def on_forever2():
    global temperatureDifference, temperatureChanged
    temperatureDifference = temperatureStarting - controller.temperature(ControllerTemperatureUnit.CELSIUS)
    if temperatureDifference >= 3 and temperatureChanged == False:
        mySprite.say_text("How cool!", 5000, False)
        temperatureChanged = True
        tiles.set_tile_at(tiles.get_tile_location(32, 3),
            assets.tile("""
                myTile
                """))
        tiles.set_tile_at(tiles.get_tile_location(33, 3),
            assets.tile("""
                myTile
                """))
        tiles.set_tile_at(tiles.get_tile_location(34, 3),
            assets.tile("""
                myTile
                """))
        tiles.set_wall_at(tiles.get_tile_location(34, 3), False)
forever(on_forever2)

def on_forever3():
    if mySprite2.x > 80 and monkeyAwake == True:
        mySprite2.set_image(assets.image("""
            monkey2
            """))
        mySprite2.set_velocity(-60, 0)
    elif mySprite2.x < 25 and monkeyAwake == True:
        mySprite2.set_image(assets.image("""
            monkey3
            """))
        mySprite2.set_velocity(60, 0)
forever(on_forever3)

def on_forever4():
    global monkeyAwake
    if mySprite.x <= 168 and mySprite.y <= 88:
        monkeyAwake = True
    else:
        monkeyAwake = False
forever(on_forever4)
