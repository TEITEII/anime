import React, { useContext } from "react"
import AnimText from "@lincode/react-anim-text"
import {Model, World, Skybox, ThirdPersonCamera, useKeyboard, useLoop, Find, Reticle, useSpring, HTML, mouse} from "lingo3d-react"
import { useState, useEffect } from "react"
import { useRef } from "react"
import "./App.css"
import Loader from "./Loader" 
import { TransactionContext } from "./context/TransactionContext"
import { FileUpload } from "./FileUpload"

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder = {placeholder}
    type={type}
    step="0.001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="button"
  />
)

function App() {

  const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext)
  const { sendFileToIPFS, handleImageChange } = useContext(FileUpload)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData

    e.preventDefault()

    if( !addressTo || !amount || !keyword || !message ) return

    sendTransaction()
  }

  const key = useKeyboard()
  const characterRef = useRef()
  let movtion = "idle" 

  if (key === "w") {
    movtion = "walking"
  }

  if (key === "s") {
    movtion = "back"
  }

  if (key === "a") {
    movtion = "left"
  }

  if (key === "d") {
    movtion = "right"
  }

  useLoop(() => {
    characterRef.current.moveForward(-2.4)
  },key === "w")

  useLoop(() => {
    characterRef.current.moveForward(2.4)
  },key === "s")

  useLoop(() => {
    characterRef.current.moveRight(-2.4)
  },key === "d")

  useLoop(() => {
    characterRef.current.moveRight(2.4)
  },key === "a")

  const [mouseOver, setMouseOver] = useState(false)

  const camX = mouseOver ? 25 : 0
  const camY = mouseOver ? 50 : 50
  const camZ = mouseOver ? 50 : 200

  const xSpring = useSpring(camX)
  const ySpring = useSpring(camY)
  const zSpring = useSpring(camZ)

  return (
    <>
    {false ? (
      <Loader />
    ) : (  
    <World 
       defaultLight="env3.hdr"
       skybox="env3.hdr"
       defaultLightScale={1.1}
       ambientOcclusion
       bloom
       bloomStrength={0.2}
       bloomRadius={1}
       outlineColor="gold"
       outlineHiddenColor="white"
       outlinePulse={1000}    
       >
   
      <div className="page">
        <div className="header">
        { !currentAccount && (
          <button className="button" onClick={ connectWallet }> 
            Connect 
          </button>
        ) }
        </div>
        <div className="tran">
          <div>
            <div className="tran">
                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            </div>
            <div className="tran">
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            </div>
            <div className="tran">
                <Input placeholder="Keyword" name="keyword" type="text" handleChange={handleChange} />
            </div>
            <div className="tran">
                <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            </div>
            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
                  <button 
                    onClick={handleSubmit}
                    className="button2"
                    >
                    Send
                  </button>
            )}     
            </div>
          </div>
          <form className="form" onSubmit={sendFileToIPFS}>
            <label>ファイルを選択
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
              <p>&nbsp;選択されていません</p>   
              <div className="h-[1px] w-full bg-gray-400 my-2" /> 
            <label className="button4">🔼 Upload
                <button type="submit" />   
            </label>
          </form>               
            <div>
              <button className="button3">Mint NFT</button>   
            </div> 
      </div>

      <Model
       metalnessFactor={-1.1}
       roughnessFactor={1.5}
       src="gallery/scene.gltf" 
       scale={10} 
       physics="map">
   
        <Find 
         name="Object_1652" 
         outline={mouseOver} 
         onClick={() => setMouseOver(true)} 
         onMouseOut={() => setMouseOver(false)}  
         >
          {mouseOver && (
            <HTML>
            <iframe src="https://boredapeyachtclub.com/#/"></iframe>
            <div 
            style={{ color: "white"}}
            >
              <AnimText 
              style={{ fontWeight: "bold" }}
              >
                Artwork Title
              </AnimText> 
              <AnimText>
                Bored Ape Yacht Club
              </AnimText>
            </div>
            </HTML>
          )}
        </Find>

        <Find 
         name="Object_1670" 
         outline={mouseOver} 
         onClick={() => setMouseOver(true)} 
         onMouseOut={() => setMouseOver(false)}
         >
          {mouseOver && (
            <HTML>
            <iframe src="https://www.neotokyopunks.com/"></iframe>
            <div 
            style={{ color: "white"}}
            >
              <AnimText 
              style={{ fontWeight: "bold" }}
              >
                Artwork Title
              </AnimText> 
              <AnimText>
                NEO TOKYO PUNKS
              </AnimText>
            </div>
            </HTML>
          )}
        </Find>

        <Find 
         name="Object_1672" 
         outline={mouseOver} 
         onClick={() => setMouseOver(true)} 
         onMouseOut={() => setMouseOver(false)}
         >
          {mouseOver && (
            <HTML>
            <iframe src="https://www.neotokyopunks.com/"></iframe>
            <div 
            style={{ color: "white"}}
            >
              <AnimText 
              style={{ fontWeight: "bold" }}
              >
                Artwork Title
              </AnimText> 
              <AnimText>
                NEO TOKYO PUNKS
              </AnimText>
            </div>
            </HTML>
          )}
        </Find>

        <Find 
         name="Object_1698" 
         outline={mouseOver} 
         onClick={() => setMouseOver(true)} 
         onMouseOut={() => setMouseOver(false)}
         >
          {mouseOver && (
            <HTML>
            <iframe src="https://www.neotokyopunks.com/"></iframe>
            <div 
            style={{ color: "white"}}
            >
              <AnimText 
              style={{ fontWeight: "bold" }}
              >
                Artwork Title
              </AnimText> 
              <AnimText>
                NEO TOKYO PUNKS
              </AnimText>
            </div>
            </HTML>
          )}
        </Find>

        <Find 
         name="Object_1678" 
         outline={mouseOver} 
         onClick={() => setMouseOver(true)} 
         onMouseOut={() => setMouseOver(false)}
         >
          {mouseOver && (
            <HTML>
            <iframe src="https://www.neotokyopunks.com/"></iframe>
            <div 
            style={{ color: "white"}}
            >
              <AnimText 
              style={{ fontWeight: "bold" }}
              >
                Artwork Title
              </AnimText> 
              <AnimText>
                NEO TOKYO PUNKS
              </AnimText>
            </div>
            </HTML>
          )}
        </Find>       
      </Model> 

      <ThirdPersonCamera 
       active 
       mouseControl 
       innerY={ySpring}
       innerZ={zSpring}
       innerX={xSpring}
      >

      <Model 
        ref={characterRef}
        src="kazama.fbx"
        width={15}
        height={65}
        scale={2}
        physics="character"
        animations={{
          idle: "Idle.fbx",
          walking: "Walking.fbx",
          right: "RightTurn.fbx",
          left: "LeftTurn.fbx",
          back: "Walking.fbx"
         }}
        animation = {movtion}
        pbr
      />  

      </ThirdPersonCamera> 

    </World>
    )} 
    <Reticle color="white" variant={7} />
    </>
  )
}

export default App
