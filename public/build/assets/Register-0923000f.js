import{a as f,r as o,j as e,L as w}from"./app-9776f975.js";import{F as m,a as c}from"./index-149b70ee.js";import{H as N}from"./Helmet-009dc957.js";/* empty css            */import"./iconBase-549d7331.js";const E=({title:d})=>{const{data:t,setData:r,post:p,processing:i,errors:s}=f({full_name:"",email:"",password:"",password_confirmation:""}),[l,x]=o.useState(!1),[n,u]=o.useState(!1),h=a=>{a.preventDefault(),p(route("miners.register"))},j=()=>{x(!l)},b=()=>{u(!n)};return e.jsxs("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4",children:[e.jsx(N,{children:e.jsx("title",{children:d})}),e.jsx("div",{className:"card w-full max-w-md bg-base-100 shadow-2xl",children:e.jsxs("div",{className:"card-body",children:[e.jsx("h2",{className:"card-title text-3xl font-bold mb-6 text-center text-primary",children:"Register"}),e.jsxs("form",{onSubmit:h,children:[e.jsxs("div",{className:"form-control",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text text-lg",children:"Full Name"})}),e.jsx("input",{type:"text",placeholder:"Enter your full name",className:`input input-bordered input-primary w-full ${s.full_name?"input-error":""}`,value:t.full_name,onChange:a=>r("full_name",a.target.value)}),s.full_name&&e.jsx("span",{className:"text-error text-sm mt-1",children:s.full_name})]}),e.jsxs("div",{className:"form-control mt-4",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text text-lg",children:"Email"})}),e.jsx("input",{type:"email",placeholder:"Enter your email",className:`input input-bordered input-primary w-full ${s.email?"input-error":""}`,value:t.email,onChange:a=>r("email",a.target.value)}),s.email&&e.jsx("span",{className:"text-error text-sm mt-1",children:s.email})]}),e.jsxs("div",{className:"form-control mt-4",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text text-lg",children:"Password"})}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:l?"text":"password",placeholder:"Enter your password",className:`input input-bordered input-primary w-full ${s.password?"input-error":""}`,value:t.password,onChange:a=>r("password",a.target.value)}),e.jsx("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:j,children:l?e.jsx(m,{}):e.jsx(c,{})})]}),s.password&&e.jsx("span",{className:"text-error text-sm mt-1",children:s.password})]}),e.jsxs("div",{className:"form-control mt-4",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text text-lg",children:"Confirm Password"})}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:n?"text":"password",placeholder:"Confirm your password",className:`input input-bordered input-primary w-full ${s.password_confirmation?"input-error":""}`,value:t.password_confirmation,onChange:a=>r("password_confirmation",a.target.value)}),e.jsx("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:b,children:n?e.jsx(m,{}):e.jsx(c,{})})]}),s.password_confirmation&&e.jsx("span",{className:"text-error text-sm mt-1",children:s.password_confirmation})]}),e.jsx("div",{className:"form-control mt-8",children:e.jsx("button",{className:"btn btn-primary btn-block text-lg",disabled:i,children:i?"Registering...":"Register"})})]}),e.jsx("div",{className:"divider my-8",children:"OR"}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm",children:"Already have an account?"}),e.jsx(w,{href:route("miners.login"),className:"btn btn-secondary btn-block mt-2",children:"Login Now"})]})]})})]})};export{E as default};