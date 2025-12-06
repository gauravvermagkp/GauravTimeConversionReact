import './UserInput.css'

export default function UserInput({ preferredBase, setinputDate }) {
    return (
        <>
            <label className='cardlabel'>Choose Date & Time ({preferredBase}):</label>
            
            <input id="userInput" type="datetime-local" onChange={(e) => setinputDate(e.target.value)} />
        </>


    )
}