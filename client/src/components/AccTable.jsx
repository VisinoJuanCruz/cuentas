
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

export const AccTable = () => {

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
  const motive = e.currentTarget.motive.value
  const name = e.target.querySelector('p[name]').getAttribute('name');

  const newPerson= {
      "name":name,
      "id": id,
      "spent":spent,
      "owe":owe,
      "motive":motive
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

  const handlerClick = (e) => {
    e.preventDefault()
    
    setLoading(true)
    const name = e.target.parentNode.querySelector('span[name="name"]').textContent;
    const spent = e.target.parentNode.querySelector('span[name="spent"]').textContent;
    const id = e.target.parentNode.querySelector('h1[id]').getAttribute('id');
    
    const updatedPerson = {
      id : id,
      name: name,
      spent: parseInt(spent),
      owe: 0,
      motive: "SALDAR CUENTAS",
    }
    fetch(`https://cuentas-s0yy.onrender.com/api/personas/today`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode:'cors',
          body: JSON.stringify(updatedPerson)
      })

      fetch(`https://cuentas-s0yy.onrender.com/api/personas`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        mode:'cors',
        body: JSON.stringify(updatedPerson)
    })

    setLoading(false)
   

    }

  return (
   
    <div className="app-container">
      <Link className="link" to="/moves" >Ver Movimientos</Link>
    <div className="form-container">
      

        {loading ?
        <div className="persons-container">
          <h1>Cuentas</h1>
          <div className="person-container">
            <form onSubmit={submitHandler}>
              <h2><p>Name</p> </h2>
              <p><strong>Gastó: $</strong>0</p>
              <p><strong>Debe : $</strong>0</p>
              Gastó: <input defaultValue="0" name="spent" type="number" placeholder="Gastó" />
              <br/>
              Debe : <input defaultValue="0" name="owe" type="number" placeholder="Debe" />
              <br/>
              <button className="btn btn-dark mx-2" type="submit">Actualizar</button>
            </form>
          </div>
          
          <div className="person-container">
          <form onSubmit={submitHandler}>
          <h2><p>Name</p> </h2>
          <p><strong>Gastó: $</strong>0</p>
          <p><strong>Debe : $</strong>0</p>
          Gastó: <input defaultValue="0" name="spent" type="number" placeholder="Gastó" />
          <br/>
          Debe : <input defaultValue="0" name="owe" type="number" placeholder="Debe" />
          <br/>
          <button className="btn btn-dark mx-2" type="submit">Actualizar</button>
        </form>
        </div>
        </div>
       
        :
        <div className="persons-container">
          <h1>Cuentas</h1>
          {personas.map((persona,id)=> {
          return(<div className="person-container" key={id}>
              
              <form onSubmit={submitHandler}>
                <h2><p  name={persona.name} id={persona._id}>{persona.name}</p></h2>
                <p><strong>Gastó: ${persona.spent}</strong></p>
                <p><strong>Debe : ${persona.owe}</strong></p>
                Gastó: <input defaultValue="0" name="spent" type="number" placeholder="Gastó" />
                <br/>
                Debe : <input defaultValue="0" name="owe" type="number" placeholder="Debe" />
                <br/>
                Motivo : <input name="motive" defaultValue="0" type="text" placeholder="Motivo" />
                <br/>
                <button className="btn btn-dark mx-2" type="submit">Actualizar</button>
              </form>

          
              
            </div>
          )})}
          </div>
        }
        
      </div>
      <div>
          {!loading ?
             ((personas[0].spent / 2 + personas[1].owe) == (personas[1].spent / 2 + personas[0].owe))
             ?<h1 className="cuentas-saldadas">CUENTAS SALDADAS</h1>
             :
           ((personas[0].spent / 2 + personas[1].owe) > (personas[1].spent / 2 + personas[0].owe))
        ?<div> 
          <h1 id={personas[0]._id} className="deuda"><span name="name">{personas[1].name}</span> debe $<span name="spent">{((personas[0].spent / 2 + personas[1].owe) - (personas[1].spent / 2 + personas[0].owe))}</span></h1>
         <button onClick={handlerClick}>Poner al día</button>
         </div>
         : 
         <div>
          <h1 id={personas[1]._id} className="deuda"><span name="name">{personas[0].name} </span>debe $<span name="spent">{((personas[1].spent / 2 + personas[0].owe) - (personas[0].spent / 2 + personas[1].owe))}</span></h1>
            <button onClick={handlerClick}>Poner al día</button>
            </div>
      :
      <h1>Cargando...</h1>
                 
      }
      </div>
</div>)
      }