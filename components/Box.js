import {useEffect, useState} from 'react'
import "./Box.css"
const Box = () => {
  const [data,setData] = useState([])
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=6").then(x =>{
        x.json().then(i => {
            i.results.forEach(j => {
                fetch(j.url).then(k => {
                    k.json().then(l => {
                        setData(cur => [...cur,{
                            name:j.name,
                            nxt:i.next,
                            prev:i.previous,
                            moves:[l.moves[0].move.name,l.moves[1].move.name,l.moves[2].move.name],
                            img:l.sprites.front_default
                        }])
                    })
                })
            })
        })
    })
  },[])
  var prev = (e) => {
    if(data[0].prev !=null){
        fetch(data[0].prev).then(x =>{
        setData([])
        x.json().then(i => {
            i.results.forEach(j => {
                fetch(j.url).then(k => {
                    k.json().then(l => {
                        setData(cur => [...cur,{
                            name:j.name,
                            nxt:i.next,
                            prev:i.previous,
                            moves:[l.moves[0].move.name,l.moves[1].move.name,l.moves[2].move.name],
                            img:l.sprites.front_default
                        }])
                    })
                })
            })
        })
    })}
  }
  var next = (e) => {
    fetch(data[0].nxt).then(x =>{
        setData([])
        x.json().then(i => {
            i.results.forEach(j => {
                fetch(j.url).then(k => {
                    k.json().then(l => {
                        setData(cur => [...cur,{
                            name:j.name,
                            nxt:i.next,
                            prev:i.previous,
                            moves:[l.moves[0].move.name,l.moves[1].move.name,l.moves[2].move.name],
                            img:l.sprites.front_default
                        }])
                    })
                })
            })
        })
    })
  }
  return (
    <div className='box'>
        <>
        <h1>React pokedex</h1>
            {data.slice(0,6).sort((i,j) => i.name < j.name).filter((i,j) => data.slice(0,6).sort((i,j) => i.name < j.name).indexOf(i)===j).map((poke,i) => (
                <div className='pokemon' key={i}>
                    <img  src={poke.img} alt="" />
                    <h2>{poke.name}</h2>
                    <h2>{poke.moves[0]}</h2>
                    <h2>{poke.moves[1]}</h2>
                    <h2>{poke.moves[2]}</h2></div>
            ))}
        </>
        <button className='button' onClick={prev}>Prev</button>
        <button className='button' onClick={next}>Next</button>
    </div>
  )
}

export default Box
