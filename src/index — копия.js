function eval() {
    // Do not use eval!!!
    return;
}


function precedence(op){ 
    if(op == '+'||op == '-') 
    return 1; 
    if(op == '*'||op == '/') 
    return 2; 
    return 0; 
} 
  
// Function to perform arithmetic operations. 
function applyOp( a,  b,  op){ 
    switch(op){ 
        case '+': return a + b; 
        case '-': return a - b; 
        case '*': return a * b; 
        case '/': return a / b; 
    } 
} 

function expressionCalculator(expr) {
    
    // write your solution here
    // expr = expr.replace(/\s/g, "");
    // if ( expr.replace(" ","").includes("/0") ) {
    //     throw new Error("TypeError: Division by zero.");
    // }

    // if ( expr.replace(" ","").replace(/[^(]/g, "").length != expr.replace(/[^)]/g, "").length ) {
    //     throw new Error("ExpressionError: Brackets must be paired");
    //   }
 
      
     // expr=expr.split("").filter(e => e != "").join(" ");
      console.log("Start "+expr);
         // stack to store integer values. 
         var values=[]; 
        
         // stack to store operators. 
         var ops=[]; 
        
      for(let i = 0; i < expr.length; i++){ 

     
          // Current token is a whitespace, 
          // skip it. 
          if(expr[i] == ' ') 
              continue; 
            
          // Current token is an opening  
          // brace, push it to 'ops' 
          else if(expr[i] == '('){ 
              ops.push(expr[i]); 
          } 
            
          // Current token is a number, push  
          // it to stack for numbers. 
          else if(Number.isInteger(parseInt(expr[i],10))){ 
              var val = 0; 
                
              // There may be more than one 
              // digits in number. 
              while(i < expr.length &&  
                          Number.isInteger(parseInt(expr[i],10))) 
              { 
                  val = (val*10) + (parseInt(expr[i],10)); 
                  i++; 
              } 
                
              values.push(val); 
              console.log("values "+values);
          } 
            
          // Closing brace encountered, solve  
          // entire brace. 
          else if(expr[i] == ')') 
          { 
              while(!(Array.isArray(ops) && ops.length) && ops.slice(-1)[0] != '(') 
              { 
                  var val2 = parseInt(values.slice(-1)[0],10); 
                  values.pop(); 
                    
                  var val1 = parseInt(values.slice(-1)[0],10); 
                  values.pop(); 
                    
                  var op = ops.slice(-1)[0]; 
                  ops.pop(); 
                    
                  values.push(applyOp(val1, val2, op)); 
                  

              } 
             
              // pop opening brace. 
            //  if(!(Array.isArray(ops) && ops.length)) {
                 ops.pop();// }
          } 
       
          // Current token is an operator. 
          else
          { 
              // While top of 'ops' has same or greater  
              // precedence to current token, which 
              // is an operator. Apply operator on top  
              // of 'ops' to top two elements in values stack.
              
              while((Array.isArray(ops) && ops.length )&& precedence(ops.slice(-1)[0]) 
                                  >= precedence(expr[i])){ 
                                    
                   val2 = parseInt(values.slice(-1)[0],10); 
                  values.pop(); 
                    
                   val1 = parseInt(values.slice(-1)[0],10); 
                  values.pop(); 
                    
                   op = ops.slice(-1)[0]; 
                  ops.pop(); 
                    
                  values.push(applyOp(val1, val2, op)); 
                  console.log("values apply "+values);
              } 
                
              // Push current token to 'ops'. 
              ops.push(expr[i]); 
          } 
      } 
      
      // Entire expression has been parsed at this 
      // point, apply remaining ops to remaining 
      // values. 
      while((Array.isArray(ops) && ops.length)){
        
          let val2 = parseInt(values.slice(-1)[0],100); 
          values.pop(); 
                    
          let val1 = parseInt(values.slice(-1)[0],100); 
          values.pop(); 
                    
          let op = ops.slice(-1)[0]; 
          ops.pop(); 
                    
          values.push(applyOp(val1, val2, op)); 
          console.log("fuck "+ops.length+" "+"values: "+values+" val1 "+val1+ " val2 "+val2+" op "+op);
      } 
        
      // Top of 'values' contains result, return it. 
      return values.slice(-1)[0]; 



}

module.exports = {
    expressionCalculator
}