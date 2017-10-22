[TOC]

## 问题

1.在`Vue`实例中使用`vue-resource`的`this.$http.get(url)`方法时，路径获取不正确。
	解决方法：把获取的文件放到了static 文件夹中，目标文件路径是相对于整个项目的路径。
