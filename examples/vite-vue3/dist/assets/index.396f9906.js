import{f as B,d as a,_ as l,o as i,c as _,b as e,t as $,F as c,r,a as n,w as o,e as u}from"./index.50ebcd3c.js";const v=B({id:"user",state:()=>({name:"\u5F20\u4E09"}),actions:{updateName(t){this.name=t}}}),g=a({name:"UsePinia",setup(){return{userStore:v()}}}),C=e("h2",null,"\u6B22\u8FCE\u4F7F\u7528vite+vue3+ts+pinia+vue-router4",-1);function x(t,d,p,m,F,f){return i(),_(c,null,[C,e("div",null,$(t.userStore.name),1)],64)}var U=l(g,[["render",x]]),b="/assets/logo.03d6d6da.png";const S=a({name:"IndexPage",components:{UsePinia:U}}),P=e("img",{alt:"Vue logo",src:b},null,-1),k=e("br",null,null,-1),D=u("\u70B9\u51FB\u8DF3\u8F6C\u81F3login"),N=e("br",null,null,-1),V=e("br",null,null,-1),E=u("\u70B9\u51FB\u8DF3\u8F6C\u81F3vueUse\u9875\u9762"),q=e("br",null,null,-1),w=e("br",null,null,-1),y=u("\u70B9\u51FB\u8DF3\u8F6C\u81F3request\u8BF7\u6C42\u9875\u9762");function I(t,d,p,m,F,f){const h=r("UsePinia"),s=r("router-link");return i(),_(c,null,[P,n(h),k,n(s,{to:"/login"},{default:o(()=>[D]),_:1}),N,V,n(s,{to:"/vueUse"},{default:o(()=>[E]),_:1}),q,w,n(s,{to:"/request"},{default:o(()=>[y]),_:1})],64)}var j=l(S,[["render",I]]);export{j as default};
