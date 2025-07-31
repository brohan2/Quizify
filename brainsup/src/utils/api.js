
const question=async()=>{
    const result = await fetch("https://opentdb.com/api.php?amount=15")
    const data = await result.json();
    const refinedData = data.results
    return refinedData
}
export default question