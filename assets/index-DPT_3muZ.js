import{_ as T,r as q,e as S,f as l,o as a,c as x,a as t,g as p,h as s,b as e,w as o,t as k,i as n,j as u,v as i,p as z,d as U}from"./index-B7jdAFnZ.js";const I="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAMAAACFDcfaAAAAPFBMVEVHcEwAAAAAAAAAAACqqqoAAACqqqoAAABZWVkAAACqqqoAAACqqqqqqqqqqqqqqqqqqqqqqqrExMSxsbGmCYy0AAAAEXRSTlMABEoUZTLqZQtcUiG8lS3O3JEa0uIAAADcSURBVCjPpZPpEoMgDIQbzgAiou//ruVQy1XGTpcZf32zSTbx9fpFqK0TwlmNU0w7f8rpCWa9P/b9yKSdYTc1AVnEfCE2HkE0mN/wm52vNTRcfKdlHXBbz22jcETPCfYH97Tu0zlYz11lAQDDAzhzbtuLOQMiNTzJUBwaRjs0nCilpJThS3i0xKbDJZhRHpFbhMbSq2irUiJlzeUzLTkdi1ZuKtvVYIwODCkpfmHwmSVFAmhIdgwzmIvKKaYexbmIE0xWUMe9hl/J3XuAMHGAKAzuerHlHYdVYEm9ATfVGomBYwckAAAAAElFTkSuQmCC",D=r=>(z("data-v-4ad944e0"),r=r(),U(),r),H={class:"box1"},K={class:"box1"},M=D(()=>t("p",null,"初始化的时候有问题，输入的时候正常",-1)),Y={class:"box1"},N={class:"box1"},Z={src:I,style:{width:"200px"}},j={class:"box1"},F={style:{width:"200px"}},G={class:"box1"},J={class:"box1"},Q={"loading-text":"努力加载中...",style:{width:"200px",height:"200px",border:"1px solid red"}},R={class:"box1"},P={__name:"index",setup(r){const A=q("1234"),c=q("Hello 😊 World! 🌍 111 🤪 222"),v=q(!1),g=()=>{console.log("点击了按钮其他地方")},f=()=>{console.log("textarea",c)};return(O,d)=>{const h=S("el-input"),w=l("reserve"),b=l("filter-emoji"),y=l("copy"),C=l("real-img"),V=l("lazy-img"),m=l("permission"),B=l("loading"),E=l("clickoutside");return a(),x("div",null,[t("div",H,[p(s(i.Input),{type:"text",modelValue:A.value,"onUpdate:modelValue":d[0]||(d[0]=_=>A.value=_),style:{width:"200px"}},null,8,["modelValue"]),t("div",null,[e("字符串翻转指令："),o(t("span",null,null,512),[[w,A.value]])])]),t("div",K,[o(p(h,{modelValue:c.value,"onUpdate:modelValue":d[1]||(d[1]=_=>c.value=_),style:{width:"300px"},type:"textarea"},null,8,["modelValue"]),[[b,c.value]]),t("p",null,k(c.value),1),M,p(s(i.Button),{type:"primary",onClick:f},{default:n(()=>[e("获取值")]),_:1})]),t("div",Y,[e("复制文本指令："),o((a(),u(s(i.Button),{type:"primary"},{default:n(()=>[e("复制")]),_:1})),[[y,A.value]])]),t("div",N,[e(" 渲染真实图片指令： "),o(t("img",Z,null,512),[[C,"https://www.itying.com/images/flutter/1.png"]])]),t("div",j,[e(" 图片懒加载指令： "),t("div",null,[o(t("img",F,null,512),[[V,"https://www.itying.com/images/flutter/1.png"]])])]),t("div",G,[e(" 按钮权限指令： "),o((a(),u(s(i.Button),null,{default:n(()=>[e("用户模块")]),_:1})),[[m,"user"]]),o((a(),u(s(i.Button),null,{default:n(()=>[e("订单模块")]),_:1})),[[m,"order"]]),o((a(),u(s(i.Button),null,{default:n(()=>[e("商品模块")]),_:1})),[[m,"goods"]])]),t("div",J,[e(" loading指令： "),o((a(),x("div",Q,[e(" 内容 ")])),[[B,v.value]]),p(s(i.Button),{onClick:d[2]||(d[2]=_=>v.value=!v.value)},{default:n(()=>[e("显示/隐藏")]),_:1})]),t("div",R,[e(" 点击其他地方弹框消失指令： "),o((a(),u(s(i.Button),null,{default:n(()=>[e("点击")]),_:1})),[[E,g]])])])}}},X=T(P,[["__scopeId","data-v-4ad944e0"]]);export{X as default};
