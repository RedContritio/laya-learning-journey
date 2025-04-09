{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Main",
  "width": 1920,
  "height": 1080,
  "_$comp": [
    {
      "_$type": "7bad1742-6eed-4d8d-81c0-501dc5bf03d6",
      "scriptPath": "../src/Main.ts"
    }
  ],
  "_$child": [
    {
      "_$id": "89vq5xmg",
      "_$type": "Sprite",
      "name": "BG",
      "x": 960,
      "y": 540,
      "width": 1920,
      "height": 1080,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "texture": {
        "_$uuid": "52fd1670-17c7-475f-aea8-aaa3622f651e",
        "_$type": "Texture"
      },
      "drawCallOptimize": true,
      "_$comp": [
        {
          "_$type": "RigidBody",
          "type": "static"
        },
        {
          "_$id": "aqvv",
          "_$type": "ChainCollider",
          "restitution": 1,
          "label": "wall",
          "datas": [
            0,
            1080,
            1920,
            1080,
            1920,
            0,
            0,
            0
          ],
          "loop": true
        }
      ]
    },
    {
      "_$id": "exqc8gsq",
      "_$type": "Sprite",
      "name": "BoardGroup",
      "x": 960,
      "y": 540,
      "width": 0,
      "height": 0,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "_$child": [
        {
          "_$id": "vy178gaa",
          "_$type": "Sprite",
          "name": "PlayerBoard",
          "x": -880,
          "y": 1,
          "width": 48,
          "height": 250,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "texture": {
            "_$uuid": "00000000-0000-0000-0001-000000000000",
            "_$type": "Texture"
          },
          "_mouseState": 2,
          "_$comp": [
            {
              "_$type": "RigidBody",
              "type": "kinematic"
            },
            {
              "_$id": "bctg",
              "_$type": "BoxCollider",
              "restitution": 1,
              "label": "playerBoard",
              "width": 48,
              "height": 250
            }
          ]
        },
        {
          "_$id": "5lubqcqt",
          "_$type": "Sprite",
          "name": "NPCBoard",
          "x": 880,
          "width": 48,
          "height": 250,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "texture": {
            "_$uuid": "00000000-0000-0000-0001-000000000000",
            "_$type": "Texture"
          },
          "_$comp": [
            {
              "_$type": "RigidBody",
              "type": "kinematic"
            },
            {
              "_$id": "7d34",
              "_$type": "BoxCollider",
              "restitution": 1,
              "label": "npcBoard",
              "width": 48,
              "height": 250
            }
          ]
        },
        {
          "_$id": "oqy3xmfm",
          "_$type": "Sprite",
          "name": "Ball",
          "x": -830,
          "width": 50,
          "height": 50,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "_gcmds": [
            {
              "_$type": "DrawCircleCmd",
              "x": 0.5,
              "y": 0.5,
              "radius": 0.5,
              "percent": true,
              "lineWidth": 1,
              "fillColor": "#FFFFFF"
            }
          ],
          "_$comp": [
            {
              "_$type": "2962eb33-495b-4011-842c-e1f98026ced5",
              "scriptPath": "../src/Ball.ts"
            },
            {
              "_$type": "RigidBody",
              "allowRotation": false
            },
            {
              "_$id": "dy14",
              "_$type": "CircleCollider",
              "label": "ball",
              "radius": 25
            }
          ]
        }
      ]
    },
    {
      "_$id": "9kk3091f",
      "_$type": "HBox",
      "name": "TextGroup",
      "x": 960,
      "y": 120,
      "width": 1920,
      "height": 120,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "centerX": 0,
      "space": 0,
      "align": "middle",
      "_$child": [
        {
          "_$id": "a1hnq1lz",
          "_$type": "Text",
          "name": "PlayerScoreText",
          "y": 10,
          "width": 960,
          "height": 100,
          "text": "0",
          "fontSize": 100,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "leading": 2
        },
        {
          "_$id": "0b2lramd",
          "_$type": "Text",
          "name": "NPCScoreText",
          "x": 960,
          "y": 10,
          "width": 960,
          "height": 100,
          "text": "0",
          "fontSize": 100,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "leading": 2
        }
      ]
    }
  ]
}