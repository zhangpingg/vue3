import{A as u,g as e,b as n,o as s,c,i as r,h as i,a as p}from"./index-B7jdAFnZ.js";const d=u({props:{title:String},setup(o,{slots:l,emit:t}){const a=()=>{t("change","子组件数据")};return()=>e("div",null,[n("子组件："),e("br",null,null),o.title,n(" "),e("br",null,null),l.default(),n(" "),e("br",null,null),e("button",{onClick:a},[n("按钮")])])}}),_=p("span",null,"插槽",-1),h={__name:"index",setup(o){const l=t=>{console.log(t)};return(t,a)=>(s(),c("div",null,[n(" 父组件 "),e(i(d),{title:"标题",onChange:l},{default:r(()=>[_]),_:1})]))}};export{h as default};
