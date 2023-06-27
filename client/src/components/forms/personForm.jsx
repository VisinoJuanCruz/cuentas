export const personForm = () => {

    const submitHandler = e => {
        e.preventDefault();
        const name = e.currentTarget.name.value
       
    
        const newPerson= {
          "name": name,
          }
    
      fetch(`http://localhost:${process.env.PORT}/api/personas`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode:'cors',
          body: JSON.stringify(newPerson)
      })
    }

    return (
        <>
          <form onSubmit={submitHandler}>
                    <p className="mt-5 color-dark">Nombre:<input name="name" /></p>
                    <button className="btn btn-dark mx-2" type="submit">Agregar</button>
                </form>
        </>
      )
}