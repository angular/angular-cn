# 注意

master分支下是老版本的文档，新版本的文档位于aio分支下。目前aio只是部署到了 <https://angular.cn>，但尚未撰写中文的部署指南，不过你可以尝试自行按照英文版的readme.md进行部署。

# angular.io 中文版

这里是 angular.io 字幕组，哦不对，是汉化组。译者汪志成 (雪狼)、叶志敏 (Rex) 和杨林 (todoubaba) 欢迎您的到访。

我们将和官方英文版保持同步翻译，并同步发布到国内镜像 - <https://angular.cn>。

## 授权协议

本文档遵循[“保持署名—非商用”创意共享4.0许可证（CC BY-NC 4.0）](http://creativecommons.org/licenses/by-nc/4.0/deed.zh)，请在**保持署名**、**非商用**的前提下自由使用，你甚至可以把它架设在自己的电脑或内网服务器上。

特别是：

- **不得去掉**“关于中文版”的入口链接，也不得增删改“关于中文版”页的内容。
- 如果您是**商业网站（包括但不限于任何有广告或收费的网站）**要发布或转载，请联系我们 <asnowwolf@gmail.com> 和 <rexebin@gmail.com>。

**违反上述授权协议将面临法律追究。**

## 编译与发布

1. 用`git clone https://github.com/angular/angular-cn.git`把本项目取到本地。
1. 用`git clone https://github.com/angular/angular.git`把 Angular 的源码取到本地。它将用来编译出 API 文档。
1. 进入`angular-cn`目录
1. 运行`npm install`安装依赖包
1. 运行`gulp serve-and-sync-devguide`命令进行本地预览
1. 运行`gulp build-compile --lang="(ts|js)"`命令进行编译
1. 把`./www`目录发布到任何静态文件服务器上

如果是内网服务器，你还可以通过自建 CI 进行同步更新。

## 更多信息

关于本中文版以及三位译者的更多信息，请参见[“关于中文版”](https://angular.cn/translate/cn/home.html)链接。
