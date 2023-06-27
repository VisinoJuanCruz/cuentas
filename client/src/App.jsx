import { useState , useEffect} from 'react'
import './App.css'
import axios from 'axios'



function App() {

  const [personas, setPersonas] = useState([])
  const [loading,setLoading] = useState(true)
  
  const loadPersonas = () => {
    fetch(`https://cuentas-s0yy.onrender.com/api/personas`)
    .then(res => res.json())
    .then(personas => {
      setPersonas(personas)
      setLoading(false)
    },[loading])
}

useEffect(() => {
  loadPersonas()
},[loading])

const submitHandler = (e) => {
  e.preventDefault()

  const id = e.target.querySelector('p[id]').getAttribute('id');
  const spent = e.currentTarget.spent.value 
  const owe = e.currentTarget.owe.value

  const newPerson= {
      "id": id,
      "spent":spent,
      "owe":owe
    }
    
      fetch(`https://cuentas-s0yy.onrender.com/api/personas`,{
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          mode:'cors',
          body: JSON.stringify(newPerson)
      })
    setLoading(true)
    e.currentTarget.spent.value = 0;
    e.currentTarget.owe.value = 0;

}

if(loading){
  return <h1>Cargando...</h1>

}
  

return (
    <div className="app-container">
      
    <div className="form-container">
      <div className="persons-container">
      <h1>Cuentas</h1>
        
        {personas.map((persona,id)=> {
          return(<div className="person-container" key={id}>
              
              <form onSubmit={submitHandler}>
                <h2><p  id={persona._id}>{persona.name}</p></h2>
                <p><strong>Gastó: $</strong>{persona.spent}</p>
                <p><strong>Debe : $</strong>{persona.owe}</p>
                Gastó: <input defaultValue="0" name="spent" type="number" placeholder="Gastó" />
                <br/>
                Debe : <input defaultValue="0" name="owe" type="number" placeholder="Debe" />
                <br/>
                <button className="btn btn-dark mx-2" type="submit">Actualizar</button>
              </form>

          
              
            </div>
          )
        })}
        
      </div>
      <div>
        </div>
          {
             ((personas[0].spent / 2 + personas[1].owe) == (personas[1].spent / 2 + personas[0].owe))
             ?<h1 className="cuentas-saldadas">CUENTAS SALDADAS</h1>
             :
           ((personas[0].spent / 2 + personas[1].owe) > (personas[1].spent / 2 + personas[0].owe))
         ? <h1 className="deuda">{personas[1].name} debe ${((personas[0].spent / 2 + personas[1].owe) - (personas[1].spent / 2 + personas[0].owe))}</h1>
         : <h1 className="deuda">{personas[0].name} debe ${((personas[1].spent / 2 + personas[0].owe) - (personas[0].spent / 2 + personas[1].owe))}</h1>
                 
      
                 
      } 
        

        </div>
      
    </div>
  )
}

export default App
