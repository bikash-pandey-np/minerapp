import{r as l,u,j as e,L as f,d as y}from"./app-9776f975.js";import{L as b}from"./Layout-a722a78a.js";import{B as v,l as j,z as w,b as d,C as N,D as C,i as k}from"./index-149b70ee.js";import{H as S}from"./Helmet-009dc957.js";import{S as B}from"./sweetalert2.esm.all-073c5cf9.js";import{m as i,A as F}from"./index-e82f3d28.js";/* empty css            */import"./iconBase-549d7331.js";import"./ReactToastify-ccecd9fe.js";const O=({system_info:r,title:c})=>{const[o,a]=l.useState(!1),{is_email_verified:s}=u().props.customer;l.useEffect(()=>(o?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[o]);const m=()=>{B.fire({title:"Are you sure?",text:"You will be logged out of your account",icon:"warning",showCancelButton:!0,confirmButtonColor:"#6366f1",cancelButtonColor:"#ef4444",confirmButtonText:"Yes, logout!",background:"#1f2937",color:"#fff",customClass:{confirmButton:"bg-indigo-500 hover:bg-indigo-600",cancelButton:"bg-red-500 hover:bg-red-600"}}).then(t=>{t.isConfirmed&&y.Inertia.post(route("miners.logout"))})},g=[{title:"My Profile",description:"View and update your personal information",icon:v,href:route("miners.profile"),gradient:"from-blue-500 to-purple-500"},{title:"Withdraw",description:"Withdraw your earnings",icon:j,href:route("miners.withdraw"),gradient:"from-green-500 to-teal-500"},{title:"Change Password",description:"Update your account password",icon:w,href:route("miners.change-password"),gradient:"from-green-500 to-teal-500"},...s?[]:[{title:"Verify Email",description:"Verify your email address",icon:d,href:"#",gradient:"from-orange-500 to-red-500"}],{title:"System Info",description:"View system information and status",icon:N,onClick:()=>a(!0),gradient:"from-purple-500 to-pink-500"},{title:"Logout",description:"Sign out of your account",icon:C,onClick:m,gradient:"from-red-500 to-pink-500"}],p={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1}}},n={hidden:{y:20,opacity:0},show:{y:0,opacity:1,transition:{type:"spring",stiffness:100,damping:10}}},h={hidden:{opacity:0,scale:.8,y:50},visible:{opacity:1,scale:1,y:0,transition:{type:"spring",damping:25,stiffness:300}},exit:{opacity:0,scale:.8,y:50,transition:{duration:.2}}};return e.jsxs(b,{title:"Settings",description:"Manage your settings",children:[e.jsx(S,{children:e.jsx("title",{children:c})}),e.jsxs(i.div,{className:`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-[10rem] md:mb-[15rem] ${o?"blur-sm pointer-events-none":""}`,variants:p,initial:"hidden",animate:"show",children:[s&&e.jsx(i.div,{variants:n,className:"md:col-span-2",children:e.jsx("div",{className:"alert alert-success shadow-lg",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{className:"w-6 h-6 text-gray-200"}),e.jsx("span",{className:"text-gray-200 font-mono",children:"Your email has been verified!"})]})})}),g.map((t,x)=>e.jsx(i.div,{variants:n,whileHover:{scale:1.02,transition:{type:"spring",stiffness:400,damping:10}},children:t.onClick?e.jsx("div",{onClick:t.onClick,className:"card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden block cursor-pointer",children:e.jsxs("div",{className:"card-body relative overflow-hidden",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-r ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(i.div,{className:`p-3 rounded-lg bg-gradient-to-r ${t.gradient}`,whileHover:{rotate:360},transition:{duration:.5},children:e.jsx(t.icon,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"card-title text-xl font-bold text-gray-600 tracking-wider",children:t.title}),e.jsx("p",{className:"text-gray-500 mt-1 tracking-wider",children:t.description})]})]})]})}):e.jsx(f,{href:t.href,className:"card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden block",children:e.jsxs("div",{className:"card-body relative overflow-hidden",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-r ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(i.div,{className:`p-3 rounded-lg bg-gradient-to-r ${t.gradient}`,whileHover:{rotate:360},transition:{duration:.5},children:e.jsx(t.icon,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"card-title text-xl font-bold text-gray-600 tracking-wider",children:t.title}),e.jsx("p",{className:"text-gray-500 mt-1 tracking-wider",children:t.description})]})]})]})})},x))]}),e.jsx(F,{children:o&&e.jsx(i.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50",onClick:()=>a(!1),children:e.jsxs(i.div,{variants:h,initial:"hidden",animate:"visible",exit:"exit",className:"bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 relative border border-gray-700 shadow-2xl",onClick:t=>t.stopPropagation(),children:[e.jsx("button",{onClick:()=>a(!1),className:"absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200",children:e.jsx(k,{className:"w-6 h-6"})}),e.jsx("h2",{className:"text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono",children:"System Information"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200",children:[e.jsx("h3",{className:"text-lg font-semibold text-purple-300 font-mono mb-2",children:"App Name"}),e.jsx("p",{className:"text-gray-300 font-mono tracking-wide",children:r.app_name})]}),e.jsxs("div",{className:"p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200",children:[e.jsx("h3",{className:"text-lg font-semibold text-purple-300 font-mono mb-2",children:"Version"}),e.jsx("p",{className:"text-gray-300 font-mono tracking-wide",children:r.app_version})]}),e.jsxs("div",{className:"p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200",children:[e.jsx("h3",{className:"text-lg font-semibold text-purple-300 font-mono mb-2",children:"Site Url"}),e.jsx("p",{className:"text-gray-300 font-mono tracking-wide",children:r.site_url})]}),e.jsxs("div",{className:"p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200",children:[e.jsx("h3",{className:"text-lg font-semibold text-purple-300 font-mono mb-2",children:"Description"}),e.jsx("p",{className:"text-gray-300 font-mono tracking-wide",children:r.app_description})]})]})]})})})]})};export{O as default};