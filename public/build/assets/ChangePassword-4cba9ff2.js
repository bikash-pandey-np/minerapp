import{r as d,a as y,j as s}from"./app-9776f975.js";import{L as g}from"./Layout-a722a78a.js";import{z as v,F as m,a as p,A as _}from"./index-149b70ee.js";import{H as C}from"./Helmet-009dc957.js";import{m as t}from"./index-e82f3d28.js";/* empty css            */import"./iconBase-549d7331.js";import"./ReactToastify-ccecd9fe.js";const $=({errors:a,title:x})=>{const[n,u]=d.useState(!1),[o,h]=d.useState(!1),[l,b]=d.useState(!1),{data:i,setData:r,post:j,processing:w}=y({current_password:"",new_password:"",new_password_confirmation:""}),N=e=>{e.preventDefault(),j(route("miners.change-password"),{onSuccess:()=>{r({current_password:"",new_password:"",new_password_confirmation:""})}})},f={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5,ease:"easeOut"}}},c={focus:{scale:1.02},tap:{scale:.98}};return s.jsxs(g,{title:"Change Password",description:"Change your account password securely",backHref:route("miners.settings"),children:[s.jsx(C,{children:s.jsx("title",{children:x})}),s.jsx(t.div,{className:"max-w-xl mx-auto px-4 mb-[5rem] md:mb-[10rem]",initial:"hidden",animate:"visible",variants:f,children:s.jsx("div",{className:"card bg-base-100 shadow-xl",children:s.jsxs("div",{className:"card-body relative",children:[w&&s.jsx("div",{className:"absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center",children:s.jsx("div",{className:"w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"})}),s.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[s.jsx("div",{className:"p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500",children:s.jsx(v,{className:"w-6 h-6 text-white"})}),s.jsx("h2",{className:"card-title text-2xl font-bold text-gray-700",children:"Change Password"})]}),s.jsxs("form",{onSubmit:N,children:[s.jsxs("div",{className:"form-control mb-4",children:[s.jsx("label",{className:"label",children:s.jsx("span",{className:"label-text",children:"Current Password"})}),s.jsxs("div",{className:"relative",children:[s.jsx(t.input,{variants:c,whileFocus:"focus",whileTap:"tap",type:n?"text":"password",className:`input input-bordered text-gray-600 w-full pr-10 ${a.current_password?"input-error":""}`,value:i.current_password,onChange:e=>r("current_password",e.target.value)}),s.jsx("button",{type:"button",className:"absolute right-3 top-1/2 -translate-y-1/2",onClick:()=>u(!n),children:n?s.jsx(m,{className:"text-gray-500"}):s.jsx(p,{className:"text-gray-500"})})]}),a.current_password&&s.jsx("span",{className:"text-error text-sm mt-1",children:a.current_password})]}),s.jsxs("div",{className:"form-control mb-4",children:[s.jsx("label",{className:"label",children:s.jsx("span",{className:"label-text",children:"New Password"})}),s.jsxs("div",{className:"relative",children:[s.jsx(t.input,{variants:c,whileFocus:"focus",whileTap:"tap",type:o?"text":"password",className:`input input-bordered text-gray-600 w-full pr-10 ${a.new_password?"input-error":""}`,value:i.new_password,onChange:e=>r("new_password",e.target.value)}),s.jsx("button",{type:"button",className:"absolute right-3 top-1/2 -translate-y-1/2",onClick:()=>h(!o),children:o?s.jsx(m,{className:"text-gray-500"}):s.jsx(p,{className:"text-gray-500"})})]}),a.new_password&&s.jsx("span",{className:"text-error text-sm mt-1",children:a.new_password})]}),s.jsxs("div",{className:"form-control mb-6",children:[s.jsx("label",{className:"label",children:s.jsx("span",{className:"label-text",children:"Confirm New Password"})}),s.jsxs("div",{className:"relative",children:[s.jsx(t.input,{variants:c,whileFocus:"focus",whileTap:"tap",type:l?"text":"password",className:`input input-bordered text-gray-600 w-full pr-10 ${a.new_password_confirmation?"input-error":""}`,value:i.new_password_confirmation,onChange:e=>r("new_password_confirmation",e.target.value)}),s.jsx("button",{type:"button",className:"absolute right-3 top-1/2 -translate-y-1/2",onClick:()=>b(!l),children:l?s.jsx(m,{className:"text-gray-500"}):s.jsx(p,{className:"text-gray-500"})})]}),a.new_password_confirmation&&s.jsx("span",{className:"text-error text-sm mt-1",children:a.new_password_confirmation})]}),s.jsxs(t.button,{whileHover:{scale:1.02},whileTap:{scale:.98},className:"btn btn-primary gap-2",disabled:w,children:[s.jsx(_,{className:"w-4 h-4"})," Update Password"]})]})]})})})]})};export{$ as default};