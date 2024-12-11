import{u as f,j as e,L as l}from"./app-9776f975.js";import{L as g}from"./Layout-a722a78a.js";import{H as v}from"./Helmet-009dc957.js";import{n as y,o as w,p as _}from"./index-149b70ee.js";import{m as d}from"./index-e82f3d28.js";/* empty css            */import"./iconBase-549d7331.js";import"./ReactToastify-ccecd9fe.js";function $({logs:s,title:h,miner:a}){var c;f();const p=()=>{var o,m;const n=((o=s.links)==null?void 0:o.length)-2,t=[];return t.push(e.jsxs(l,{href:s.prev_page_url||"",className:`btn btn-sm ${s.prev_page_url?"bg-base-300 hover:bg-base-200":"btn-disabled"} text-base-content gap-1`,preserveState:!0,children:[e.jsx(w,{className:"w-3 h-3 md:hidden"}),e.jsx("span",{className:"hidden md:inline",children:"Prev"})]},"prev")),(m=s.links)==null||m.slice(1,-1).forEach((r,i)=>{const x=r.active,b=i===s.current_page-2||i===s.current_page,j=x||b,u=i<3,N=i>=n-3;u||N||x?t.push(e.jsx(l,{href:r.url||"",className:`btn btn-sm ${r.active?"bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90":"bg-base-300 hover:bg-base-200 text-base-content"} ${j?"":"hidden md:inline-flex"}`,preserveState:!0,children:r.label.replace("...","")},i)):i===3&&n>6&&t.push(e.jsx("span",{className:"px-2 text-base-content hidden md:inline",children:"..."},"ellipsis"))}),t.push(e.jsxs(l,{href:s.next_page_url||"",className:`btn btn-sm ${s.next_page_url?"bg-base-300 hover:bg-base-200":"btn-disabled"} text-base-content gap-1`,preserveState:!0,children:[e.jsx("span",{className:"hidden md:inline",children:"Next"}),e.jsx(_,{className:"w-3 h-3 md:hidden"})]},"next")),t};return e.jsxs(g,{title:"Earnings Logs",description:"View How much you have earned from your mining rigs",children:[e.jsx(v,{children:e.jsx("title",{children:h})}),e.jsx("div",{className:"container mx-auto px-4 py-8",children:e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24 md:mb-40",children:[e.jsxs("div",{className:"lg:col-span-1 bg-base-200 rounded-xl p-6 shadow-xl",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsx("div",{className:"p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl",children:e.jsx(y,{className:"w-8 h-8 text-primary"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-base-content font-mono",children:a.miner_name}),e.jsxs("p",{className:"text-base-content/70 text-sm font-mono",children:["ID: ",a.identifier]})]})]}),e.jsxs("div",{className:"space-y-4 font-mono",children:[e.jsx("div",{className:"p-4 bg-base-300 rounded-lg",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-base-content/70",children:"Total Earned"}),e.jsxs("span",{className:"text-md font-bold text-primary",children:[a.total_earned," USDT"]})]})}),e.jsx("div",{className:"p-4 bg-base-300 rounded-lg",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-base-content/70",children:"Hash Power"}),e.jsxs("span",{className:"text-md font-bold text-primary",children:[Number(a.hash_power).toFixed(2)," TH/s"]})]})}),e.jsx("div",{className:"p-4 bg-base-300 rounded-lg",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-base-content/70",children:"Investment"}),e.jsxs("span",{className:"text-md font-bold text-primary",children:[Number(a.investment_amount).toFixed(2)," USDT"]})]})}),e.jsx("div",{className:"p-4 bg-base-300 rounded-lg",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-base-content/70",children:"Expires At"}),e.jsx("span",{className:"text-md font-bold text-primary",children:a.expires_at})]})})]})]}),e.jsx("div",{className:"lg:col-span-2",children:e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},className:"bg-white-200 rounded-xl shadow-xl p-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-6 flex items-center gap-2 text-primary font-mono",children:"Earning History"}),e.jsx("div",{className:"overflow-x-auto font-mono",children:e.jsxs("table",{className:"table w-full",children:[e.jsx("thead",{className:"bg-base-300",children:e.jsxs("tr",{children:[e.jsx("th",{className:"rounded-l-lg",children:"Date & Time"}),e.jsx("th",{children:"Amount (USDT)"}),e.jsx("th",{className:"rounded-r-lg",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-base-300",children:(c=s.data)==null?void 0:c.map((n,t)=>e.jsxs(d.tr,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5+t*.05},className:"hover:bg-base-300/50 transition-colors",children:[e.jsx("td",{className:"py-4 text-gray-800",children:n.earned_at}),e.jsx("td",{className:"font-semibold text-primary",children:Number(n.amount).toFixed(4)}),e.jsx("td",{children:e.jsxs("span",{className:"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/20 text-success",children:[e.jsx("span",{className:"w-2 h-2 bg-success rounded-full animate-pulse mr-2"}),"Success"]})})]},n.id))})]})}),e.jsx("div",{className:"flex flex-wrap justify-center mt-6 gap-2",children:p()})]})})]})})]})}export{$ as default};