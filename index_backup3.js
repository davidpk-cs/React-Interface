const forecastURLS = {"Baltimore": "https://api.open-meteo.com/v1/forecast?latitude=39.2904&longitude=-76.6122&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York",
                "New York": "https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York",
                "Philadelphia": "https://api.open-meteo.com/v1/forecast?latitude=39.9523&longitude=-75.1638&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York",
                "Paris": "https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York"}



class HomeApp extends React.Component{
    
    constructor(props){

       
        super(props);

        this.state = {page:'Home', fridgeTemp: 40,
        fridgeUnit: 'Fahrenheit',
        freezerTemp: 20,
        freezerUnit: 'Fahrenheit',

        //room page vars
        diningRoomTemp: 70,
        livingRoomTemp: 65,
        topFloorTemp: 72,
        basementTemp: 68,
        diningRoomLight: "Off",
        livingRoomLight: "Off",
        topFloorLight: "On",
        basementLight: "Off",
        //room page scheduling vars
        tempSch: false,
        livingSch: false,
        livingSchTemp: 0,
        livingSchUnit: "F",
        livingFrom: "1:00",
        livingFromPMAM: "AM",
        livingTo: "1:00",
        livingToPMAM: "AM",
        livingDisp1: "2:00", livingDisp2: "AM", livingDisp3: "5:00", 
        livingDisp4: "PM", livingDisp5: 70, livingDisp6: "F",

        diningSch: false,
        diningSchTemp: 0,
        diningSchUnit: "F",
        diningFrom: "1:00",
        diningFromPMAM: "AM",
        diningTo: "1:00",
        diningToPMAM: "AM",
        diningDisp1: "2:00", diningDisp2: "AM", diningDisp3: "5:00", 
        diningDisp4: "PM", diningDisp5: 70, diningDisp6: "F",

        topSch: false,
        topSchTemp: 0,
        topSchUnit: "F",
        topFrom: "1:00",
        topFromPMAM: "AM",
        topTo: "1:00",
        topToPMAM: "AM",
        topDisp1: "2:00", topDisp2: "AM", topDisp3: "5:00", 
        topDisp4: "PM", topDisp5: 70, topDisp6: "F",

        basementSch: false,
        basementSchTemp: 0,
        basementSchUnit: "F",
        basementFrom: "1:00",
        basementFromPMAM: "AM",
        basementTo: "1:00",
        basementToPMAM: "AM",
        basementDisp1: "2:00", basementDisp2: "AM", basementDisp3: "5:00", 
        basementDisp4: "PM", basementDisp5: 70, basementDisp6: "F",

        
        //garden/others
        gardenTemp: 66,
        gardenLightStatus: "OFF",
        gardenIrrigationStatus: "OFF",
        
        //garden scheduling
        gardenSch: false,
        garLightsSch: false,
        garLightsFrom: "1:00",
        garLightsFromPMAM: "AM",
        garLightsTo: "1:00",
        garLightsToPMAM: "AM",
        garLightsDisp1: "2:00", garLightsDisp2: "AM", garLightsDisp3: "5:00", 
        garLightsDisp4: "PM",

        garIrrSch: false,
        garIrrFrom: "1:00",
        garIrrFromPMAM: "AM",
        garIrrTo: "1:00",
        garIrrToPMAM: "AM",
        garIrrDisp1: "2:00", garIrrDisp2: "AM", garIrrDisp3: "5:00", 
        garIrrDisp4: "PM",


        //device scheduling
        devSch: false,
        vacSch: false,
        vacFrom: "1:00",
        vacFromPMAM: "AM",
        vacTo: "1:00",
        vacToPMAM: "AM",
        vacDisp1: "2:00", vacDisp2: "AM", vacDisp3: "5:00", 
        vacDisp4: "PM",

        coffeeSch: false,
        coffeeFrom: "1:00",
        coffeeFromPMAM: "AM",
        coffeeTo: "1:00",
        coffeeToPMAM: "AM",
        coffeeDisp1: "2:00", coffeeDisp2: "AM", coffeeDisp3: "5:00", 
        coffeeDisp4: "PM",

        cities: [], //expects objects in the form of: {city: cityName, temp: temp, forecast: forecast}
        irigationPower: 0,
        gardenLights: 0,
        coffeemakerStatus: 0,
        vacuumStatus: 0,
        roboVacuumOnOff: "OFF",
        coffeemakerOnOff: "OFF",
        homeDisplayedCity: "Unknown",
        homeDisplayedCityTemperature: "Unknown",
    };

        if (!localStorage.getItem('freezerTemp')) localStorage.setItem('freezerTemp', this.state.freezerTemp);
        if (!localStorage.getItem('freezerUnit')) localStorage.setItem('freezerUnit', this.statefreezerUnit);
        if (!localStorage.getItem('fridgeTemp')) localStorage.setItem('fridgeTemp', this.state.fridgeTemp);
        if (!localStorage.getItem('fridgeUnit')) { localStorage.setItem('fridgeUnit', this.state.fridgeUnit); }
        else{
            this.setState({freezerTemp: localStorage.getItem('freezerTemp'), fridgeTemp: localStorage.getItem('fridgeTemp'), 
            fridgeUnit: localStorage.getItem("fridgeUnit"), freezerUnit: localStorage.getItem("freezerUnit")});
        }


        this.convertTemperature.bind(this);
        this.incrementTemperature = this.incrementTemperature.bind(this);
        this.toggleLights.bind(this);
        this.toggleSchedDisp.bind(this);
        this.setSched.bind(this);
        this.load("Baltimore");

        
     
    }//end of constructor

