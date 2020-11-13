"use strict";
/**
 * @author zhangxin
 * @description 强大的gizmo父类super-gizmo
 * @version 0.0.1
 * 2020/10/20
 */
//@ts-ignore
const fs = Editor.require('fs');
const projectPath = Editor.Project.path;
const profilePath = `${projectPath}/local/super-gizmo.json`;
const packagePath = `${projectPath}/packages/super-gizmo/package.json`;
class superGizmo extends Editor.Gizmo {
    constructor() {
        super(...arguments);
        //#region property 👈
        this.circles = [[]];
        this.lines = [[]];
        this.paths = [[]];
        this.rects = [[]];
        this.touchCircles = [[]];
        this.touchLines = [[]];
        this.touchPaths = [[]];
        this.touchRects = [[]];
        this.groups = [];
        this.defaultStartColor = '#FF0000ff';
        this.defaultEndColor = '#11F998ff';
        this.defaultCircleFillColor = '#FF0000ff';
        this.defaultCircleStrokeColor = '#FFFFFFFF';
        this.defaultLineStrokeColor = '#E7FF00FF';
        this.defaultPathFillColor = 'none';
        this.defaultPathStrokeColor = 'yellow';
        this.defaultRectFillColor = 'transparent';
        this.defaultRectStrokeColor = 'red';
        this.defaultTouchFillColor = 'transparent';
        this.defaultTouchStrokeColor = 'transparent';
        this.defaultStrokeWidth = 5;
        this.defaultLineDashArray = "5";
        this.defaultCircleDashArray = '';
        this.defaultPathDashArray = '10,5,5,5,5,10';
        this.defaultRectDashArray = '8,5,8';
        this.defaultTouchStrokeWidth = 10;
        this.defaultCircleRadius = 8;
        this.defaultRectWidth = 8;
        this.defaultRectHeight = 8;
        this.defaultTouchCircleRadius = 8;
        this.defaultTouchRectWidth = 8;
        this.defaultTouchRectHeight = 8;
    }
    //#endregion
    //#region getFittedData 👈
    /**
      * 四舍五入取整
      * @param num
      */
    round(num) {
        return Math.round(num * 10) / 10;
    }
    convertToNodePostion({ x = 0, y = 0 }) {
        let position = cc.v2(x, this._view.offsetHeight - y);
        position = Editor.GizmosUtils.snapPixelWihVec2(position);
        position = this._view.pixelToWorld(position);
        position = this.node.convertToNodeSpaceAR(position);
        return position;
    }
    getBezierPathData(...points) {
        let start = points[0];
        let str = `M ${start[0]},${start[1]} C`;
        let newPoints = points.slice(1);
        str += newPoints.join(',');
        return str;
    }
    getClosePathData(...points) {
        let start = points[0];
        let str = `M ${start[0]},${start[1]} L`;
        let newPoints = points.slice(1);
        str += newPoints.join(',');
        str += "Z";
        return str;
    }
    /**拿到适配后的数字 */
    getFittedNumber(num) {
        return this._view.scale * num;
    }
    /**得到适配后的strokeData*/
    getFittedStrokeData({ width = 10, color = '', opacity = 1, linecap = '', linejoin = '', miterlimit = 0, dasharray = '', dashoffset = 0 } = {}) {
        let newDashArray = dasharray.split(',').map(v => Number(v) * this._view.scale).join(',');
        return { width: width * this._view.scale, color: color == '' ? undefined : color, opacity, linecap: linecap == '' ? undefined : linecap, linejoin: linejoin == '' ? undefined : linejoin, miterlimit, dasharray: dasharray == '' ? undefined : newDashArray, dashoffset: dashoffset * this._view.scale };
    }
    getFittedPosition(pointAlias) {
        let posx = 0;
        let posy = 0;
        if (pointAlias instanceof Array) {
            posx = pointAlias[0];
            posy = pointAlias[1];
        }
        else if (pointAlias.x != null && pointAlias.y != null) {
            posx = pointAlias.x;
            posy = pointAlias.y;
        }
        let fittedPos = Editor.GizmosUtils.snapPixelWihVec2(cc.v2(posx, posy).mul(this._view.scale));
        fittedPos.y = -fittedPos.y;
        return fittedPos;
    }
    getFittedPositionArray(...pointArrayAlias) {
        //@ts-ignore
        let arr = pointArrayAlias.map((v) => {
            let point = this.getFittedPosition(v);
            return [point.x, point.y];
        });
        return arr;
    }
    //#endregion
    //#region getSVGElement 👈
    getGroup(index = 0) {
        let group = this.groups[index];
        if (!group) {
            this.groups[index] = group = this._root.group();
        }
        return group;
    }
    getCircle(drawIndex = 0, groupIndex = 0) {
        this.circles[groupIndex] = this.circles[groupIndex] || [];
        let circle = this.circles[groupIndex][drawIndex];
        if (!circle) {
            this.circles[groupIndex][drawIndex] = circle = this.getGroup(groupIndex).circle();
        }
        circle.stroke(this.getFittedStrokeData({ color: this.defaultCircleStrokeColor, width: this.defaultStrokeWidth, dasharray: this.defaultCircleDashArray }))
            .fill({ color: this.defaultCircleFillColor })
            .radius(this.getFittedNumber(this.defaultCircleRadius));
        circle.attr('drawIndex', drawIndex);
        circle.attr('groupIndex', groupIndex);
        circle.type = 'circle';
        return circle;
    }
    getTouchCircle(drawIndex = 0, groupIndex = 0) {
        this.touchCircles[groupIndex] = this.touchCircles[groupIndex] || [];
        let circle = this.touchCircles[groupIndex][drawIndex];
        if (!circle) {
            this.touchCircles[groupIndex][drawIndex] = circle = this.getGroup(groupIndex).circle()
                // 设置点击区域，这里设置的是根据 fill 模式点击
                .style('pointer-events', 'fill')
                // 设置鼠标样式
                .style('cursor', 'move');
            // 注册点击事件
            this.registerMoveSvg(circle, circle, { cursor: 'move', ignoreWhenHoverOther: true });
        }
        circle.stroke(this.getFittedStrokeData({ width: this.defaultTouchStrokeWidth }))
            .fill({ color: this.defaultTouchFillColor })
            .stroke({ color: this.defaultTouchStrokeColor, width: this.defaultStrokeWidth })
            .radius(this.getFittedNumber(this.defaultTouchCircleRadius));
        circle.attr('drawIndex', drawIndex);
        circle.attr('groupIndex', groupIndex);
        circle.type = 'circle';
        return circle;
    }
    getLine(drawIndex = 0, groupIndex = 0) {
        this.lines[groupIndex] = this.lines[groupIndex] || [];
        let line = this.lines[groupIndex][drawIndex];
        if (!line) {
            this.lines[groupIndex][drawIndex] = line = this.getGroup(groupIndex).line();
            // 注册点击事件
            this.registerMoveSvg(line, line, { cursor: 'pointer', ignoreWhenHoverOther: true });
        }
        line.stroke(this.getFittedStrokeData({ color: this.defaultLineStrokeColor, width: this.defaultStrokeWidth, dasharray: this.defaultLineDashArray }));
        line.attr('drawIndex', drawIndex);
        line.attr('groupIndex', groupIndex);
        line.type = 'line';
        return line;
    }
    getTouchLine(drawIndex = 0, groupIndex = 0) {
        this.touchLines[groupIndex] = this.touchLines[groupIndex] || [];
        let line = this.touchLines[groupIndex][drawIndex];
        if (!line) {
            this.touchLines[groupIndex][drawIndex] = line = this.getGroup(groupIndex).line()
                .style('pointer-events', 'all')
                .style('cursor', 'pointer');
            this.registerMoveSvg(line, line, { cursor: 'pointer', ignoreWhenHoverOther: true });
        }
        line.stroke(this.getFittedStrokeData({ color: this.defaultTouchStrokeColor, width: this.defaultTouchStrokeWidth }));
        line.attr('drawIndex', drawIndex);
        line.attr('groupIndex', groupIndex);
        line.type = 'line';
        return line;
    }
    getPath(drawIndex = 0, groupIndex = 0) {
        this.paths[groupIndex] = this.paths[groupIndex] || [];
        let path = this.paths[groupIndex][drawIndex];
        if (!path) {
            path = this.paths[groupIndex][drawIndex] = this.getGroup(groupIndex).path();
        }
        path.stroke(this.getFittedStrokeData({ color: this.defaultPathStrokeColor, width: this.defaultStrokeWidth, dasharray: this.defaultPathDashArray }))
            .fill({ color: this.defaultPathFillColor });
        path.type = 'path';
        path.attr('drawIndex', drawIndex);
        path.attr('groupIndex', groupIndex);
        return path;
    }
    getTouchPath(drawIndex = 0, groupIndex = 0) {
        this.touchPaths[groupIndex] = this.touchPaths[groupIndex] || [];
        let path = this.touchPaths[groupIndex][drawIndex];
        if (!path) {
            path = this.touchPaths[groupIndex][drawIndex] = this.getGroup(groupIndex).path()
                .style('pointer-events', 'all')
                .style('cursor', 'pointer');
            this.registerMoveSvg(path, path, { cursor: 'pointer', ignoreWhenHoverOther: true });
        }
        path.stroke(this.getFittedStrokeData({ color: this.defaultTouchStrokeColor, width: this.defaultTouchStrokeWidth }))
            .fill({ color: this.defaultTouchFillColor });
        path.type = 'path';
        path.attr('drawIndex', drawIndex);
        path.attr('groupIndex', groupIndex);
        return path;
    }
    getRect(drawIndex = 0, groupIndex = 0) {
        this.rects[groupIndex] = this.rects[groupIndex] || [];
        let rect = this.rects[groupIndex][drawIndex];
        if (!rect) {
            rect = this.rects[groupIndex][drawIndex] = this.getGroup(groupIndex).rect(200, 200);
        }
        rect.stroke(this.getFittedStrokeData({ color: this.defaultRectStrokeColor, width: this.defaultStrokeWidth, dasharray: this.defaultRectDashArray }))
            .fill({ color: this.defaultRectFillColor })
            .cx(0)
            .cy(0)
            .width(this.getFittedNumber(this.defaultRectWidth))
            .height(this.getFittedNumber(this.defaultRectHeight))
            .dx(-rect.width() / 2);
        rect.type = 'rect';
        rect.attr('drawIndex', drawIndex);
        rect.attr('groupIndex', groupIndex);
        return rect;
    }
    getTouchRect(drawIndex = 0, groupIndex = 0) {
        this.touchRects[groupIndex] = this.touchRects[groupIndex] || [];
        let rect = this.touchRects[groupIndex][drawIndex];
        if (!rect) {
            rect = this.touchRects[groupIndex][drawIndex] = this.getGroup(groupIndex).rect()
                .style('pointer-events', 'all')
                .style('cursor', 'pointer');
            this.registerMoveSvg(rect, rect, { cursor: 'pointer', ignoreWhenHoverOther: true });
        }
        rect.stroke(this.getFittedStrokeData({ width: this.defaultTouchStrokeWidth }))
            .fill({ color: this.defaultTouchFillColor })
            .stroke({ color: this.defaultTouchStrokeColor })
            .fill(this.defaultTouchFillColor)
            .cx(0)
            .cy(0)
            .width(this.getFittedNumber(this.defaultTouchRectWidth))
            .height(this.getFittedNumber(this.defaultTouchRectHeight))
            .dx(-rect.width() / 2);
        rect.type = 'rect';
        rect.attr('drawIndex', drawIndex);
        rect.attr('groupIndex', groupIndex);
        return rect;
    }
    //#endregion
    clear() {
        this.circles.forEach(arr => arr.forEach(v => v.radius(0)));
        this.lines.forEach(arr => arr.forEach(v => v.plot(0, 0, 0, 0)));
        this.paths.forEach(arr => arr.forEach(v => v.plot()));
        this.rects.forEach(arr => arr.forEach(v => v.width(0).stroke({ width: 0 })));
        this.touchCircles.forEach(arr => arr.forEach(v => v.radius(0)));
        this.touchLines.forEach(arr => arr.forEach(v => v.plot(0, 0, 0, 0)));
        this.touchPaths.forEach(arr => arr.forEach(v => v.plot()));
        this.touchRects.forEach(arr => arr.forEach(v => v.width(0).stroke({ width: 0 })));
    }
    draw(...any) {
        let pos = this.getFittedPosition([20, 20]);
        this.getCircle()
            .center(pos.x, pos.y)
            .radius(10 * this._view.scale);
        this.getTouchCircle()
            .center(pos.x, pos.y)
            .radius(20 * this._view.scale);
        let posArray = this.getFittedPositionArray([0, 0], [-250, -250]);
        this.getLine()
            .plot(posArray);
        this.getTouchLine()
            .plot(posArray);
        let posArray2 = this.getFittedPositionArray([-200, 343], [250, -250]);
        this.getLine(1)
            .plot(posArray2);
        this.getTouchLine(1)
            .plot(posArray2);
        let rect = this.getRect();
        rect
            .cx(0)
            .cy(0)
            .width(200 * this._view.scale)
            .height(200 * this._view.scale)
            .dx(-rect.width() / 2);
        let touchRect = this.getTouchRect();
        touchRect
            .cx(0)
            .cy(0)
            .width(200 * this._view.scale)
            .height(200 * this._view.scale)
            .dx(-touchRect.width() / 2);
        let path = this.getPath();
        path.plot(this.getBezierPathData(...this.getFittedPositionArray([0, 0], [20, 10], [200, -22], [100, 0])));
    }
    render() {
        try {
            this.clear();
            this.draw();
        }
        catch (error) {
            Editor.warn(error);
        }
    }
    init() {
    }
    resetData() {
        let data;
        const isExists = fs.existsSync(profilePath);
        if (!isExists) {
            const defaultData = JSON.parse(fs.readFileSync(packagePath)).profiles.local;
            fs.writeFileSync(profilePath, JSON.stringify(defaultData));
        }
        const file = fs.readFileSync(profilePath);
        data = JSON.parse(file);
        for (const tag in data) {
            for (const key in data[tag]) {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    const element = data[tag][key];
                    //@ts-ignore
                    this[key] = element;
                }
            }
        }
        Editor.success(Editor.T('super-gizmo.useConfigMessage'));
    }
    onCreateMoveCallbacks() {
        // 创建 gizmo 操作回调
        // 申明一些局部变量
        let selectedPoint; // 按下鼠标时记录的位置
        let pressx, pressy; // 按下鼠标时记录的鼠标位置
        return {
            /**
             * 在 gizmo 上按下鼠标时触发
             * @param x 按下点的 x 坐标
             * @param y 按下点的 y 坐标
             * @param event mousedown dom event
             */
            start: (x, y, event, shape) => {
                const type = shape.type;
                pressx = x;
                pressy = y;
                const node = this.node;
                const drawIndex = shape.attr('drawIndex');
                const groupIndex = shape.attr('groupIndex');
                // 转换坐标点到节点下
                let position = this.convertToNodePostion({ x, y });
                selectedPoint = position.clone();
                const selector = {
                    'circle': this.onCircleTouchBegan.bind(this),
                    'rect': this.onRectTouchBegan.bind(this),
                    'path': this.onPathTouchBegan.bind(this),
                    'line': this.onLineTouchBegan.bind(this)
                };
                //@ts-ignore
                if (selector[type])
                    //@ts-ignore
                    selector[type](position, event, drawIndex, groupIndex, shape);
            },
            /**
             * 在 gizmo 上按下鼠标移动时触发
             * @param dx 鼠标移动的 x 位移
             * @param dy 鼠标移动的 y 位移
             * @param event mousedown dom event
             */
            update: (dx, dy, event, shape) => {
                const type = shape.type;
                const drawIndex = shape.attr('drawIndex');
                const groupIndex = shape.attr('groupIndex');
                dx = this.round(dx / this._view.scale);
                dy = this.round(dy / this._view.scale);
                const selector = {
                    'circle': this.onCircleTouchMoved.bind(this),
                    'rect': this.onRectTouchMoved.bind(this),
                    'path': this.onPathTouchMoved.bind(this),
                    'line': this.onLineTouchMoved.bind(this)
                };
                //@ts-ignore
                if (selector[type])
                    //@ts-ignore
                    selector[type](selectedPoint, dx, dy, event, drawIndex, groupIndex, shape);
            },
            /**
             * 在 gizmo 抬起鼠标时触发
             * @param event mousedown dom event
             */
            end: (event, shape) => {
                const type = shape.type;
                const drawIndex = shape.attr('drawIndex');
                const groupIndex = shape.attr('groupIndex');
                const selector = {
                    'circle': this.onCircleTouchEnd.bind(this),
                    'rect': this.onRectTouchEnd.bind(this),
                    'path': this.onPathTouchEnd.bind(this),
                    'line': this.onLineTouchEnd.bind(this)
                };
                //@ts-ignore
                if (selector[type])
                    //@ts-ignore
                    selector[type](event, drawIndex, groupIndex, shape);
                selectedPoint = null;
            }
        };
    }
    onCreateRoot() {
        // 创建 svg 根节点的回调，可以在这里创建你的 svg 工具
        // this._root 可以获取到 Editor.Gizmo 创建的 svg 根节点
        // 创建一个 svg 工具
        // group 函数文档 : http://documentup.com/wout/svg.js#groups
        Editor.success(Editor.T('super-gizmo.newSVG'));
        this.resetData();
        this.clear();
        this.circles = [[]];
        this.lines = [[]];
        this.paths = [[]];
        this.rects = [[]];
        this.touchCircles = [[]];
        this.touchLines = [[]];
        this.touchPaths = [[]];
        this.touchRects = [[]];
        this.groups = [];
    }
    onUpdate() {
        // 更新 svg 工具
        // 获取 gizmo 依附的组件
        let target = this.target;
        // 获取 gizmo 依附的节点
        let node = this.node;
        // // 获取节点世界坐标
        let position = node.convertToWorldSpaceAR(cc.v2(0, 0));
        // 转换世界坐标到 svg view 上
        // svg view 的坐标体系和节点坐标体系不太一样，这里使用内置函数来转换坐标
        position = this.worldToPixel(position);
        // 对齐坐标，防止 svg 因为精度问题产生抖动
        position = Editor.GizmosUtils.snapPixelWihVec2(position);
        this.groups.forEach(group => {
            group.move(position.x, position.y);
        });
        // 移动 svg 工具到坐标
        this.render();
    }
}
module.exports = superGizmo;
