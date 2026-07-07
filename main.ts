scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorLockedNorth, function (sprite, location) {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    game.gameOver(true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.tilemapLocation().column == 2 && mySprite.tilemapLocation().row == 48) {
        game.splash("You need to get all coins to win!")
    } else {
        if (mySprite.tilemapLocation().column == 11 && mySprite.tilemapLocation().row == 5) {
            game.splash("The monkey is protecting a coin, but he's afraid of the light! Find a strong light!")
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite3, location2) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
    _67Coins += 1
    tiles.setTileAt(location2, assets.tile`myTile`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile22`, function (sprite, location) {
    mySprite.sayText("Press 'B'", 500, false)
    lightMessage = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    mySprite.sayText("Press 'B'", 500, false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom) && facingLeft == true) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`myAnim1`,
        200,
        true
        )
        mySprite.vy = -200
    } else if (mySprite.isHittingTile(CollisionDirection.Bottom) && facingRight == true) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`myAnim0`,
        200,
        true
        )
        mySprite.vy = -200
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    mySprite.vy = -150
    info.changeLifeBy(-1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim1`,
    200,
    true
    )
    mySprite.fx = 0
    facingLeft = true
    facingRight = false
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vx = -100
    } else {
        mySprite.vx = -70
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.fx += 200
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.fx += 200
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite2, otherSprite) {
	
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim0`,
    200,
    true
    )
    mySprite.fx = 0
    facingRight = true
    facingLeft = false
    monkeyAwake = false
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vx = 100
    } else {
        mySprite.vx = 70
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (cantakeDamage == true) {
        info.changeLifeBy(-1)
        cantakeDamage = false
        pause(100)
        cantakeDamage = true
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.jewels.jewel2, function (sprite, location) {
    if (cantakeDamage == true) {
        info.changeLifeBy(-1)
        mySprite.vx = -150
        cantakeDamage = false
        pause(100)
        cantakeDamage = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (cantakeDamage == true) {
        info.changeLifeBy(-1)
        cantakeDamage = false
        pause(100)
        cantakeDamage = true
    }
})
let projectile: Sprite = null
let lightLevel = 0
let temperatureChanged = false
let temperatureDifference = 0
let temperatureStarting = 0
let temperatureWarningshown = false
let monkeyAwake = false
let facingRight = false
let facingLeft = false
let lightMessage = false
let cantakeDamage = false
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level`)
scene.setBackgroundColor(1)
mySprite = sprites.create(img`
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
    `, SpriteKind.Player)
let mySprite2 = sprites.create(assets.image`monkey3`, SpriteKind.Enemy)
info.setLife(10)
mySprite.setPosition(10, 777)
mySprite2.setPosition(24, 56)
scene.cameraFollowSprite(mySprite)
mySprite.ay = 300
let nearSign1 = false
cantakeDamage = true
let _67Coins = 0
lightMessage = false
let monkeyAlive = true
let _67change = false
forever(function () {
    if (mySprite2.x > 80 && monkeyAwake == true) {
        mySprite2.setImage(assets.image`monkey2`)
        mySprite2.setVelocity(-60, 0)
    } else if (mySprite2.x < 25 && monkeyAwake == true) {
        mySprite2.setImage(assets.image`monkey3`)
        mySprite2.setVelocity(60, 0)
    }
})
forever(function () {
    if (mySprite.tilemapLocation().column == 31 && mySprite.tilemapLocation().row == 3 && temperatureWarningshown == false) {
        mySprite.sayText("This is too hot!")
        pause(1000)
        mySprite.sayText(controller.temperature(ControllerTemperatureUnit.Celsius))
        temperatureWarningshown = true
        temperatureStarting = controller.temperature(ControllerTemperatureUnit.Celsius)
        pause(1000)
        mySprite.sayText("I need to turn the temperature down!", 2000, false)
    }
})
forever(function () {
    if (mySprite.x <= 168 && mySprite.y <= 88) {
        monkeyAwake = true
    } else {
        monkeyAwake = false
    }
})
forever(function () {
    if (_67Coins == 67 && _67change == false) {
        tiles.setWallAt(tiles.getTileLocation(34, 3), false)
        tiles.setTileAt(tiles.getTileLocation(15, 0), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(16, 0), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(18, 0), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(19, 0), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(20, 0), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(21, 0), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(14, 1), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(21, 1), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(14, 2), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(15, 2), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(16, 2), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(20, 2), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(14, 3), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(17, 3), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(20, 3), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(15, 4), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(16, 4), assets.tile`67`)
        tiles.setTileAt(tiles.getTileLocation(20, 4), assets.tile`67`)
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
        _67change = true
    }
})
forever(function () {
    temperatureDifference = temperatureStarting - controller.temperature(ControllerTemperatureUnit.Celsius)
    if (temperatureDifference >= 3 && temperatureChanged == false) {
        mySprite.sayText("How cool!", 5000, false)
        temperatureChanged = true
        tiles.setTileAt(tiles.getTileLocation(32, 3), assets.tile`myTile`)
        tiles.setTileAt(tiles.getTileLocation(33, 3), assets.tile`myTile`)
        tiles.setTileAt(tiles.getTileLocation(34, 3), assets.tile`myTile`)
        tiles.setWallAt(tiles.getTileLocation(33, 3), false)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
    }
})
forever(function () {
    lightLevel = controller.lightLevel()
    if (lightLevel > 200 && lightMessage == true) {
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
        monkeyAlive = false
    }
})
game.onUpdateInterval(500, function () {
    if (monkeyAwake == true && monkeyAlive == true) {
        projectile = sprites.createProjectileFromSprite(assets.image`Banana`, mySprite2, 90, -130)
        projectile.ay = 200
    }
})
