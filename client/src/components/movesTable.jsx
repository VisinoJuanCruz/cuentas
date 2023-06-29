
import { useEffect, useState } from 'react'
export const MovesTable = () => {
    

    const [moves, setMoves] = useState([])
    const [loading, setLoading] = useState(true)

    

    const loadMoves = () => {
        fetch(`https://cuentas-s0yy.onrender.com/api/moves`)
        .then(res => res.json())
        .then(moves => {
            console.log(moves)
          setMoves(moves)
          setLoading(false)
        },[loading])
    }

    useEffect(() => {
        loadMoves()
    },[])
    

    
    
    return (
        <div className="moves-container">
        {
          loading ?
          <h3>Cargando movimientos...</h3>
          :
          <ul>
            {moves.map((move,id)=> {
              return (
                <li key={id}> <p>{`${move.name} gastó ${move.spent} y debe ${move.owe}`}</p></li>
              )
            })}
            </ul>
        }
              
            
              
        
      </div>
    )

}