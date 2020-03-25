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
    if ( /\/[ ]0/.test(expr) ) {
        throw new Error("TypeError: Division by zero.");
       
    }

    if ( expr.replace(" ","").replace(/[^(]/g, "").length != expr.replace(" ","").replace(/[^)]/g, "").length ) {
        throw new Error("ExpressionError: Brackets must be paired");
        
      }
    expr=expr.replace(/ /g,"").replace(/\+/g,' + ').replace(/\-/g,' - ').replace(/\*/g,' * ').replace(/\//g,' / ');
  
   // expr=expr.replace(/ /g,"");
 
      
     // expr=expr.split("").filter(e => e != "").join(" ");
      console.log("Start "+expr);
         // stack to store integer values. 
         var values=[]; 
        
         // stack to store operators. 
         var ops=[]; 
        
      for(let i = 0; i < expr.length; i++){ 
        console.log("CURRENT "+expr[i]);
     
          // Current token is a whitespace, 
          // skip it. 
          if(expr[i] == " ") 
              continue; 
            
          // Current token is an opening  
          // brace, push it to 'ops' 
          else if(expr[i] == '('){ 
              ops.push(expr[i]); 
              
          } 
            
          // Current token is a number, push  
          // it to stack for numbers. 
          else if(Number.isInteger(parseFloat(expr[i],10))){ 
              var val = 0; 
                
              // There may be more than one 
              // digits in number. 
              while(i < expr.length && Number.isInteger(parseFloat(expr[i],10))) 
              { 
                  val = (val*10) + (parseFloat(expr[i],10)); 
                  i++; 
              } 
                
              values.push(val); 
              console.log("values "+values);
          } 
            
          // Closing brace encountered, solve  
          // entire brace. 
         
          else if(expr[i] == ')') 
          {   console.log("values in brackets "+values);
              while(!(Array.isArray(ops) && ops.length) && ops.slice(-1)[0] != '(') 
              { 
                   val2 = parseFloat(values.slice(-1)[0]); 
                  values.pop(); 
                    
                   val1 = parseFloat(values.slice(-1)[0]); 
                  values.pop(); 
                    
                   op = ops.slice(-1)[0]; 
                  ops.pop(); 
                    
                  values.push(applyOp(val1, val2, op)); 
                  console.log("values in brackets "+values);

              } 
             
              // pop opening brace. 
              if(!(Array.isArray(ops) && ops.length!=0)) {
                 ops.pop(); }
                 
          } 
       
          // Current token is an operator. 
          else
          { 
              // While top of 'ops' has same or greater  
              // precedence to current token, which 
              // is an operator. Apply operator on top  
              // of 'ops' to top two elements in values stack.
              console.log("ops 1111 "+ops);
              while((Array.isArray(ops) && ops.length )&& precedence(ops.slice(-1)[0]) >= precedence(expr[i]))
              { 
                                    
                   val2 = parseFloat(values.slice(-1)[0]); 
                  values.pop(); 
                    
                   val1 = parseFloat(values.slice(-1)[0]); 
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
      console.log("values apply "+values+" ops "+ops);
      // Entire expression has been parsed at this 
      // point, apply remaining ops to remaining 
      // values. 
      while(ops.length>0){
        
          val2 = parseFloat(values.slice(-1)[0]); 
          values.pop(); 
                    
          val1 = parseFloat(values.slice(-1)[0]); 
          values.pop(); 
                    
         op = ops.slice(-1)[0]; 
         console.log("fuck "+ops.length+" "+"values: "+values+" val1 "+val1+ " val2 "+val2+" op "+op); 
          ops.pop(); 
               
          values.push(applyOp(val1, val2, op)); 
          
      } 
        
      // Top of 'values' contains result, return it. 
      return values.slice(-1)[0]; 



}

module.exports = {
    expressionCalculator
}