---
excerpt: 本质上，webpack是一个用于现代JavaScript应用程序的静态模块打包工具。当webpack处理应用程序时，它在内部从一个或多个入口点构建一个依赖图（dependency graph），然后将你项目中所需的每一个模块组合成一个或多个bundles，他们均为静态资源，用于展示你的内容。
---

# Webpack

## 概念

本质上，webpack是一个用于现代JavaScript应用程序的静态模块打包工具。当webpack处理应用程序时，它在内部从一个或多个入口点构建一个依赖图（dependency graph），然后将你项目中所需的每一个模块组合成一个或多个bundles，他们均为静态资源，用于展示你的内容。

## 入口（entry）

**入口起点（entry point）**指示webpack应该使用哪个模块，来作为构建其内部依赖图（dependency graph）的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认是`./src/index.js`，但你可以通过在webpack configuration中配置`entry`属性来制定一个或多个不同的入口起点。

## 输出（output）

output属性告诉webpack在哪里输出它所创建的bundle，以及如何命名这些文件。主要输出文件的默认值是`./dist/main.js`，其它生成文件默认放在`./dist`文件夹中。

你可以通过在配置中指定一个`output`字段，来配置这些处理过程。

## 加载器 （loader）

webpack只能理解JavaScript文件和JSON文件，这是webpack开箱可用的自带能力。loader让webpack能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图。

在webpack的配置中，loader有两个属性：

1. `test`属性，识别出哪些文件会被转换。
2. `use`属性，定义出在进行转换时，应该使用哪个loader。

## 插件（plugin）

loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。