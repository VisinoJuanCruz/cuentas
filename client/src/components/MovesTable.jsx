
import { useEffect, useState } from 'react'
import './movesTable.css'
import { Link } from 'react-router-dom'


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
    },[])
    

    
    
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
                <li className="list-move" key={id}> <p><strong>{move.name}</strong> {`gastó ${move.spent} y debe ${move.owe}`}</p></li>
              )
            })}
            </ul>
        }
              
            
              
        
      </div>
    )

}