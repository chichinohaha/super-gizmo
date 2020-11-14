## `superGizmo` 类型

继承于 [Editor.Gizmo](https://docs.cocos.com/creator/manual/zh/extension/api/editor-framework/renderer/gizmo.html)

超级gizmo

### 索引

##### 父类的属性

### Editor.Gizmo.prototype.node

Get node of the gizmo.

### Editor.Gizmo.prototype.nodes

Get current nodes of the gizmo.

### Editor.Gizmo.prototype.topNodes

Get current top nodes of the gizmo.

### Editor.Gizmo.prototype.selecting

Whether the gizmo is selecting.

### Editor.Gizmo.prototype.editing

Whether the gizmo is editing.

### Editor.Gizmo.prototype.hovering

Whether the gizmo is hovering.



##### 属性（properties）

- `circles`  `Svg.Circle[][]`

- `lines`  `Svg.Line[][]` 

- `paths`  `Svg.Path[][]`

- `rects`  `Svg.Rect[][]`

- `touchCircles`  `Svg.Circle[][]`

- `touchLines`  `Svg.Line[][]`

- `touchPaths`  `Svg.Path[][]`

- `touchRects`  `Svg.Rect[][]`

- `groups`  `Svg.G[]`

- `defaultStartColor`  `String`

- `defaultEndColor`  `String`

- `defaultCircleFillColor`  `String`

- `defaultCircleStrokeColor`  `String`

- `defaultLineStrokeColor`  `String`

- `defaultPathFillColor`  `String`

- `defaultPathStrokeColor`  `String`

- `defaultRectFillColor`  `String`

- `defaultRectStrokeColor`  `String`

- `defaultTouchFillColor`  `String`

- `defaultTouchStrokeColor`  `String`

- `defaultStrokeWidth`  `Number`

- `defaultLineDashArray`  `String`

- `defaultCircleDashArray`  `String`

- `defaultPathDashArray`  `String`

- `defaultRectDashArray`  `String`

- `defaultTouchStrokeWidth`  `Number`

- `defaultCircleRadius`  `Number`

- `defaultRectWidth`  `Number`

- `defaultRectHeight`  `Number`

- `defaultTouchCircleRadius`  `Number`

- `defaultTouchRectWidth`  `Number`

- `defaultTouchRectHeight`  `Number`

  

##### 父类的方法

## Methods

### Editor.Gizmo.prototype.registerMoveSvg(svg, args, opts)

Register a moveable svg element. When the svg element is moved, the callback created from `onCreateMoveCallbacks` will be called.

- `svg` Svg Element - The svg element which can move.

- `args` Object | Array - The args will parse to callback, you can check which svg element is moved with the args.

- ```
  opts
  ```

   

  Object - The options you can set.

  - `cursor` String - The move mouse cursor.
  - `ignoreWhenHoverOther` Boolean - Will ignore the mouse down event on this svg element if hover on other svg element.

```javascript
this.registerMoveSvg(moveRectSvg, 'move-rect');
this.registerMoveSvg(moveAnchorSvg, 'move-anchor-rect');
```

### Editor.Gizmo.prototype.recordChanges()

Record undo changes, generally gizmo will record changes automatically.

### Editor.Gizmo.prototype.commitChanges()

Commit undo changes, generally gizmo will commit changes automatically

### Editor.Gizmo.prototype.adjustValue(targets, keys, minDifference)

Adjust value to avoid value's fractional part to be too long.

- `targets` [Object] - The target wich should adjust.
- `keys` String (optional) - If not specified, then will adjust all available properties on target.
- `minDifference` Number(optionnal) - The decimal precision, default is `Editor.Gizmo.prototype.defaultMinDifference()`

```javascript
this.adjustValue(this.node, ['position']);
```

### Editor.Gizmo.prototype.worldToPixel(position)

Convert cocos2d world position to svg position.

### Editor.Gizmo.prototype.pixelToWorld(position)

Convert svg position to cocos2d world position.

### Editor.Gizmo.prototype.sceneToPixel(position)

Convert cocos2d scene position to svg position.

### Editor.Gizmo.prototype.pixelToScene(position)

Convert svg position to cocos2d scene position.

## Inherit Methods

### Editor.Gizmo.prototype.init()

Call when init a gizmo, you can reimplement this function to do your self init.

Default implement:

```javascript
init () {
    // init logic
}
```

### Editor.Gizmo.prototype.layer()

There three layer types now: background, scene, foreground, generally we add gizmo to scene layer.

Default implement:

```javascript
layer () {
    return 'scene';
}
```

### Editor.Gizmo.prototype.visible()

Whether the gizmo is visible, if you want the gizmo always be visible, then return true.

Default implement:

```javascript
visible () {
    return this.selecting || this.editing;
}
```

### Editor.Gizmo.prototype.dirty()

Whether the gizmo is dirty, the gizmo will only update when gizmo is dirty. If you want to update gizmo every frame then `return true`.

Default implement:

```javascript
dirty () {
    return this._viewDirty() || this._nodeDirty() || this._dirty;
}
```

### Editor.Gizmo.prototype.onCreateRoot()

This function will call when create the root svg element for a gizmo. You can implement this function to custom your gizmo creation.

```javascript
onCreateRoot () {
    // your implement
    var tool = this._root.group();
}
```

### Editor.Gizmo.prototype.onCreateMoveCallbacks()

This callback return from the function will call when the moveable svg element is moved.

The callback should include methods with:

- start(x, y, event, ...args) - Called when mouse press on the svg
  - `x` Number - Press x position
  - `y` Number - Press y position
  - `event` MouseEvent - The mouse event
  - `args` - The arguments parsed from `registerMoveSvg`
- update(dx, dy, event, ...args) - Called when mouse move on the svg
  - `dx` Number - Horizontal move distance from current mouse position to start mouse position
  - `dy` Number - Vertical move distance from current mouse position to start mouse position
  - `event` MouseEvent - The mouse event
  - `args` - The arguments parsed from `registerMoveSvg`
- end(updated, event, ...args) - Called when mouse release on the svg
  - `updated` Boolean - Whether the mouse moved
  - `event` MouseEvent - The mouse event
  - `args` - The arguments parsed from `registerMoveSvg`

```javascript
onCreateMoveCallbacks () {
    return {
        start: (x, y, event, ...args) => {

        },
        update: (dx, dy, event, ...args) => {

        },
        end: (updated, event, ...args) => {

        }
    };
}
```

### Editor.Gizmo.prototype.defaultMinDifference()

Used for `Editor.Gizmo.prototype.adjustValue`.

The default min difference will be:

```javascript
defaultMinDifference() {
    return Editor.Math.numOfDecimalsF(1.0/this._view.scale);
}
```



##### 方法

- [convertToNodePostion](#convertToNodePostion) 将svg坐标系下的点转化到节点坐标
- [getBezierPathData](#getBezierPathData) 获取路径渲染贝塞尔所需要的数据
- [getClosePathData](#getClosePathData) 获取路径渲染封闭多边形所需要的数据
- [getFittedNumber](#getFittedNumber) 获取适配视图的数字
- [getFittedStrokeData](#getFittedStrokeData) 获取适配视图的StrokeData
- [getFittedPosition](#getFittedPosition) 获取适配视图的点
- [getFittedPositionArray](#getFittedPositionArray) 获取适配视图的点的数组
- [getGroup](#getGroup) 获取Svg根节点下的group
- [getCircle](#getCircle) 获取圆形
- [getTouchCircle](#getTouchCircle) 获取触控的圆形
- [getLine](#getLine) 获取线段
- [getTouchLine](#getTouchLine) 获取触控的线段
- [getPath](#getPath) 获取路径
- [getTouchPath](#getTouchPath) 获取触控的路径
- [getRect](#getRect) 获取矩形
- [getTouchRect](#getTouchRect) 获取触控的矩形
- [abstract onLineTouchBegan](#onLineTouchBegan) 线段点击开始回调
- [abstract onLineTouchMoved](#onLineTouchMoved) 线段拖拽回调
- [abstract onLineTouchEnd](#onLineTouchEnd) 线段点击结束回调
- [abstract onCircleTouchBegan](#onCircleTouchBegan) 圆形点击开始回调
- [abstract onCircleTouchMoved](#onCircleTouchMoved) 圆形拖拽回调
- [abstract onCircleTouchEnd](#onCircleTouchEnd) 圆形点击结束回调
- [abstract onRectTouchBegan](#onRectTouchBegan) 矩形点击开始回调
- [abstract onRectTouchMoved](#onRectTouchMoved) 矩形拖拽回调
- [abstract onRectTouchEnd](#onRectTouchEnd) 矩形点击结束回调
- [abstract onPathTouchBegan](#onPathTouchBegan)路径点击开始回调
- [abstract onPathTouchMoved](#onPathTouchMoved)路径拖拽回调
- [abstract onPathTouchEnd](#onPathTouchEnd)路径点击结束回调
- [clear](#clear) 清除
- [draw](#draw) 绘制
- [render](#render) 渲染
- [init](https://docs.cocos.com/creator/manual/zh/extension/api/editor-framework/renderer/gizmo.html#editorgizmoprototypeinit) 初始化
- [resetData](#resetData) 根据配置文件重新设置样式
- [onCreateMoveCallbacks](#onCreateMoveCallbacks) 创建 gizmo 操作回调
- [onCreateRoot](#onCreateRoot) 创造SVG根节点的回调
- [onUpdate](#onUpdate) 更新的回调

### Details

#### 方法

<span id="convertToNodePostion">**convertToNodePostion**</span>

将svg坐标系下的点转化到目标节点的节点坐标系。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) |
| 定义于 | [super-gizmo.js:59](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L59) |

###### 参数列表

- `point` {x?: number;y?: number;}

##### 示例

```js
//不推荐用这个
//建议开发者用getFittedPosition
var point = this.convertToNodePostion(cc.v2(2,3));
var point2= this.convertToNodePostion({x:2,y:1})
```


<span id="getBezierPathData">**getBezierPathData**</span>

获取路径渲染贝塞尔所需要的数据。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| 定义于 | [super-gizmo.js:66](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L66) |

###### 参数列表

- `...pointArray` \[number, number][]

##### 示例

```js
draw(){
	let path = this.getPath()
	let pointArray=this.getFittedPositionArray([0, 0],[20, 10], [200, -22], [100, 0])
	path.plot(this.getBezierPathData(...pointArray))
}
```



<span id="getClosePathData">**getClosePathData**</span>

获取路径渲染封闭多边形所需要的数据。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| 定义于 | [super-gizmo.js:73](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L73) |

###### 参数列表

- `...pointArray` \[number, number][]

##### 示例

```js
draw(){
	let path = this.getPath()
	let pointArray=this.getFittedPositionArray([0, 0], [20, 10], [200, -22], [100, 0])
	path.plot(this.getClosePathData(...pointArray))
}
```



<span id="getFittedNumber">**getFittedNumber**</span>

获取适配视图的数字。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| 定义于 | [super-gizmo.js:82](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L82) |

###### 参数列表

- `number` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

##### 示例

```js
draw(){
	let rect = this.getRect()
	rect.width(this.getFittedNumber(20))
}
```



<span id="getFittedStrokeData">**getFittedStrokeData**</span>

获取适配视图的StrokeData。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| 定义于 | [super-gizmo.js:86](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L86) |

###### 参数列表

- `strokeData` 

  {

  ​    width?: number;

  ​    color?: string;

  ​    opacity?: number;

  ​    linecap?: string;

  ​    linejoin?: string;

  ​    miterlimit?: number;

  ​    dasharray?: string;

  ​    dashoffset?: number;

    }

##### 示例

```js
draw(){
	let rect = this.getRect()
	rect.stroke(this.getFittedStrokeData({ color: this.defaultRectStrokeColor, width: this.defaultStrokeWidth, dasharray: this.defaultRectDashArray }))
}
```



<span id="getFittedPosition">**getFittedPosition**</span>

获取适配视图的点。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | { x:number; y:number }                                       |
| 定义于 | [super-gizmo.js:90](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L90) |

###### 参数列表

- `pointAlias` {x?:number; y?:number} | [number,number]

##### 示例

```js
draw(){
    let pos = this.getFittedPosition([20, 20]);
    this.getCircle()
        .center(pos.x, pos.y)
        .radius(10 * this._view.scale);
}
```




<span id="getFittedPositionArray">**getFittedPositionArray**</span>

获取适配视图的点的数组。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | \[number,number][]                                           |
| 定义于 | [super-gizmo.js:105](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L105) |

###### 参数列表

- `...pointAlias` {x?:number; y?:number}[] | \[number,number][]

##### 示例

```js
draw(){
	let path = this.getPath()
	let pointArray=this.getFittedPositionArray([0, 0],[20, 10], [200, -22], [100, 0])
	path.plot(this.getBezierPathData(...pointArray))
}
```




<span id="getGroup">**getGroup**</span>

获取Svg根节点下第index个group。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.G](https://svgjs.com/docs/3.0/container-elements/#svg-g) |
| 定义于 | [super-gizmo.js:105](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L105) |

###### 参数列表

- `index?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点的第几个group

##### 示例

```js
//不推荐这么做
this.getGroup(1).circle()
	.center(0,0)
```



<span id="getCircle">**getCircle**</span>

获取Svg根节点下指定的group的圆形,仅显示用。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Circle](https://svgjs.com/docs/3.0/shape-elements/#svg-circle) |
| 定义于 | [super-gizmo.js:122](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L122) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
    const points=[cc.v2(),cc.v2(),cc.v2()]
	points.forEach((p,index)=>{
		const p = this.getFittedPosition(p)
         this.getCircle(index)
          .center(p.x, p.y)
    })
}
```



<span id="getTouchCircle">**getTouchCircle**</span>

获取Svg根节点下指定的group已经注册了点击事件的圆形,用于交互。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Circle](https://svgjs.com/docs/3.0/shape-elements/#svg-circle) |
| 定义于 | [super-gizmo.js:136](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L136) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
    const points=[cc.v2(),cc.v2(),cc.v2()]
	points.forEach((p,index)=>{
		const p = this.getFittedPosition(p)
         this.getTouchCircle(index)
          .center(p.x, p.y)
    })
}
```



<span id="getLine">**getLine**</span>

获取Svg根节点下指定的group的线段,仅显示用。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Line](https://svgjs.com/docs/3.0/shape-elements/#svg-line) |
| 定义于 | [super-gizmo.js:157](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L157) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
    const points=[cc.v2(),cc.v2(),cc.v2()]
	points.forEach((p,index,arr)=>{
		const p = this.getFittedPosition(p)
		if(index!=arr.length-1)
        {
			const nextPoint=arr[index+1]
            this.getLine(index)
          		.plot([[p.x,p.y],[nextPoint.x,nextPoint.y]])   
		}
         
    })
}
```



<span id="getTouchLine">**getTouchLine**</span>

获取Svg根节点下指定的group已经注册了点击事件的线段,用于交互。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Line](https://svgjs.com/docs/3.0/shape-elements/#svg-line) |
| 定义于 | [super-gizmo.js:171](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L171) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
    const points=[cc.v2(),cc.v2(),cc.v2()]
	points.forEach((p,index,arr)=>{
		const p = this.getFittedPosition(p)
		if(index!=arr.length-1)
        {
			const nextPoint=arr[index+1]
            this.getTouchLine(index)
          		.plot([[p.x,p.y],[nextPoint.x,nextPoint.y]])   
		}
         
    })
}
```



<span id="getPath">**getPath**</span>

获取Svg根节点下指定的group的路径,仅显示用。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Path](https://svgjs.com/docs/3.0/shape-elements/#svg-path) |
| 定义于 | [super-gizmo.js:186](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L186) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
	let path = this.getPath()
	let pointArray=this.getFittedPositionArray([0, 0], [20, 10], [200, -22], [100, 0])
	path.plot(this.getClosePathData(...pointArray))
}
```



<span id="getTouchPath">**getTouchPath**</span>

获取Svg根节点下指定的group已经注册了点击事件的路径,用于交互。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Path](https://svgjs.com/docs/3.0/shape-elements/#svg-path) |
| 定义于 | [super-gizmo.js:199](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L199) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
	let path = this.getTouchPath()
	let pointArray=this.getFittedPositionArray([0, 0], [20, 10], [200, -22], [100, 0])
	path.plot(this.getClosePathData(...pointArray))
}
```



<span id="getRect">**getRect**</span>

获取Svg根节点下指定的group的矩形,仅显示用。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Rect](https://svgjs.com/docs/3.0/shape-elements/#svg-rect) |
| 定义于 | [super-gizmo.js:215](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L215) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
	const width=this.getFittedNumber(100)
	const rect=this.getRect().size(width,width)
}
```



<span id="getTouchRect">**getTouchRect**</span>

获取Svg根节点下指定的group已经注册了点击事件的矩形,用于交互。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [SVG.Rect](https://svgjs.com/docs/3.0/shape-elements/#svg-rect) |
| 定义于 | [super-gizmo.js:233](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L233) |

###### 参数列表

- `drawIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 绘制的第几个

- `groupIndex?` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 根节点下第几个Group

  

##### 示例

```js
draw()
{
	const width=this.getFittedNumber(100)
	const rect=this.getRect().size(width,width)
	const touchRect=this.getTouchRect().size(width,width)
}
```



<span id="onLineTouchBegan">**abstract onLineTouchBegan**</span>

线段点击开始回调。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:96](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L96) |

###### 参数列表

- `point` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击的点

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) group下的第几个TouchLine

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `line` [SVG.Line](https://svgjs.com/docs/3.0/shape-elements/#svg-line) 线段

  

<span id="onLineTouchMoved">**abstract onLineTouchMoved**</span>

线段拖拽的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:97](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L97) |

###### 参数列表

- `touchStartPoint` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击开始的点
- `dx` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 水平方向偏移
- `dy` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 竖直方向偏移
- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件
- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchLine
- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group
- `line` [SVG.Line](https://svgjs.com/docs/3.0/shape-elements/#svg-line) 线段



<span id="onLineTouchEnd">**abstract onLineTouchEnd**</span>

线段点击结束的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:98](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L98) |

###### 参数列表

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件
- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchLine
- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group
- `line` [SVG.Line](https://svgjs.com/docs/3.0/shape-elements/#svg-line) 线段



<span id="onCircleTouchBegan">**abstract onCircleTouchBegan**</span>

圆形点击开始回调。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:99](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L99) |

###### 参数列表

- `point` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击的点

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) group下的第几个TouchCircle

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `circle` [SVG.Circle](https://svgjs.com/docs/3.0/shape-elements/#svg-circle) 圆形



<span id="onCircleTouchMoved">**abstract onCircleTouchMoved**</span>

圆形拖拽的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:100](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L100) |

###### 参数列表

- `touchStartPoint` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击开始的点

- `dx` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 水平方向偏移

- `dy` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 竖直方向偏移

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchCircle

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `circle` [SVG.Circle](https://svgjs.com/docs/3.0/shape-elements/#svg-circle) 圆形

  

<span id="onCircleTouchEnd">**abstract onCircleTouchEnd**</span>

圆形点击结束的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:101](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L101) |

###### 参数列表

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件
- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchCircle
- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group
- `circle` [SVG.Circle](https://svgjs.com/docs/3.0/shape-elements/#svg-circle) 圆形



<span id="onRectTouchBegan">**abstract onRectTouchBegan**</span>

矩形点击开始回调。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:102](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L102) |

###### 参数列表

- `point` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击的点

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) group下的第几个TouchRect

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `rect` [SVG.Rect](https://svgjs.com/docs/3.0/shape-elements/#svg-rect) 矩形

  

<span id="onRectTouchMoved">**abstract onRectTouchMoved**</span>

矩形拖拽的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:103](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L103) |

###### 参数列表

- `touchStartPoint` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击开始的点

- `dx` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 水平方向偏移

- `dy` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 竖直方向偏移

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchRect

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `rect` [SVG.Rect](https://svgjs.com/docs/3.0/shape-elements/#svg-rect) 矩形

  

<span id="onRectTouchEnd">**abstract onRectTouchEnd**</span>

矩形点击结束的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:104](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L104) |

###### 参数列表

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchRect

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `rect` [SVG.Rect](https://svgjs.com/docs/3.0/shape-elements/#svg-rect) 矩形

  

<span id="onPathTouchBegan">**abstract onPathTouchBegan**</span>

路径点击开始回调。

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:105](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L105) |

###### 参数列表

- `point` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击的点

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) group下的第几个TouchPath

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `path` [SVG.Path](https://svgjs.com/docs/3.0/shape-elements/#svg-path) 路径

  

<span id="onPathTouchMoved">**abstract onPathTouchMoved**</span>

路径拖拽的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:106](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L106) |

###### 参数列表

- `touchStartPoint` [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) 目标节点的节点坐标系上点击开始的点

- `dx` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 水平方向偏移

- `dy` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 竖直方向偏移

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchPath

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `path` [SVG.Path](https://svgjs.com/docs/3.0/shape-elements/#svg-path) 路径

  

<span id="onPathTouchEnd">**abstract onPathTouchEnd**</span>

路径点击结束的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.d.ts:107](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.d.ts#L107) |

###### 参数列表

- `event` [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) 事件

- `drawIndex`[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  group下的第几个TouchPath

- `groupIndex` [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 属于根节点下的第几个group

- `path` [SVG.Path](https://svgjs.com/docs/3.0/shape-elements/#svg-path) 路径

  

<span id="clear">**clear**</span>

清除所有的渲染

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:257](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L257) |



<span id="draw">**draw**</span>

开发者绘制的入口

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:267](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L105) |



<span id="render">**render**</span>

渲染

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:302](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L302) |



<span id="resetData">**resetData**</span>

读取配置文件并解析后赋值给当前gizmo

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:313](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L313) |



<span id="onCreateMoveCallbacks">**onCreateMoveCallbacks**</span>

创建 gizmo 操作回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:333](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L333) |



<span id="onCreateRoot">**onCreateRoot**</span>

创建 svg 根节点的回调

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:411](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L411) |



<span id="onUpdate">**onUpdate**</span>

gizmo更新

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 定义于 | [super-gizmo.js:429](https://github.com/chichinohaha/super-gizmo/blob/main/scripts/super-gizmo.js#L429) |











