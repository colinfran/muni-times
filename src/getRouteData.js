
export const getRouteData = async(stopIdArray) => {
  let data = []
  for (var i = 0; i < stopIdArray.length; i++){
    let stopId = stopIdArray[i]
    try {
      const response = await fetch(`https://webservices.umoiq.com/api/pub/v1/agencies/sfmta-cis/stopcodes/${stopId}/predictions?key=0be8ebd0284ce712a63f29dcaf7798c4`)
      const jsonArray = await response.json()
      console.log(stopId)
      for (var j = 0; j < jsonArray.length; j++){
        if (jsonArray[j].route.id === "6"){
          data.push(jsonArray[j])
        }
      }
    } catch (error) {
      console.log(error)
      data.push({
        error: true,
        errorMessage: error,
      })
    }
  }
  return data
}