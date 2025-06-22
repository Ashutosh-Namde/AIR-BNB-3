// import { useDispatch, useSelector } from "react-redux"
// import { decrement, increment , incrementByAmount, reset} from "./feature/counter/CounterSlice";
// import { useState } from "react";

const App = () => {

//   const [amount, setamount] = useState("")

//   const count = useSelector((state)=>state.counter.value)
//   const dispatch = useDispatch();

//   const handleIncrementClick = ()=>{
//       dispatch(increment())
//   }

//   const handleDecrementClick = ()=>{

// dispatch(decrement())
//   }
//   const handleResetClick = ()=>{
//     dispatch(reset())
//   }
//   const handleNumberClick = ()=>{
//     dispatch(incrementByAmount(amount))
//   }

 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  return (
    <div>
      {/* <button onClick={handleIncrementClick} className="border p-5">+</button> */}
      {/* <p>count:{count}</p> */}
      {/* <button onClick={handleDecrementClick} className="border p-5">-</button> */}
      {/* <button onClick={handleResetClick} className="border p-5">Reset</button> */}
      {/* <input type="number" placeholder="enter number " value={amount}  onChange={(e)=>{setamount(e.target.value)}} /> */}
      {/* <button onClick={handleNumberClick} className="border p-5">inc by num</button> */}
      <div>
             <form >
                <input type="text" placeholder="enter your name" {...register("userName") ,{required:true}}/>
                <input type="text" placeholder="enter your name" {...register("email"), {required:true}}/>
                <button onClick={""}>submit</button>
             </form>
      </div>
    </div>

    
  
  
  )
}

export default App