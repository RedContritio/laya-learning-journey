const { regClass, property } = Laya;


function subtractVector2(a: Laya.Vector2, b: Laya.Vector2): Laya.Vector2 {
    return new Laya.Vector2(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

@regClass()
export class Main extends Laya.Script {
    declare owner: Laya.Sprite;

    private playerBoard: Laya.Sprite = null;
    private npcBoard: Laya.Sprite = null;

    private ball: Laya.Sprite = null;

    private playerScoreText: Laya.Text = null;
    private npcScoreText: Laya.Text = null;

    private cachedInput: Laya.Vector2 = new Laya.Vector2(-1, -1);


    // #region 计分板
    private _playerScore: number = 0;
    private _npcScore: number = 0;

    get playerScore(): number {
        return this._playerScore;
    }
    set playerScore(value: number) {
        this._playerScore = value;
        if (this.playerScoreText) {
            this.playerScoreText.text = value.toString();
        }
    }

    get npcScore(): number {
        return this._npcScore;
    }
    set npcScore(value: number) {
        this._npcScore = value;
        if (this.npcScoreText) {
            this.npcScoreText.text = value.toString();
        }
    }
    // #endregion

    // for board control
    private vmoveFactor: number = 1.2;
    // for ball control
    private readonly ballInitialSpeed: number = 500;
    private readonly ballMaxSpeed: Laya.Vector2 = new Laya.Vector2(1920, 1080);
    private readonly ballMinSpeed: Laya.Vector2 = new Laya.Vector2(10, 0);

    private isBallLaunched: boolean = false;

    onStart() {
        console.log(this);

        let BG = this.owner.getChildByName("BG") as Laya.Sprite;

        let boardGroup = this.owner.getChildByName("BoardGroup") as Laya.Sprite;
        if (!boardGroup) {
            console.error("BoardGroup not found in Main");
            return;
        }

        this.playerBoard = boardGroup.getChildByName("PlayerBoard") as Laya.Sprite;
        this.npcBoard = boardGroup.getChildByName("NPCBoard") as Laya.Sprite;

        this.ball = boardGroup.getChildByName("Ball") as Laya.Sprite;

        let textGroup = this.owner.getChildByName("TextGroup") as Laya.Sprite;
        if (!textGroup) {
            console.error("TextGroup not found in Main");
            return;
        }
        this.playerScoreText = textGroup.getChildByName("PlayerScoreText") as Laya.Text;
        this.npcScoreText = textGroup.getChildByName("NPCScoreText") as Laya.Text;

        console.log("Game start");

        
        BG.on(Laya.Event.MOUSE_MOVE, this, this.onPlayerBoardDragMove);
        BG.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        
        this.isBallLaunched = false;
    }
    
    onUpdate(): void {
    }

    onPlayerBoardDragMove(e: Laya.Event): void {
        let current: Laya.Vector2 = new Laya.Vector2(e.stageX, e.stageY);

        if (this.cachedInput.x == -1) {
            this.cachedInput.x = e.stageX;
            this.cachedInput.y = e.stageY;
            return;
        }

        let delta: Laya.Vector2 = subtractVector2(current, this.cachedInput);
        this.cachedInput = current;

        // console.log("PlayerBoard drag move", delta.x, delta.y);
        
        delta.y *= this.vmoveFactor;
        this.moveBoardVertically(this.playerBoard, delta);
        
        if (!this.isBallLaunched) {
            let radius = this.ball.width / 2;
            let board_half_width = this.playerBoard.width / 2;
            this.ball.pos(this.playerBoard.x + board_half_width + radius, this.playerBoard.y);
        }
    }
    
    onMouseDown(evt: Laya.Event): void {
        if (this.isBallLaunched) return;

        this.launchBall();
    }

    onBallCollisionExit(other: Laya.Sprite & {label: string}): void {
        console.log("Ball collision exit", other.label);

        if (other.label == "wall") {
            if (this.ball.x < 0) {
                this.npcScore += 1;
            } else {
                this.playerScore += 1;
            }
            // this.resetLaunchBall();
            this.isBallLaunched = false;
            this.ball.getComponent(Laya.RigidBody).setVelocity(new Laya.Vector2(0, 0));
            return;
        } else {
            let v = this.ball.getComponent(Laya.RigidBody).linearVelocity;
            
            // 增加速度
            let speed = Math.sqrt(v.x * v.x + v.y * v.y);
            let maxSpeed = Math.sqrt(this.ballMaxSpeed.x * this.ballMaxSpeed.x + this.ballMaxSpeed.y * this.ballMaxSpeed.y);
            let minSpeed = Math.sqrt(this.ballMinSpeed.x * this.ballMinSpeed.x + this.ballMinSpeed.y * this.ballMinSpeed.y);
            let speedFactor = 1.05;
            if (speed < minSpeed) {
                speedFactor = Math.sqrt(minSpeed / speed);
            } else if (speed > maxSpeed) {
                speedFactor = Math.sqrt(maxSpeed / speed);
            }
            v.x *= speedFactor;
            v.y *= speedFactor;
            this.ball.getComponent(Laya.RigidBody).setVelocity(v);
            console.log("Ball speed", speed, v.x, v.y);
        }
    }

    moveBoardVertically(board: Laya.Sprite, delta: Laya.Vector2): void {
        let half_height = (Laya.stage.height - board.height) / 2;
        let targetY = board.y + delta.y * this.vmoveFactor;

        targetY = clamp(targetY, -half_height, half_height);
        // let targetX = board.x;

        board.pos(board.x, targetY);
    }

    launchBall() {
        if (this.isBallLaunched) return;

        // prevent initWard from being (0, 0)
        let initWard = new Laya.Vector2(this.ball.x - this.playerBoard.x + 1e-7, this.ball.y - this.playerBoard.y);
        let length = Math.sqrt(initWard.x * initWard.x + initWard.y * initWard.y);
        initWard.x /= length;
        initWard.y /= length;

        // set ball speed   
        let speed = new Laya.Vector2(initWard.x * this.ballInitialSpeed, initWard.y * this.ballInitialSpeed);

        this.ball.getComponent(Laya.RigidBody).setVelocity(speed);

        this.isBallLaunched = true;
        console.log("Ball launched", speed.x, speed.y);
    }
}