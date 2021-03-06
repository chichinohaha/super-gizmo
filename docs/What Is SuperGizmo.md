# 什么是SuperGizmo

`superGizmo` 是 `Editor.Gizmo`的抽象子类。

## 使用superGizmo开发具有以下特点

- 本地个性化

  利用package中的profile动态生成配置面板，设计人员如有扩展需求，只需要在对应位置添加字段，如color:{"newcolor":"rgba(1,2,2,2)"} 并且在i18n文件夹中添加翻译 即可享用本地化存储，在gizmo代码中可直接使用该字段（注意不能有重复名称的字段）。 每次按下配置面板保存按钮会自动更新gizmo的样式。

- 不再担心坐标系转化

  已实现大量的转化工作，开发者只需要调用适配的方法即可得到场景中想要的点，现已支持节点的缩放与旋转。

- 完整的智能提示

  已整合了SVG的d.ts在editor-renderer.d.ts。

- 强大的渲染方法

  可快速绘制圆形、直线、路径，利用路径绘画贝塞尔曲线或者封闭曲线。

- 便捷处理交互

  调用getTouch开头的方法即可获取注册好点击事件的图形 实现抽象类superGizmo的方法即可处理交互。

![where should i draw.jpg](https://raw.githubusercontent.com/chichinohaha/super-gizmo/main/images/where%20should%20i%20draw.png)

![draw.jpg](https://raw.githubusercontent.com/chichinohaha/super-gizmo/main/images/interaction.png)