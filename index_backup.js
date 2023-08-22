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
        diningRoomTemp: 70,
        livingRoomTemp: 65,
        topFloorTemp: 72,
        gardenTemp: 66,
        gardenLightStatus: "OFF",
        gardenIrrigationStatus: "OFF",
        basementTemp: 68,
        diningRoomLight: "Off",
        livingRoomLight: "Off",
        topFloorLight: "On",
        basementLight: "Off",
        tempSch: false,
        cities: [], //expects objects in the form of: {city: cityName, temp: temp, forecast: forecast}
        irigationPower: 0,
        gardenLights: 0,
        coffeemakerStatus: 0,
        vacuumStatus: 0,
        roboVacuumOnOff: "OFF",
        coffeemakerOnOff: "OFF",
        homeDisplayedCity: "Unknown",
        homeDisplayedCityTemperature: "Unknown",
        livingFrom: "3:00",};

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
        this.toggleSched.bind(this);
        this.load("Baltimore");

        
     
    }

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
            
            let sched;
            
            if(this.state.tempSch){
                sched = (<div className = "row justify-content-evenly">
                                <div className = "col-7 room ">
                                    <h1>Room Schedules</h1>
                                    <h4>Living Room</h4> 
                                    {this.state.livingFrom}
                                    <p>Temp: </p><input type = "text" className = "schTempBox"></input><br></br>
                                    <label for="times-from">From:</label>
                                    <select name="times-from" id = "living-from" onChange = {(c) => {this.setState({livingFrom: c.target.value})}}>
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label for="times-to" className = "to-label">To:</label>
                                    <select name="times-to">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc" onClick = { () => {console.log(this.state.livingFrom)}} >Set Schedule</button>
                                    <h4>Dining Room</h4>
                                    <p>Temp: </p><input type = "text" className = "schTempBox"></input><br></br>
                                    <label for="times-from">From:</label>
                                    <select name="times-from">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label for="times-to" className = "to-label">To:</label>
                                    <select name="times-to">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc">Set Schedule</button>
                                    <h4>Top Floor</h4>
                                    <p>Temp: </p><input type = "text" className = "schTempBox"></input><br></br>
                                    <label for="times-from">From:</label>
                                    <select name="times-from">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label for="times-to" className = "to-label">To:</label>
                                    <select name="times-to">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc">Set Schedule</button>
                                    <h4>Basement</h4>
                                    <p>Temp: </p><input type = "text" className = "schTempBox"></input><br></br>
                                    <label for="times-from">From:</label>
                                    <select name="times-from">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <label for="times-to" className = "to-label">To:</label>
                                    <select name="times-to">
                                        <option value="1">1:00</option>
                                        <option value="2">2:00</option>
                                        <option value="3">3:00</option>
                                        <option value="4">4:00</option>
                                        <option value="5">5:00</option>
                                        <option value="6">6:00</option>
                                        <option value="7">7:00</option>
                                        <option value="8">8:00</option>
                                        <option value="9">9:00</option>
                                        <option value="10">10:00</option>
                                        <option value="11">11:00</option>
                                        <option value="12">12:00</option>
                                    </select>
                                    <select name="PMAM"><option value="AM">AM</option><option value="PM">PM</option></select>
                                    <br></br><button className = "btn-sm bttn-misc">Set Schedule</button>
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
                                <button onClick = {() => this.toggleSched("Temp")}>View schedules</button>
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
                </div>);
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

    toggleSched (page){
        if(page === "Temp"){
            if(this.state.tempSch){
                this.setState({tempSch: false});
            }else{
                this.setState({tempSch: true});
            }
            
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
class TempAllRows extends React.Component{
    rows = [];
    constructor(props){
        super(props);
    }


    makeRows = () => {
        if((this.props.names.length)%3 !== 0){
            let ind = this.props.names.length - 1;
            while((this.props.names.length%3) !== 0){
                ind++;
                this.props.names[ind] = "None";
            }
        }
        let ind = 0;
        let numR = 0;
        while(ind < this.props.names.length - 1){
            this.rows[numR] = <TempRow names = {this.props.names} temps = {this.props.temps} lights = {this.props.lights}
            start = {ind} end = {ind + 2}/>

            ind += 3;
            numR++;
        }
    }
    

    render(){
        this.makeRows();
        return (      
            <div>
                {this.rows} 
                
            </div>
        );
    }
}

class TempRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return (
            <div className = "row justify-content-evenly">
               <TempCol name = {this.props.names[(this.props.start)]} temp = {this.props.temps[(this.props.start)]} lights = {this.props.lights[(this.props.start)]}/> 
               <TempCol name = {this.props.names[(this.props.start + 1)]} temp = {this.props.temps[(this.props.start + 1)]} lights = {this.props.lights[(this.props.start + 1)]}/> 
               <TempCol name = {this.props.names[(this.props.start + 2)]} temp = {this.props.temps[(this.props.start + 2)]} lights = {this.props.lights[(this.props.start + 2)]}/> 
            </div>
        )
    }
    
}

class TempCol extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        if(this.props.name === "Add"){
            return(<div className = "col-3 add-rm" > 
                        <h1 id = "add-rm-txt">+</h1>
                        <h1>Add new<br />room</h1>
                    </div>);
        }else if(this.props.name === "None"){
            return(<div className = "col-3"></div>);
        }else{
            return(
                <div className = " col-3 room ">
                    <h1>{this.props.name}</h1>
                    <h4>Temp: {this.props.temp}F</h4>
                    <button className = "btn-sm tmp-inc">+</button><button className = "btn-sm tmp-dec">-</button>
                    <br /><button className = "btn-sm bttn-misc">Input temp</button>
                    <h4>Lights: {this.props.lights}</h4>
                    <button className = "btn-sm bttn-misc">Turn on</button>
                </div>
            );
        }
        
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<HomeApp />);


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
