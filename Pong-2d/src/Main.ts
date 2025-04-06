const { regClass, property } = Laya;

@regClass()
export class Main extends Laya.Script {

    onStart() {
        console.log("Game start");

        let tex: Laya.Texture = Laya.loader.getRes("dashedLine-4-1.png");

        tex.bitmap.wrapModeV = Laya.WrapMode.Repeat;

        let sprite: Laya.Sprite = this.owner.getChildByName("sprite") as Laya.Sprite;
        sprite.graphics.drawTexture(tex, 0, 0, 20, 500, null, 1, null, null, [0, 0, 10, 1]);
    }
}