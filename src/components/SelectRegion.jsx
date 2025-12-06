export default function SelectRegion({ setRegion, count }) {

    return (
        <>

            <label className='cardlabel'>Select Region:</label>
            <select onChange={(e) => setRegion(e.target.value)}>
                <option value="ALL">All</option>
                <option value="APAC">APAC</option>
                <option value="EMEA">EMEA</option>
                <option value="CLAR">CLAR</option>
            </select>
            <label className='cardlabel'>Count: {count}</label>
            



        </>
    )
}