import React from "react"
import { useRef, useState, useEffect } from "react"
import axios from "axios"

export const FileUpload = React.createContext()

export const FileUploadProvider = ({ children }) => {
  const [fileImg, setFileImg] = useState(null)
  const handleImageChange = (e) => { setFileImg(e.target.files[0]) }

  const sendFileToIPFS = async (e) => {

    e.preventDefault()

    if (fileImg) {
        try {

            const formData = new FormData()
            formData.append("file", fileImg)

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            })

            const ImgHash = `ipfs://${resFile.data.IpfsHash}`
            console.log(ImgHash)
            sendJSONtoIPFS(ImgHash)
            //Take a look at your Pinata Pinned section, you will see a new file added to you list.   



            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }

    const sendJSONtoIPFS = async (ImgHash) => {

        try {

            const resJSON = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
                data: {
                    "name": name,
                    "image": ImgHash
                },
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`
                },
            })

            console.log("final ", `ipfs://${resJSON.data.IpfsHash}`)
            const tokenURI = `ipfs://${resJSON.data.IpfsHash}`
            console.log("Token URI", tokenURI)

        } catch (error) {
            console.log("JSON to IPFS: ")
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(fileImg)
    }, [fileImg])

    return(
        <FileUpload.Provider value={{ sendFileToIPFS, handleImageChange }}>
            { children }
        </FileUpload.Provider>
    )
}

