import{m as u,o as p,c as d,g as m,i as x,h as c,b as r,a as n,n as l,v as g}from"./index-B7jdAFnZ.js";const f=n("br",null,null,-1),C=n("br",null,null,-1),w={__name:"index",setup(_){const{proxy:i}=u(),a=()=>{i.$confirm.show({title:"提示",content:"确定要删除该条数据吗？",onConfirm:()=>{console.log("确定")},onCancel:()=>{console.log("取消")}})},e=s=>{s.preventDefault(),i.$contextMenu.show({e:s,data:{id:1,name:"张三",age:10}})};return(s,t)=>(p(),d("div",null,[m(c(g.Button),{onClick:a},{default:x(()=>[r("打开自定义全局插件弹框")]),_:1}),r(),f,C,n("div",null,[n("p",{onContextmenu:t[0]||(t[0]=l(o=>e(o),["right"]))},"展示右键菜单",32),n("p",{style:{"text-align":"right"},onContextmenu:t[1]||(t[1]=l(o=>e(o),["right"]))},"展示右侧边界菜单",32),n("p",{style:{position:"absolute",bottom:"0px"},onContextmenu:t[2]||(t[2]=l(o=>e(o),["right"]))},"展示底部边界菜单",32)])]))}};export{w as default};
