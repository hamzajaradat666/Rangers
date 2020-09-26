 let loadUnits = async () => {
   let data = await fetch("./json/unit.json")
   return data.json()
 }
 let loadTerrain = async () => {
   let data = await fetch("./json/terrain.json")
   return data.json()
 }
 export {
   loadUnits,
   loadTerrain
 }