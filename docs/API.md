## `superGizmo` 类型

继承于 [Editor.Gizmo](https //docs.cocos.com/creator/manual/zh/extension/api/editor-framework/renderer/gizmo.html)

超级gizmo

### 索引

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

##### 方法

- [convertToNodePostion](#convertToNodePostion) 将svg坐标系下的点转化到节点坐标
- [getBezierPathData](#getBezierPathData) 获取路径渲染贝塞尔所需要的数据
- [getClosePathData](#getClosePathData) 获取路径渲染封闭多边形所需要的数据
- [getFittedNumber](#getFittedNumber) 获取适配视图的数字
- [getFittedStrokeData](#getFittedStrokeData) 获取适配视图的StrokeData
- [getFittedPosition](#getFittedPosition) 获取适配视图的点
- [getFittedPositionArray](#getFittedPositionArray) 获取适配视图的点的数组
- [getGroup](#getGroup) 获取group
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
- [draw](#draw) 绘制
- [render](#render) 渲染
- [init](#init) 初始化
- [resetData](#resetData) 根据配置文件重新设置样式
- [onCreateMoveCallbacks](#onCreateMoveCallbacks) 创建移动的回调
- [onCreateRoot](#onCreateRoot) 创造SVG根节点的回调
- [onUpdate](#onUpdate) 更新的回调

### Details

#### 方法

<span id="convertToNodePostion">convertToNodePostion</span>

将svg坐标系下的点转化到节点坐标

| meta   | description                                                  |
| ------ | ------------------------------------------------------------ |
| 返回   | [cc.Vec2](https://docs.cocos.com/creator/api/zh/classes/Vec2.html) |
| 定义于 |                                                              |

<span id="getBezierPathData">getBezierPathData</span>

<span id="getClosePathData">getClosePathData</span>

<span id="getFittedNumber">getFittedNumber</span>
<span id="getFittedStrokeData">getFittedStrokeData</span>
<span id="getFittedPosition">getFittedPosition</span>
<span id="getFittedPositionArray">getFittedPositionArray</span>
<span id="getGroup">getGroup</span>
<span id="getCircle">getCircle</span>
<span id="getTouchCircle">getTouchCircle</span>
<span id="getLine">getLine</span>
<span id="getTouchLine">getTouchLine</span>
<span id="getPath">getPath</span>
<span id="getTouchPath">getTouchPath</span>
<span id="getRect">getRect</span>
<span id="getTouchRect">getTouchRect</span>
<span id="onLineTouchBegan">abstract onLineTouchBegan</span>
<span id="onLineTouchMoved">abstract onLineTouchMoved</span>
<span id="onLineTouchEnd">abstract onLineTouchEnd</span>
<span id="onCircleTouchBegan">abstract onCircleTouchBegan</span>
<span id="onCircleTouchMoved">abstract onCircleTouchMoved</span>
<span id="onCircleTouchEnd">abstract onCircleTouchEnd</span>
<span id="onRectTouchBegan">abstract onRectTouchBegan</span>
<span id="onRectTouchMoved">abstract onRectTouchMoved</span>
<span id="onRectTouchEnd">abstract onRectTouchEnd</span>
<span id="onPathTouchBegan">abstract onPathTouchBegan</span>
<span id="onPathTouchMoved">abstract onPathTouchMoved</span>
<span id="onPathTouchEnd">abstract onPathTouchEnd</span>
<span id="draw">draw</span>
<span id="render">render</span>
<span id="init">init</span>
<span id="resetData">resetData</span>

- <span id="onCreateMoveCallbacks">onCreateMoveCallbacks</span>
- <span id="onCreateRoot">onCreateRoot</span>
- <span id="onUpdate">onUpdate</span>