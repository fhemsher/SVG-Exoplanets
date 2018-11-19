var StopAnim=false
function viewPlanetSelected()
{

if(viewSVG.childNodes.length==1)
    viewSVG.removeChild(viewSVG.lastChild)

    planetId=viewPlanetSelect.options[viewPlanetSelect.selectedIndex].value
   var planet=document.getElementById(planetId)

/*
 var clonePlanet=planet.cloneNode(true)
   clonePlanet.removeAttribute("id")
   clonePlanet.removeAttribute("transform")
   clonePlanet.removeAttribute("class")
   clonePlanet.setAttribute("cx","50%")
   clonePlanet.setAttribute("stroke-width","8")
   clonePlanet.setAttribute("cy","50%")
   clonePlanet.setAttribute("r","40%")
   var planetName= clonePlanet.getAttribute("planetName")
   planetNameSpan.innerHTML= planetName


   var atmos=clonePlanet.getAttribute("atmos")
   var comp=clonePlanet.getAttribute("comp")
   var hab=clonePlanet.getAttribute("hab")
   var data="<b>Atmoshpere:</b> "+ atmos+", <b>Composition:</b> "+comp+", <b>Habitable:</b> "+hab
   planetDataSpan.innerHTML=data
   //----replace fill with non-rotating----

  var url=clonePlanet.getAttribute("hab")+"Stop"
   clonePlanet.setAttribute("fill","url(#"+url+")")

   viewSVG.appendChild(clonePlanet)
*/


   viewPlanetDiv.style.visibility="visible"
   var height=viewPlanetDiv.scrollHeight
    d3.select("#viewPlanetDiv").transition().duration(800).style("height",height+"px")





}



function closeViewPlanet()
{
    var height=1

         d3.select("#viewPlanetDiv").transition().duration(800).style("height",height+"px")
        setTimeout('viewPlanetDiv.style.visibility="hidden"',1000)
    viewPlanetSelect.selectedIndex=0
}