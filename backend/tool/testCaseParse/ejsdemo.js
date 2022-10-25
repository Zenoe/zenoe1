
function test(){
  // let tpl = `<%<%-    [Teardown]    Run Keywords %> for (let i=0; i<tail.length; i++){    tail[i]}} %>`
  let tpl = `    [Teardown]    Run Keywords    <%for (let i=0; i<tail.length; i++){%><%=tail[i]%>    <%}%>`

  let ejs = require('ejs');
  let html = ejs.render(tpl, {tail:['a','b']});
  console.log(html);
}

test()
