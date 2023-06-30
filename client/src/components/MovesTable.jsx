
import { useEffect, useState } from 'react'
import './movesTable.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




export const MovesTable = () => {
    

    const [moves, setMoves] = useState([])
    const [loading, setLoading] = useState(true)

    

    const loadMoves = () => {
        fetch(`https://cuentas-s0yy.onrender.com/api/moves`)
        .then(res => res.json())
        .then(moves => {
          setMoves(moves)
          setLoading(false)
        },[loading])
    }

    useEffect(() => {
        loadMoves()
    },[loading])
    

    const handleClick = (e) => {
      e.preventDefault()
      
      const id =  e.target.id
      console.log(id,"ESTE ID")
      fetch(`https://cuentas-s0yy.onrender.com/api/moves/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        loadMoves()
      })
    }
    
    return (
        <div className="app-container">
          <Link className="link"to="/cuentas" >Ver cuentas</Link>
        {
          loading ?
          <h3>Cargando movimientos...</h3>
          :
          <ul>
            {moves.map((move,id)=> {
              return (
                <li className="list-move" key={id} id={move._id}>
                  <p>{`${move.date.slice(0,10)} : `}
                  <strong>{move.name}</strong> 
                  { (move.spent !== 0) ? ` gastó ${move.spent} ` : ""}
                  { (move.owe !== 0) ? ` debe ${move.owe} ` : ""}
                  { (move.motive != 0 ) ? ` en ${move.motive}` : ""}
                  <button onClick={handleClick} className="button-delete" id={move._id}>❌</button>
                  </p>
                </li>
              )
            })}
            </ul>
        }
              
            
              
        
      </div>
    )

}