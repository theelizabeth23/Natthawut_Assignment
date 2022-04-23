import React, { useState, useEffect } from 'react'
import axios from 'axios'



const URL = `http://localhost/api/bears`

export default () => {
    const [bears, setBears] = useState({})
    const [bear, setBear] = useState('')
    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0)
    const getBears = async () => {
        const result = await axios.get(URL)
        setBears(result.data.list)
    }
    const getBear = async (id) => {
        const result = await axios.get(`${URL}/${id}`)
        console.log('bear id: ', result.data)
        setBear(result.data)
    }
    const addBear = async (name, weight) => {
        const result = await axios.post(URL, {
            name,
            weight
        })
        console.log(result.data)
        getBears()
    }
    const deleteBear = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getBears()
    }
    const updateBear = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            name,
            weight
        })
        console.log('bear id update: ', result.data)
        getBears()
    }
    const printBears = () => {
        console.log('Bears:', bears)
        if (bears && bears.length)
            return (bears.map((bear, index) =>
            (<li className='flex flex-col p-2' key={index}  >
                {(bear) ? bear.name : '-'} : {(bear) ? bear.weight : 0}
                <div className='flex flex-row '  >
                    <button className="mr-4 bg-blue-500 rounded-lg p-1 border-double border-2 border-black text-xs text-white"
                        type="text" name="task" onClick={() => deleteBear(bear.id)}> Delete
                    </button>
                    <button className="mr-4 bg-blue-500 rounded-lg p-1 border-double border-2 border-black text-xs text-white"
                        type="text" name="task" onClick={() => getBear(bear.id)}>Read
                    </button>
                    <button className="mr-4 bg-blue-500 rounded-lg p-1 border-double border-2 border-black text-xs text-white"
                        type="text" name="task" onClick={() => updateBear(bear.id)}>Update
                    </button>
                </div>
            </li>)
            ))
        else {
            return <h3 className="m-2 text-xl text-red-500 font-bold font-display p-1">No Data Cat</h3>
        }
    }
    useEffect(() => {
        getBears()
    }, [])
    return (
        <div className="bg-blue-300 flex flex-col items-center h-screen">
            <h2 className="m-2 text-[#17202A] text-5xl font-bold font-display p-2">Cat Shop</h2>
            <img class="w-1/1 sm:h-1/4 rounded-full border-solid border-4 border-black"
                src="https://i.pinimg.com/564x/c8/02/e3/c802e335b4ddc5a1bee32d14082e0028.jpg"
                alt="" width="250" height="900">
            </img>
            <ul className="flex flex-col flex justify-center text-xl text-[#FF#000000] font-mono">{printBears()}</ul>
            <div
                class="flex flex-col flex justify-center text-xl text-[#FF#000000] font-mono p-2">Cat Name : {bear.name} {bear.weight}
            </div>
            <div className="flex flex-col  text-[#FF#17202A] font-mono">
                Name<input type="text" onChange={(e) => setName(e.target.value)} /><br />
                Weight<input type="number" onChange={(e) => setWeight(e.target.value)} /><br />
            </div>
            <button className="mr-4 bg-blue-500 rounded-lg p-1 border-double border-2 border-black text-10x text-white"
                type="text" name="task"
                onClick={() => addBear(name, weight)}>Select
            </button>
        </div>
    )
}
