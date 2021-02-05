(this["webpackJsonpjoi-validation-poc"]=this["webpackJsonpjoi-validation-poc"]||[]).push([[0],{19:function(a,e,s){},41:function(a,e,s){},43:function(a,e,s){"use strict";s.r(e);var t=s(2),r=s.n(t),n=s(14),i=s.n(n),l=(s(19),s(4)),o=s(3),c=s(8),d=s(1),m=s.n(d),b=(s(41),s(0)),u=m.a.string().required().min(5).label("First Name").messages({"string.empty":"Your {#label} can not be empty","string.min":"Your {#label} has to be at least {#limit} chars"}),p=m.a.string().required().min(5).label("Last Name").messages({"string.empty":"Your {#label} can not be empty","string.min":"Your {#label} has to be at least {#limit} chars"}),j=m.a.string().required().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).label("Email").messages({"string.empty":"Your {#label} can not be empty"}),f=m.a.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/).label("Password").messages({"string.empty":"Your {#label} can not be empty","string.pattern.base":"Your {#label} should be alphanumeric and within 3 to 30 characters"}),h=m.a.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/).label("Confirm Password").messages({"string.empty":"Your {#label} can not be empty","string.pattern.base":"Your {#label} should be alphanumeric and within 3 to 30 characters"}),g=m.a.object({username:m.a.string().alphanum().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8).max(30).required().label("Username").messages({"string.pattern.base":"Your {#label} does not matche the suggested pattern","string.base":"Your {#label} should match the suggested pattern","string.alphanum":"Your {#label} must only contain alpha-numeric characters","string.empty":"Your {#label} can not be empty","string.min":"Your {#label} has to be at least {#limit} chars","string.max":"Your {#label} can not be more then {#limit} chars","any.required":"Your {#label} is required"}),password:m.a.string().pattern(/^[a-zA-Z0-9]{3,30}$/),repeat_password:m.a.ref("password"),access_token:[m.a.string(),m.a.number()],birth_year:m.a.number().integer().min(1900).max(2013),email:m.a.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}})}).options({abortEarly:!1}).with("username","birth_year").xor("password","access_token").with("password","repeat_password"),w={firstName:"",lastName:"",email:"",password:"",confirmPassword:""};var O=function(){var a=Object(t.useState)(w),e=Object(c.a)(a,2),s=e[0],r=e[1],n=Object(t.useState)(w),i=Object(c.a)(n,2),d=i[0],O=i[1];Object(t.useEffect)((function(){var a=g.validate({username:"123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf",password:"",repeat_password:"password",birth_year:0});console.log({validate:a.error})}));var x=function(a){r((function(e){return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},a.target.name,a.target.value))}))},v=function(a,e,s){try{return m.a.attempt(e,s),!0}catch(t){return O(Object(o.a)(Object(o.a)({},w),{},Object(l.a)({},a,t.message))),!1}},y=function(a){var e=a.target.name,t=a.target.value;switch(e){case"firstName":v(e,t,u);break;case"lastName":v(e,t,p);break;case"email":v(e,t,j);break;case"password":v(e,t,f);break;case"confirmPassword":var r=v(e,t,h);r&&s.password!==s.confirmPassword?O(Object(o.a)(Object(o.a)({},w),{},Object(l.a)({},e,"Confirm Password should match password."))):r&&O(w);break;default:O(w)}};return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"First Name: "}),Object(b.jsx)("input",{type:"text",value:s.firstName,name:"firstName",onChange:x,onBlur:y}),d.firstName&&Object(b.jsx)("p",{children:d.firstName})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Last Name: "}),Object(b.jsx)("input",{type:"text",value:s.lastName,name:"lastName",onChange:x,onBlur:y}),d.lastName&&Object(b.jsx)("p",{children:d.lastName})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Email: "}),Object(b.jsx)("input",{type:"email",value:s.email,name:"email",onChange:x,onBlur:y}),d.email&&Object(b.jsx)("p",{children:d.email})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Password: "}),Object(b.jsx)("input",{type:"password",value:s.password,name:"password",onChange:x,onBlur:y}),d.password&&Object(b.jsx)("p",{children:d.password})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Confirm Password: "}),Object(b.jsx)("input",{type:"password",value:s.confirmPassword,name:"confirmPassword",onChange:x,onBlur:y}),d.confirmPassword&&Object(b.jsx)("p",{children:d.confirmPassword})]})]})},x=function(a){a&&a instanceof Function&&s.e(3).then(s.bind(null,44)).then((function(e){var s=e.getCLS,t=e.getFID,r=e.getFCP,n=e.getLCP,i=e.getTTFB;s(a),t(a),r(a),n(a),i(a)}))};i.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(O,{})}),document.getElementById("root")),x()}},[[43,1,2]]]);
//# sourceMappingURL=main.f5af4d10.chunk.js.map