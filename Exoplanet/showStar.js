

var SelectedCon

var SelectedStar
var SelectedStarName
var HostStarXML //---string for registration---
var ExoPlanets =[]
var ExoPlanetXML //---string for registration---

function hostStarSelected()
{
    ExoPlanets =[]
    ExoPlanetXML = "<EXOPLANETS>"

    SelectedStar = null


    if(hostStarSelect.selectedIndex!=0)
    {
       //  showExoDataButton.disabled = true
      zoomToSelectedStarButton.disabled = false

        var host = hostStarSelect.options[hostStarSelect.selectedIndex].value

        d3.json("Exoplanet/starPacket.js", function(data)
            {
                for(k = 0; k<data.length; k++)
                {

                    var starName = data[k].S_Name

                    if(starName==host)
                    {
                        SelectedStarName = host
                        SelectedStar = data[k]
                        HostStarXML = JSON.stringify(SelectedStar)
                        HostStarXML = HostStarXML.replace(/:/g, "=")
                        HostStarXML = HostStarXML.replace(/,/g, " ")
                        HostStarXML = HostStarXML.replace(/\{/, "")
                        HostStarXML = HostStarXML.replace(/\}/, "")
                        HostStarXML = HostStarXML.replace(/\"S_/g, "")
                          HostStarXML = HostStarXML.replace(/\"\=/g, "=")
                          HostStarXML = "<HOST id='hostStar"+(new Date().getTime())+"' "+HostStarXML+" />"


      SelectedCon = SelectedStar.S_Constellation

      d3.json("Exoplanet/exoPacket.js", function(exos)
       {
        for(var j = 0; j<exos.length; j++)
        {
         var exoStar = exos[j].S_Name
         if(exoStar==host)
         {

          ExoPlanets.push(exos[j])
          var exoXML = JSON.stringify(exos[j])
          exoXML = exoXML.replace(/:/g, "=")
          exoXML = exoXML.replace(/,/g, " ")
          exoXML = exoXML.replace(/\{/, "")
          exoXML = exoXML.replace(/\}/, "")
          exoXML = exoXML.replace(/\"S_/g, "Host")
          exoXML = exoXML.replace(/\"P_/g, "")
          exoXML = exoXML.replace(/\"\=/g, "=")


          exoXML = "<EXO id='exoplanet"+(new Date().getTime())+"' "+exoXML+" />"
          ExoPlanetXML += exoXML


         }
        }

        ExoPlanetXML += "</EXOPLANETS>"

       }
      )

      showExoDataButton.disabled = false
      break


     }


    }


   }
  )
 }
}



function showExoData()
{
 if(SelectedStar)
 {
  writeExoplanetDataTable()

  exoplanetDataTableDiv.style.display = "block"
 }
}



function writeExoplanetDataTable()
{

 S_NameTD.innerHTML = SelectedStar.S_Name,
 S_NameHDTD.innerHTML = SelectedStar.S_NameHD,
 S_NameHIPTD.innerHTML = SelectedStar.S_NameHIP,
 S_ConstellationTD.innerHTML = SelectedStar.S_Constellation,
 S_TypeTD.innerHTML = SelectedStar.S_Type,
 S_MassTD.innerHTML = SelectedStar.S_Mass,
 S_RadiusTD.innerHTML = SelectedStar.S_Radius,
 S_TeffTD.innerHTML = SelectedStar.S_Teff,
 S_LuminosityTD.innerHTML = SelectedStar.S_Luminosity,
 S_FeHTD.innerHTML = SelectedStar.S_FeH,
 S_AgeTD.innerHTML = SelectedStar.S_Age,
 S_ApparMagTD.innerHTML = SelectedStar.S_ApparMag,
 S_DistanceTD.innerHTML = SelectedStar.S_Distance,
 S_RATD.innerHTML = SelectedStar.S_RA,
 S_DECTD.innerHTML = SelectedStar.S_DEC,
 S_MagfromPlanetTD.innerHTML = SelectedStar.S_MagfromPlanet,
 S_SizefromPlanetTD.innerHTML = SelectedStar.S_SizefromPlanet,
 S_No_PlanetsTD.innerHTML = SelectedStar.S_No_Planets,
 S_No_PlanetsHZTD.innerHTML = SelectedStar.S_No_PlanetsHZ,
 S_HabZoneMinTD.innerHTML = SelectedStar.S_HabZoneMin,
 S_HabZoneMaxTD.innerHTML = SelectedStar. S_HabZoneMax,
 S_HabCatTD.innerHTML = SelectedStar.S_HabCat



 for(var m = 0; m<ExoPlanets.length; m++)
 {
  var exo = ExoPlanets[m]




  var sp = exo.P_Name.lastIndexOf(" ")
  var letter = exo.P_Name[sp+1]

  eval("S_NameTD"+letter).innerHTML = exo.S_Name


  eval("P_NameTD"+letter).innerHTML = exo.P_Name,
  eval("P_NameKeplerTD"+letter).innerHTML = exo.P_NameKepler,
  eval("P_NameKOITD"+letter).innerHTML = exo.P_NameKOI,
  eval("P_ZoneClassTD"+letter).innerHTML = exo.P_ZoneClass,
  eval("P_MassClassTD"+letter).innerHTML = exo.P_MassClass,
  eval("P_CompositionClassTD"+letter).innerHTML = exo.P_CompositionClass,
  eval("P_AtmosphereClassTD"+letter).innerHTML = exo.P_AtmosphereClass,
  eval("P_HabitableClassTD"+letter).innerHTML = exo.P_HabitableClass,
  eval("P_MinMassTD"+letter).innerHTML = exo.P_MinMass,
  eval("P_MassTD"+letter).innerHTML = exo.P_Mass,
  eval("P_MaxMassTD"+letter).innerHTML = exo.P_MaxMass,
  eval("P_RadiusTD"+letter).innerHTML = exo.P_Radius,
  eval("P_DensityTD"+letter).innerHTML = exo.P_Density,
  eval("P_GravityTD"+letter).innerHTML = exo.P_Gravity,
  eval("P_EscVelTD"+letter).innerHTML = exo.P_EscVel,
  eval("P_SFluxMinTD"+letter).innerHTML = exo.P_SFluxMin,
  eval("P_SFluxMeanTD"+letter).innerHTML = exo.P_SFluxMean,
  eval("P_SFluxMaxTD"+letter).innerHTML = exo.P_SFluxMax,
  eval("P_TeqMinTD"+letter).innerHTML = exo.P_TeqMin,
  eval("P_TeqMeanTD"+letter).innerHTML = exo.P_TeqMean,
  eval("P_TeqMaxTD"+letter).innerHTML = exo.P_TeqMax,
  eval("P_TsMinTD"+letter).innerHTML = exo.P_TsMin,
  eval("P_TsMeanTD"+letter).innerHTML = exo.P_TsMean,
  eval("P_TsMaxTD"+letter).innerHTML = exo.P_TsMax,
  eval("P_SurfPressTD"+letter).innerHTML = exo.P_SurfPress,
  eval("P_MagTD"+letter).innerHTML = exo.P_Mag,
  eval("P_ApparSizeTD"+letter).innerHTML = exo.P_ApparSize,
  eval("P_PeriodTD"+letter).innerHTML = exo.P_Period,
  eval("P_SemMajorAxisTD"+letter).innerHTML = exo.P_SemMajorAxis,
  eval("P_EccentricityTD"+letter).innerHTML = exo.P_Eccentricity,
  eval("P_EccentricityTD"+letter).innerHTML = exo.P_Eccentricity,
  eval("P_InclinationTD"+letter).innerHTML = exo.P_Inclination,
  eval("P_MeanDistanceTD"+letter).innerHTML = exo.P_MeanDistance,
  eval("P_OmegaTD"+letter).innerHTML = exo.P_Omega,
  eval("P_HZDTD"+letter).innerHTML = exo.P_HZD,
  eval("P_HZCTD"+letter).innerHTML = exo.P_HZC,
  eval("P_HZATD"+letter).innerHTML = exo.P_HZA,
  eval("P_HZITD"+letter).innerHTML = exo.P_HZI,
  eval("P_SPHTD"+letter).innerHTML = exo.P_SPH,
  eval("P_IntESITD"+letter).innerHTML = exo.P_IntESI,
  eval("P_SurfESITD"+letter).innerHTML = exo.P_SurfESI,
  eval("P_ESITD"+letter).innerHTML = exo.P_ESI,
  eval("S_HabCatTD"+letter).innerHTML = exo.S_HabCat,
  eval("P_HabitableTD"+letter).innerHTML = exo.P_Habitable,
  eval("P_HabMoonTD"+letter).innerHTML = exo.P_HabMoon,
  eval("P_ConfirmedTD"+letter).innerHTML = exo.P_Confirmed,
  eval("P_Disc_MethodTD"+letter).innerHTML = exo.P_Disc_Method,
  eval("P_Disc_YearTD"+letter).innerHTML = exo.P_Disc_Year





 }



}

