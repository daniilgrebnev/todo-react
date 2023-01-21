// noinspection BadExpressionStatementJS

import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid'
import {randomColor} from 'randomcolor'
import Draggable from "react-draggable";

function App() {
    let [item, setItem] = useState('')
    let [items, setItems] = useState(
        JSON.parse(localStorage.getItem('items'))
        ||
        []
    )
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])


    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id))
    }
    const newItem = () => {
        if (item.trim !== ''){
            const newItem = {
                id: uuidv4(),
                item,
                color: randomColor({
                    luminosity: 'light'
                }),
                defaultPos: {
                    x: 650,
                    y: -700
                }
            }
            setItems(items => [...items, newItem])
            setItem( '')
        }else {
            alert('Enter something...')
            setItem( '')
        }
    }
    const updatePosition = (data, index) => {
        let newArr = [...items]
        newArr[index].defaultPos = {
            x: data.x,
            y: data.y
        }
        setItems(newArr)
    }
    const keyPress = (e) => {
        const code = e.keyCode || e.which
        if (code === 13) {
            newItem()
        }
    }
  return (
      <div className='App'>
          <div className="wrapper">
              <input
                  value={item}
                  type="text"
                  placeholder='Enter something...'
                  onChange={(e) => setItem(e.target.value)}
                  onKeyPress={(e) => keyPress(e)}
              />
              <button
                  className="enter"
                  onClick={() => newItem()}
              >
                  ENTER
              </button>
          </div>
          {
            items.map((item, index) => {
                return(
                    <Draggable
                        key={index}
                        defaultPosition={item.defaultPos}
                        onStop={(e, data) => {
                            updatePosition(data, index)
                        }}
                    >
                        <div className="todo-item" style={{backgroundColor: item.color}}>
                            <p>{item.item}</p>
                            <button onClick={() => deleteItem(item.id)}>
                                X
                            </button>
                        </div>
                    </Draggable>
                )
            })
          }
      </div>
  )
}

export default App