    //checkData()
  
        
        //homeDisplayedCity = this.state.cities[0].city;
        //homeDisplayedCityTemperature = this.state.cities[0].temp;


    handleLightSwitch = (x) => {if(x === 1){this.setState({gardenLightStatus: "ON"});}
                                else {this.setState({gardenLightStatus: "OFF"});}
                                this.setState({gardenLights: x});}
    handleIrigationPower = (x) => {if(x === 1){this.setState({gardenIrrigationStatus: "ON"});}
                                    else {this.setState({gardenIrrigationStatus: "OFF"});}
                                    this.setState({irigationPower: x});}
    handleCoffeeMakerStatus = (x) => {if(x === 1){this.setState({coffeemakerOnOff: "ON"});}
                                    else {this.setState({coffeemakerOnOff: "OFF"});}
                                    this.setState({coffeemakerStatus: x});}
    handleVacuumStatus = (x) => {if(x === 1){this.setState({roboVacuumOnOff: "ON"});}
                                else {this.setState({roboVacuumOnOff: "OFF"});}
                                this.setState({vacuumStatus: x});}

    async load(cityName) {
        //let url = 'https://api.open-meteo.com/v1/forecast?latitude=39.29&longitude=-76.61&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch';
        let url = forecastURLS[cityName];
        console.log(url);
        let obj = null;
        try {
            obj = await (await fetch(url)).json();
        } catch(e) {
            console.log('error');
        }
        console.log(obj);
        var temp = obj.current_weather.temperature
        //console.log(obj.current_weather.temperature);

        var today = new Date();
        var time = today.getHours()

        var forecast = [];

        for (let i = 0; i < 4; i++){
              forecast.push(time + i + ":00  -  " + obj.hourly.temperature_2m[time + i] + '\u00b0' + 'F');
        }

        try {
            await (this.setState({
                cities: this.state.cities.concat({city: cityName, temp: temp, forecast: forecast})
            }, ()=> (this.setHomepageWeather())));
        } catch(e) {
            console.log('error');
        }
    }

    setHomepageWeather = () => {
        this.setState({homeDisplayedCity: this.state.cities[0].city});
        this.setState({homeDisplayedCityTemperature: this.state.cities[0].temp});
    }

    addCity = (x) => {
        
        
        var newCity = document.getElementById("CitySelector");
        var cityName = newCity.value;
        var cityURL = forecastURLS[cityName];
        var currentTemp;

        

        this.load(cityName);

        /*this.setState({
        cities: this.state.cities.concat({city: cityName, temp: currentTemp, forecast: "the forecast"})
    });*/}

