

const Button =  ({type})=>{
  let classN = ''
  
switch (type) {
  case "succes":
    classN = "succes";
    break;
  case "danger":
    classN = "danger";
    break;
  case "not-work":
    classN = "not-work";
    break;
  default:
    break;
}

  return(
    <button  className={classN}>

    </button>
  )
}