    //similar to example code, the state will determine which page renders, so a series of if statements will be how it's done
    render(){

        if (this.state.page == "Home"){
            return(
                <div id = "homePage">
                    
                    <h1 id = "homePageTitleHeader">Home Manager</h1>

                    <div id = "homePanelManager">

                        <div class = "homePanel">
                            <h3 class = "homePanelTitle" onClick = { () => this.setState( {page: "Fridge"})}>Refridgerator</h3>

                            <div class = "homePanelDisplay">
                                <p class = "homePanelDisplayText">{"Fridge: " + this.state.fridgeTemp + "F"}</p>
                                <p class = "homePanelDisplayText">{"Freezer: " + this.state.freezerTemp + "F"}</p>
                            </div>
                        </div>

                        <div class = "homePanel" onClick = { () => this.setState( {page: "Temp"})}>
                            <h3 class = "homePanelTitle">Rooms</h3>

                            <div class = "homePanelDisplay">
                                <p class = "homePanelDisplayText">{ homePageLightsOutput("Lights", this.lightsScheduled) }</p>
                                <p class = "homePanelDisplayText">{ homePageLightsOutput("Temperature", this.tempsScheduled) }</p>
                            </div>
                        </div>

                        <div class = "homePanel">
                            <h3 class = "homePanelTitle" onClick = { () => this.setState( {page: "Weather"})}>Weather</h3>

                            <div class = "homePanelDisplay">
                                <p class = "homePanelDisplayText">{ this.state.homeDisplayedCity + ": " + this.state.homeDisplayedCityTemperature + "F" }</p>
                            </div>
                        </div>

                        <div class = "homePanel">
                            <h3 class = "homePanelTitle" onClick = { () => this.setState( {page: "Garden"})}>Garden</h3>

                            <div class = "homePanelDisplay">
                                <p class = "homePanelDisplayText">{ "Lighting: " + this.state.gardenLightStatus }</p>
                                <p class = "homePanelDisplayText">{ "Irrigation: " + this.state.gardenIrrigationStatus }</p>
                            </div>
                        </div >

                        <div class = "homePanel">
                            <h3 class = "homePanelTitle" onClick = { () => this.setState( {page: "Devices"})}>Devices</h3>

                            <div class = "homePanelDisplay">
                                <p class = "homePanelDisplayText">{ "Robo Vacuum: " + this.state.roboVacuumOnOff }</p>
                                <p class = "homePanelDisplayText">{ "Coffee Maker: " + this.state.coffeemakerOnOff }</p>
                            </div>
                        </div>



                    </div>
                </div>

                //


            ) //to be implemented, will copy and paste the contents of home.html here
        }
        else if(this.state.page == "Temp"){
            
            let sched, living, dining, top, basement;

            if(this.state.livingSch){
                living = (
                    <div>
                        <h4><ins><strong>Current schedule:</strong> {this.state.livingDisp5}{this.state.livingDisp6} From {this.state.livingDisp1}{this.state.livingDisp2} to {this.state.livingDisp3}{this.state.livingDisp4}</ins></h4> 
                    </div>
                )
            }

            if(this.state.diningSch){
                dining = (
                    <div>
                        <h4><ins><strong>Current schedule:</strong> {this.state.diningDisp5}{this.state.diningDisp6} From {this.state.diningDisp1}{this.state.diningDisp2} to {this.state.diningDisp3}{this.state.diningDisp4}</ins></h4> 
                    </div>
                )
            }

            if(this.state.topSch){
                top = (
                    <div>
                        <h4><ins><strong>Current schedule:</strong> {this.state.topDisp5}{this.state.topDisp6} From {this.state.topDisp1}{this.state.topDisp2} to {this.state.topDisp3}{this.state.topDisp4}</ins></h4>
                    </div>
                )
            }

            if(this.state.basementSch){
                basement = (
                    <div>
                        <h4><ins><strong>Current schedule:</strong> {this.state.basementDisp5}{this.state.basementDisp6} From {this.state.basementDisp1}{this.state.basementDisp2} to {this.state.basementDisp3}{this.state.basementDisp4}</ins></h4>
                    </div>
                )
            }
            
            if(this.state.tempSch){
                sched = (<div className = "row justify-content-evenly">
                                <div className = "col-7 room ">
                                    <h1>Room Schedules</h1>
                                    <h4>Living Room</h4>
                                    {living}
                                    <label htmlFor="living-temp">Temp:</label>
                                    <input type = "text" id = "living-temp" className = "schTempBox"onChange = {(c) => {this.setState({livingSchTemp: c.target.value})}}></input><br></br>
                                    <label htmlFor="living-from">From:</label>
                                    <select name="times-from" id = "living-from" onChange = {(c) => {this.setState({livingFrom: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM"onChange = {(c) => {this.setState({livingFromPMAM: c.target.value})}}>
                                        <option value="AM" >AM</option>
                                        <option value="PM">PM</option></select>
                                    <label htmlFor="living-to" className = "to-label">To:</label>
                                    <select name="times-to"id = "living-to" onChange = {(c) => {this.setState({livingTo: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM" onChange = {(c) => {this.setState({livingToPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Living")}>Set Schedule</button>
                                    <br></br><br></br>
                                    <h4>Dining Room</h4>
                                    {dining}
                                    <label htmlFor="dining-temp">Temp:</label>
                                    <input type = "text" id = "dining-temp" className = "schTempBox"onChange = {(c) => {this.setState({diningSchTemp: c.target.value})}}></input><br></br>
                                    <label htmlFor="dining-from">From:</label>
                                    <select name="times-from" id = "dining-from" onChange = {(c) => {this.setState({diningFrom: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM"onChange = {(c) => {this.setState({diningFromPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label htmlFor="dining-to" className = "to-label">To:</label>
                                    <select name="times-to" id = "dining-to" onChange = {(c) => {this.setState({diningTo: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM"onChange = {(c) => {this.setState({diningToPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Dining")}>Set Schedule</button>
                                    <br></br><br></br>
                                    <h4>Top Floor</h4>
                                    {top}
                                    <label htmlFor="top-temp">Temp:</label>
                                    <input type = "text" id = "top-temp" className = "schTempBox" onChange = {(c) => {this.setState({topSchTemp: c.target.value})}}></input><br></br>
                                    <label htmlFor="top-from">From:</label>
                                    <select name="times-from" id = "top-from" onChange = {(c) => {this.setState({topFrom: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM" onChange = {(c) => {this.setState({topFromPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label htmlFor="top-to" className = "to-label">To:</label>
                                    <select name="times-from" id = "top-to" onChange = {(c) => {this.setState({topTo: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM" onChange = {(c) => {this.setState({topToPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Top")}>Set Schedule</button>
                                    <br></br><br></br>
                                    <h4>Basement</h4>
                                    {basement}
                                    <label htmlFor="basement-temp">Temp:</label>
                                    <input type = "text" id = "basement-temp"className = "schTempBox" onChange = {(c) => {this.setState({basementSchTemp: c.target.value})}}></input><br></br>
                                    <label htmlFor="basement-from">From:</label>
                                    <select name="times-from" id = "basement-from" onChange = {(c) => {this.setState({basementFrom: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM" onChange = {(c) => {this.setState({basementFromPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label htmlFor="basement-to" className = "to-label">To:</label>
                                    <select name="times-to" id = "basement-to" onChange = {(c) => {this.setState({basementTo: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                        <option value="2:00">2:00</option>
                                        <option value="3:00">3:00</option>
                                        <option value="4:00">4:00</option>
                                        <option value="5:00">5:00</option>
                                        <option value="6:00">6:00</option>
                                        <option value="7:00">7:00</option>
                                        <option value="8:00">8:00</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                    <select name="PMAM" onChange = {(c) => {this.setState({basementToPMAM: c.target.value})}}>
                                        <option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Basement")}>Set Schedule</button>
                                </div>
                            </div>);
            }else{
                sched = <div></div>
            }
            
            return(
                <div>
                    <div className = "container-fluid" >
                    
                        <div class = "fridgeTopBar"> 
                            <button className = "home-btn" onClick = { () => this.setState( {page: "Home"})}></button>
                            <h1>Room Statuses</h1>
                            <div id = "filterStatus" >
                                <button onClick = {() => this.toggleSchedDisp("Temp")}>View schedules</button>
                            </div>
                        </div>
                    
                        {sched}

                        <div className = "row justify-content-evenly">
                            <div className = " col-3 room ">
                                <h1>Living Room</h1>
                                <h4>Temp: {this.state.livingRoomTemp} F</h4>
                                <button className = "btn-sm tmp-inc" onClick = {() => this.incrementTemperature("increment", "living")}>+</button><button className = "btn-sm tmp-dec" onClick = {() => this.incrementTemperature("decrement", "living")}>-</button>
                                <h4>Lights: {this.state.livingRoomLight}</h4>
                                <button className = "btn-sm bttn-misc" onClick = {() => this.toggleLights("living")}>Toggle Lights</button>
                            </div>

                            <div className = " col-3 room ">
                                <h1>Dining Room</h1>
                                <h4>Temp: {this.state.diningRoomTemp} F</h4>
                                <button className = "btn-sm tmp-inc" onClick = {() => this.incrementTemperature("increment", "dining")}>+</button><button className = "btn-sm tmp-dec" onClick = {() => this.incrementTemperature("decrement", "dining")}>-</button>
                                <h4>Lights: {this.state.diningRoomLight}</h4>
                                <button className = "btn-sm bttn-misc" onClick = {() => this.toggleLights("dining")}>Toggle Lights</button>
                            </div>

                            <div className = " col-3 room ">
                                <h1>Top Floor</h1>
                                <h4>Temp: {this.state.topFloorTemp} F</h4>
                                <button className = "btn-sm tmp-inc" onClick = {() => this.incrementTemperature("increment", "topFloor")}>+</button><button className = "btn-sm tmp-dec" onClick = {() => this.incrementTemperature("decrement", "topFloor")}>-</button>
                                <h4>Lights: {this.state.topFloorLight}</h4>
                                <button className = "btn-sm bttn-misc" onClick = {() => this.toggleLights("topFloor")}>Toggle Lights</button>
                            </div>

                        </div>


                        <div className = "row justify-content-evenly">
                            <div className = " col-3 room ">
                                <h1>Basement</h1>
                                <h4>Temp: {this.state.basementTemp} F</h4>
                                <button className = "btn-sm tmp-inc" onClick = {() => this.incrementTemperature("increment", "basement")}>+</button><button className = "btn-sm tmp-dec" onClick = {() => this.incrementTemperature("decrement", "basement")}>-</button>
                                <h4>Lights: {this.state.basementLight}</h4>
                                <button className = "btn-sm bttn-misc" onClick = {() => this.toggleLights("basement")}>Toggle Lights</button>
                            </div>

                            <div className = "col-3"></div>
                            <div className = "col-3"></div>

                        </div>

                       
                           
                      
                
                    </div>
                </div>
            );
        }
        else if(this.state.page == "Fridge"){

            return (

                <div>

                    <div class = "fridgeTopBar"> 

                    <button className = "home-btn" onClick = { () => this.setState( {page: "Home"})}></button>
                    <h1>Refrigerator Settings</h1>

                    <div id = "filterStatus" >
                            <span>Water Filter Status</span>
                            <div class = "statusCircle"></div>
                    </div>

                    </div>

                    <div class = "iceBoxManager">

                        <div className = "iceBox">
                            <div className = "iceBoxMinus iceBoxSides">
                                <p onClick = {() => this.incrementTemperature("decrement", "fridge")}>-</p>
                            </div>
                            <div className = "iceBoxInfo">
                                <p class = "iceBoxType" >Fridge</p>
                                <p class = "iceBoxTemperature">{this.state.fridgeTemp}</p>
                                <p class = "iceBoxTemperatureUnit" onClick = {() => this.convertTemperature("fridge")}>{this.state.fridgeUnit}</p>
                            </div>
                            <div class = "iceBoxPlus iceBoxSides">
                                <p onClick = {() => this.incrementTemperature("increment", "fridge")}>+</p>
                            </div>

                        </div>


                        <div className = "iceBox">
                            <div className = "iceBoxMinus iceBoxSides">
                                <p onClick = {() => this.incrementTemperature("decrement", "freezer")}>-</p>
                            </div>
                            <div className = "iceBoxInfo">
                                <p class = "iceBoxType" >Freezer</p>
                                <p class = "iceBoxTemperature">{this.state.freezerTemp}</p>
                                <p class = "iceBoxTemperatureUnit" onClick = {() => this.convertTemperature("freezer")}>{this.state.freezerUnit}</p>
                            </div>
                            <div class = "iceBoxPlus iceBoxSides">
                                <p onClick = {() => this.incrementTemperature("increment", "freezer")}>+</p>
                            </div>

                        </div>

                    </div>

                    <div>

                    </div>


                </div>

            )
        }
        else if(this.state.page == "Devices"){
            
            let sched, vac, coffee;

                if(this.state.vacSch){
                    vac = (
                        <div>
                             <h4><ins><strong>Current schedule:</strong> ON From {this.state.vacDisp1}{this.state.vacDisp2} to {this.state.vacDisp3}{this.state.vacDisp4}</ins></h4>    
                        </div>
                    )
                }

                if(this.state.coffeeSch){
                    coffee = (
                        <div>
                             <h4><ins><strong>Current schedule:</strong> ON From {this.state.coffeeDisp1}{this.state.coffeeDisp2} to {this.state.coffeeDisp3}{this.state.coffeeDisp4}</ins></h4> 
                        </div>
                    )
                }
                
                if(this.state.devSch){
                    sched = (<div className = "row justify-content-evenly">
                                        <div className = "col-7 room ">
                                        <h1>Device Schedules</h1>
                                        <h4>Vacuum</h4>
                                        {vac}
                                        <p>Set active interval:</p>
                                        <label htmlFor="living-from">From:</label>
                                        <select name="times-from" id = "living-from" onChange = {(c) => {this.setState({vacFrom: c.target.value})}}>
                                            <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM"onChange = {(c) => {this.setState({vacFromPMAM: c.target.value})}}>
                                            <option value="AM" >AM</option>
                                            <option value="PM">PM</option></select>
                                        <label htmlFor="living-to" className = "to-label">To:</label>
                                        <select name="times-to"id = "living-to" onChange = {(c) => {this.setState({vacTo: c.target.value})}}>
                                            <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM" onChange = {(c) => {this.setState({vacToPMAM: c.target.value})}}>
                                            <option value="AM">AM</option><option value="PM">PM</option></select>
                                        <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Vac")}>Set Schedule</button>
                                        <br></br><br></br>
                                        <h4>Coffee Maker</h4>
                                        {coffee}
                                        <p>Set active interval:</p>
                                        <label htmlFor="dining-from">From:</label>
                                        <select name="times-from" id = "dining-from" onChange = {(c) => {this.setState({coffeeFrom: c.target.value})}}>
                                            <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM"onChange = {(c) => {this.setState({coffeeFromPMAM: c.target.value})}}>
                                            <option value="AM">AM</option><option value="PM">PM</option></select>
                                        <label htmlFor="dining-to" className = "to-label">To:</label>
                                        <select name="times-to" id = "dining-to" onChange = {(c) => {this.setState({coffeeTo: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM"onChange = {(c) => {this.setState({coffeeToPMAM: c.target.value})}}>
                                            <option value="AM">AM</option><option value="PM">PM</option></select>
                                        <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Coffee")}>Set Schedule</button>
                                </div>
                            </div>);
                        }
            return (
                <div>

                        <div class = "fridgeTopBar"> 

                        <button className = "home-btn" onClick = { () => this.setState( {page: "Home"})}></button>
                        <h1>Device Settings</h1>

                        <div id = "filterStatus" >
                                <span>Battery</span>
                                <div class = "statusCircle"></div>
                        </div>

                        </div>
                    <div id = "homePanelManager">
                    <div class = "weatherPanelDisplay weatherPanel" >
                    <h3 class = "homePanelTitle">Vacuum</h3>
                        <PowerButton power={this.state.vacuumStatus} onPowerChange={this.handleVacuumStatus} name={"VACUUM"}/>
                    </div>
                    <div class = "weatherPanelDisplay weatherPanel">
                    <h3 class = "homePanelTitle">Coffeemaker</h3>
                        <PowerButton power={this.state.coffeemakerStatus} onPowerChange={this.handleCoffeeMakerStatus} name={"COFFEE MAKER"}/>
                        <p id = "devicePanelText">Brew Strength</p>
                        <div class="slidecontainer">
                            <input type="range" min="1" max="100" value="50" class="slider" id="myRange"></input>
                        </div>
                    </div>
                    </div>
                    
                    <div id = "homePanelManager">
                        <button id = "gardenSch" onClick = {() => this.toggleSchedDisp("Dev")}>View schedules</button>
                    </div>

                    {sched}
                </div>
            );

        }
            else if(this.state.page == "Weather") {
                const arrayDataItems = this.state.cities.map((city) => 
                <div className = "weatherPanel">
                    <h3 class = "homePanelTitle">{city.city}</h3>

                    <div class = "weatherPanelDisplay">
                        <p class = "homePanelDisplayText">{ "Tempurature: " + city.temp }</p>
                        
                        <p class = "homePanelDisplayText">{ "Hourly Forecast:"}</p>
                        <ul id="hourlyForecast">{city.forecast.map((hour) => <li>{hour}</li>)}</ul>
                    </div>
                </div >
                )
                return (<div>

                    <div class = "fridgeTopBar"> 

                    <button className = "home-btn" onClick = { () => this.setState( {page: "Home"})}></button>
                    <h1>Weather</h1>

                    <div id = "filterStatus" >
                                <span>Battery</span>
                                <div class = "statusCircle"></div>
                        </div>
                    </div>
                     <div id = "homePanelManager">
                        {arrayDataItems}
                        {/* add city */}
                        
                        <div className = "weatherPanel">
                        <div class = "weatherPanelDisplay">
                        <h3 class = "homePanelTitle">Add City</h3>
                            <select name="CitySelector" id="CitySelector">
                                <option value="Baltimore">Baltimore</option>
                                <option value="New York">New York</option>
                                <option value="Philadelphia">Philadelphia</option>
                                <option value="Paris">Paris</option>
                            </select>                
                            <button className="btn btn-primary btn-lg m-1"
                                onClick={() => {this.addCity(this.state.cities, "anyCity")}}>Add City</button>             
                        </div>
                        </div>
                    
                </div>
                </div>
                
                );
            }
            else if (this.state.page === "Garden"){
                
                let sched, lights, irrigation;

                if(this.state.garLightsSch){
                    lights = (
                        <div>
                            <h4><ins><strong>Current schedule:</strong> ON From {this.state.garLightsDisp1}{this.state.garLightsDisp2} to {this.state.garLightsDisp3}{this.state.garLightsDisp4}</ins></h4>  
                        </div>
                    )
                }

                if(this.state.garIrrSch){
                    irrigation = (
                        <div>
                            <h4><ins><strong>Current schedule:</strong> ON From {this.state.garIrrDisp1}{this.state.garIrrDisp2} to {this.state.garIrrDisp3}{this.state.garIrrDisp4}</ins></h4> 
                        </div>
                    )
                }
                
                if(this.state.gardenSch){
                    sched = (<div className = "row justify-content-evenly">
                                        <div className = "col-7 room ">
                                        <h1>Garden Schedules</h1>
                                        <h4>Lights</h4>
                                        {lights}
                                        <p>Set active interval:</p>
                                        <label htmlFor="living-from">From:</label>
                                        <select name="times-from" id = "living-from" onChange = {(c) => {this.setState({garLightsFrom: c.target.value})}}>
                                            <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM"onChange = {(c) => {this.setState({garLightsFromPMAM: c.target.value})}}>
                                            <option value="AM" >AM</option>
                                            <option value="PM">PM</option></select>
                                        <label htmlFor="living-to" className = "to-label">To:</label>
                                        <select name="times-to"id = "living-to" onChange = {(c) => {this.setState({garLightsTo: c.target.value})}}>
                                            <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM" onChange = {(c) => {this.setState({garLightsToPMAM: c.target.value})}}>
                                            <option value="AM">AM</option><option value="PM">PM</option></select>
                                        <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Lights")}>Set Schedule</button>
                                        <br></br><br></br>
                                        <h4>Irrigation</h4>
                                        {irrigation}
                                        <p>Set active interval:</p>
                                        <label htmlFor="dining-from">From:</label>
                                        <select name="times-from" id = "dining-from" onChange = {(c) => {this.setState({garIrrFrom: c.target.value})}}>
                                            <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM"onChange = {(c) => {this.setState({garIrrFromPMAM: c.target.value})}}>
                                            <option value="AM">AM</option><option value="PM">PM</option></select>
                                        <label htmlFor="dining-to" className = "to-label">To:</label>
                                        <select name="times-to" id = "dining-to" onChange = {(c) => {this.setState({garIrrTo: c.target.value})}}>
                                        <option value="1:00">1:00</option>
                                            <option value="2:00">2:00</option>
                                            <option value="3:00">3:00</option>
                                            <option value="4:00">4:00</option>
                                            <option value="5:00">5:00</option>
                                            <option value="6:00">6:00</option>
                                            <option value="7:00">7:00</option>
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
                                        </select>
                                        <select name="PMAM"onChange = {(c) => {this.setState({garIrrToPMAM: c.target.value})}}>
                                            <option value="AM">AM</option><option value="PM">PM</option></select>
                                        <br></br><button className = "btn-sm bttn-misc" onClick = {() =>this.setSched("Irr")}>Set Schedule</button>
                                </div>
                            </div>);
                        }
                
                
                return (<div>

                    <div class = "fridgeTopBar"> 

                        <button className = "home-btn" onClick = { () => this.setState( {page: "Home"})}></button>
                        <h1>Weather</h1>
                        
                        <div id = "filterStatus" >
                                <span>Battery</span>
                                <div class = "statusCircle"></div>
                        </div>
                    </div>
                    <div id = "homePanelManager">
                        <div class = "gardenPanel gardenPanelDisplay">
                            <h3 class = "homePanelTitle">GARDEN</h3>
                            <PowerButton power={this.state.gardenLights} onPowerChange={this.handleLightSwitch} name={"LIGHTS"}/>
                            <PowerButton power={this.state.irigationPower} onPowerChange={this.handleIrigationPower} name={"IRIGATION"}/>
                        </div>
                        
                        
                    </div>
                    <div id = "homePanelManager">
                        <button id = "gardenSch" onClick = {() => this.toggleSchedDisp("Garden")}>View schedules</button>
                    </div>
                   
                    {sched}
                        
                </div>
                );
            }
            
        }

    saveFridgeData() {
        localStorage.setItem('freezerTemp', this.state.freezerTemp);
        localStorage.setItem('freezerUnit', this.state.freezerUnit);
        localStorage.setItem('fridgeTemp', this.state.fridgeTemp);
        localStorage.setItem('fridgeUnit', this.state.fridgeUnit);
    }
    
    

    convertTemperature(type) {
        if(type === "fridge"){
            if(this.state.fridgeUnit === "Fahrenheit"){
                this.setState({ fridgeUnit: "Celcius", fridgeTemp: Math.round((this.state.fridgeTemp - 32) * (5 / 9)) });
            }
            else{
                this.setState({ fridgeUnit: "Fahrenheit", fridgeTemp: Math.round((this.state.fridgeTemp * (9 / 5)) + 32) });
            }
        }
        else if(type === "freezer"){
            if(this.state.freezerUnit === "Fahrenheit"){
                this.setState({ freezerUnit: "Celcius", freezerTemp: Math.round((this.state.freezerTemp - 32) * (5 / 9)) });
            }
            else{
                this.setState({ freezerUnit: "Fahrenheit", freezerTemp: Math.round((this.state.freezerTemp * (9 / 5)) + 32) });
            }
        }
        this.saveFridgeData();
    }

    incrementTemperature(direction, type){

        if(type === "fridge"){

            if(direction === "increment"){
                this.setState((prevState) => ({fridgeTemp: prevState.fridgeTemp + 1}));
            }
            else{
                this.setState((prevState) => ({fridgeTemp: prevState.fridgeTemp - 1}));
            }
        }
        else if (type === "freezer"){
            if(direction === "increment"){
                this.setState((prevState) => ({freezerTemp: prevState.freezerTemp + 1}));
            }
            else{
                this.setState((prevState) => ({freezerTemp: prevState.freezerTemp - 1}));
            }

        }
        else if (type === "living"){
            if(direction === "increment"){
                this.setState((prevState) => ({livingRoomTemp: prevState.livingRoomTemp + 1}));
            }
            else{
                this.setState((prevState) => ({livingRoomTemp: prevState.livingRoomTemp - 1}));
            }
        }
        else if (type === "basement"){
            if(direction === "increment"){
                this.setState((prevState) => ({basementTemp: prevState.basementTemp + 1}));
            }
            else{
                this.setState((prevState) => ({basementTemp: prevState.basementTemp - 1}));
            }
        }
        else if (type === "dining"){
            if(direction === "increment"){
                this.setState((prevState) => ({diningRoomTemp: prevState.diningRoomTemp + 1}));
            }
            else{
                this.setState((prevState) => ({diningRoomTemp: prevState.diningRoomTemp - 1}));
            }
        }
        else if (type === "topFloor"){
            if(direction === "increment"){
                this.setState((prevState) => ({topFloorTemp: prevState.topFloorTemp + 1}));
            }
            else{
                this.setState((prevState) => ({topFloorTemp: prevState.topFloorTemp - 1}));
            }
        }
        this.saveFridgeData();
    }

    toggleSchedDisp (page){
        if(page === "Temp"){
            if(this.state.tempSch){
                this.setState({tempSch: false});
            }else{
                this.setState({tempSch: true});
            }   
        }else if (page === "Garden"){
            if(this.state.gardenSch){
                this.setState({gardenSch: false});
            }else{
                this.setState({gardenSch: true});
            } 
        }else if(page === "Dev"){
            if(this.state.devSch){
                this.setState({devSch: false});
            }else{
                this.setState({devSch: true});
            } 
        }
    }

    setSched(panel){
        if(panel === "Living"){
            this.setState({livingSch: true});
            this.setState({livingDisp1: this.state.livingFrom});
            this.setState({livingDisp2: this.state.livingFromPMAM});
            this.setState({livingDisp3: this.state.livingTo});
            this.setState({livingDisp4: this.state.livingToPMAM});
            this.setState({livingDisp5: this.state.livingSchTemp});
            this.setState({livingDisp6: this.state.livingSchUnit});
        }else if(panel === "Dining"){
            this.setState({diningSch: true});
            this.setState({diningDisp1: this.state.diningFrom});
            this.setState({diningDisp2: this.state.diningFromPMAM});
            this.setState({diningDisp3: this.state.diningTo});
            this.setState({diningDisp4: this.state.diningToPMAM});
            this.setState({diningDisp5: this.state.diningSchTemp});
            this.setState({diningDisp6: this.state.diningSchUnit});
        }else if(panel === "Top"){
            this.setState({topSch: true});
            this.setState({topDisp1: this.state.topFrom});
            this.setState({topDisp2: this.state.topFromPMAM});
            this.setState({topDisp3: this.state.topTo});
            this.setState({topDisp4: this.state.topToPMAM});
            this.setState({topDisp5: this.state.topSchTemp});
            this.setState({topDisp6: this.state.topSchUnit});
        }else if(panel === "Basement"){
            this.setState({basementSch: true});
            this.setState({basementDisp1: this.state.basementFrom});
            this.setState({basementDisp2: this.state.basementFromPMAM});
            this.setState({basementDisp3: this.state.basementTo});
            this.setState({basementDisp4: this.state.basementToPMAM});
            this.setState({basementDisp5: this.state.basementSchTemp});
            this.setState({basementDisp6: this.state.basementchUnit});
        }else if(panel === "Lights"){
            this.setState({garLightsSch: true});
            this.setState({garLightsDisp1: this.state.garLightsFrom});
            this.setState({garLightsDisp2: this.state.garLightsFromPMAM});
            this.setState({garLightsDisp3: this.state.garLightsTo});
            this.setState({garLightsDisp4: this.state.garLightsToPMAM});
        }else if(panel === "Irr"){
            this.setState({garIrrSch: true});
            this.setState({garIrrDisp1: this.state.garIrrFrom});
            this.setState({garIrrDisp2: this.state.garIrrFromPMAM});
            this.setState({garIrrDisp3: this.state.garIrrTo});
            this.setState({garIrrDisp4: this.state.garIrrToPMAM});
        }else if(panel === "Vac"){
            this.setState({vacSch: true});
            this.setState({vacDisp1: this.state.vacFrom});
            this.setState({vacDisp2: this.state.vacFromPMAM});
            this.setState({vacDisp3: this.state.vacTo});
            this.setState({vacDisp4: this.state.vacToPMAM});
        }else if(panel === "Coffee"){
            this.setState({coffeeSch: true});
            this.setState({coffeeDisp1: this.state.coffeeFrom});
            this.setState({coffeeDisp2: this.state.coffeeFromPMAM});
            this.setState({coffeeDisp3: this.state.coffeeTo});
            this.setState({coffeeDisp4: this.state.coffeeToPMAM});
        }
    }

    toggleLights(room){

        if(room === "dining"){
            if(this.state.diningRoomLight === "On"){
                this.setState({diningRoomLight: "Off"});
            }
            else{
                this.setState({diningRoomLight: "On"})
            }
        }
        else if(room === "living"){
            if(this.state.livingRoomLight === "On"){
                this.setState({livingRoomLight: "Off"});
            }
            else{
                this.setState({livingRoomLight: "On"})
            }
        }
        else if(room === "basement"){
            if(this.state.basementLight === "On"){
                this.setState({basementLight: "Off"});
            }
            else{
                this.setState({basementLight: "On"})
            }
        }
        else if(room === "topFloor"){
            if(this.state.topFloorLight === "On"){
                this.setState({topFloorLight: "Off"});
            }
            else{
                this.setState({topFloorLight: "On"})
            }
        }

    }

}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<HomeApp />);
//ReactDOM.render(<HomeApp />, container);


function homePageLightsOutput(system, status){

    if(status){
        return system + ": " + "Scheduled";
    }
    else{
        return system + ": " + "Not Scheduled";
    }
}

class PowerButton extends React.Component{
    constructor(props){
        super(props);
    }
    toggle = () => {
        const p = this.props.power;
        if(p === 0){
            this.props.onPowerChange(1)
        } else {
            this.props.onPowerChange(0)
        }
    }
    render(){
        const p = this.props.power;
        let button;
        if (p === 0){
            button = <button class="btn btn-danger btn-lg m-1"
                        onClick={this.toggle} >{this.props.name + " OFF"}</button>
        }
        else {
            button = <button class="btn btn-success btn-lg m-1"
                        onClick={this.toggle} >{this.props.name + " ON"}</button>
        }
        return(
            <div>{button}</div>
        );
    }
}
